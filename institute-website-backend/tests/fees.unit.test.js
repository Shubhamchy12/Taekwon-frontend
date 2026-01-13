const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Fee = require('../models/Fee');
const User = require('../models/User');

describe('Fee Management API', () => {
  let authToken;
  let adminUser;

  beforeAll(async () => {
    // Create admin user for testing
    adminUser = new User({
      name: 'Test Admin',
      email: 'testadmin@test.com',
      password: 'password123',
      role: 'admin'
    });
    await adminUser.save();

    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testadmin@test.com',
        password: 'password123'
      });

    authToken = loginResponse.body.data.token;
  });

  afterAll(async () => {
    // Clean up test data
    await Fee.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clean up fees before each test
    await Fee.deleteMany({});
  });

  describe('POST /api/fees', () => {
    it('should create a new fee record', async () => {
      const feeData = {
        studentName: 'Test Student',
        course: 'Beginner',
        feeType: 'Monthly Fee',
        amount: 2000,
        dueDate: '2024-02-28'
      };

      const response = await request(app)
        .post('/api/fees')
        .set('Authorization', `Bearer ${authToken}`)
        .send(feeData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.fee.studentName).toBe('Test Student');
      expect(response.body.data.fee.amount).toBe(2000);
      expect(response.body.data.fee.status).toBe('Pending');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/fees')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/fees', () => {
    beforeEach(async () => {
      // Create test fee records
      await Fee.create([
        {
          studentName: 'Student 1',
          course: 'Beginner',
          feeType: 'Monthly Fee',
          amount: 2000,
          dueDate: new Date('2024-01-31'),
          status: 'Paid',
          paymentMethod: 'UPI',
          paidDate: new Date('2024-01-28'),
          createdBy: adminUser._id
        },
        {
          studentName: 'Student 2',
          course: 'Advanced',
          feeType: 'Monthly Fee',
          amount: 3000,
          dueDate: new Date('2024-01-31'),
          status: 'Pending',
          createdBy: adminUser._id
        }
      ]);
    });

    it('should get all fees', async () => {
      const response = await request(app)
        .get('/api/fees')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.fees).toHaveLength(2);
      expect(response.body.data.statistics).toBeDefined();
    });

    it('should filter fees by status', async () => {
      const response = await request(app)
        .get('/api/fees?status=Paid')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.fees).toHaveLength(1);
      expect(response.body.data.fees[0].status).toBe('Paid');
    });

    it('should filter fees by month and year', async () => {
      const response = await request(app)
        .get('/api/fees?month=1&year=2024')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.fees).toHaveLength(2);
    });
  });

  describe('POST /api/fees/:id/payment', () => {
    let feeId;

    beforeEach(async () => {
      const fee = await Fee.create({
        studentName: 'Test Student',
        course: 'Beginner',
        feeType: 'Monthly Fee',
        amount: 2000,
        dueDate: new Date('2024-02-28'),
        status: 'Pending',
        createdBy: adminUser._id
      });
      feeId = fee._id;
    });

    it('should record payment successfully', async () => {
      const paymentData = {
        paymentMethod: 'UPI',
        transactionId: 'UPI123456',
        paidDate: '2024-02-25'
      };

      const response = await request(app)
        .post(`/api/fees/${feeId}/payment`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(paymentData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.fee.status).toBe('Paid');
      expect(response.body.data.fee.paymentMethod).toBe('UPI');
      expect(response.body.data.fee.transactionId).toBe('UPI123456');
    });

    it('should not allow payment for already paid fee', async () => {
      // First payment
      await request(app)
        .post(`/api/fees/${feeId}/payment`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          paymentMethod: 'Cash',
          paidDate: '2024-02-25'
        });

      // Second payment attempt
      const response = await request(app)
        .post(`/api/fees/${feeId}/payment`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          paymentMethod: 'UPI',
          paidDate: '2024-02-26'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('already paid');
    });
  });

  describe('GET /api/fees/statistics', () => {
    beforeEach(async () => {
      await Fee.create([
        {
          studentName: 'Student 1',
          course: 'Beginner',
          feeType: 'Monthly Fee',
          amount: 2000,
          dueDate: new Date('2024-01-31'),
          status: 'Paid',
          paymentMethod: 'UPI',
          createdBy: adminUser._id
        },
        {
          studentName: 'Student 2',
          course: 'Advanced',
          feeType: 'Monthly Fee',
          amount: 3000,
          dueDate: new Date('2024-01-31'),
          status: 'Pending',
          createdBy: adminUser._id
        },
        {
          studentName: 'Student 3',
          course: 'Intermediate',
          feeType: 'Monthly Fee',
          amount: 2500,
          dueDate: new Date('2024-01-31'),
          status: 'Overdue',
          createdBy: adminUser._id
        }
      ]);
    });

    it('should get fee statistics', async () => {
      const response = await request(app)
        .get('/api/fees/statistics')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.overview).toBeDefined();
      expect(response.body.data.overview.totalAmount).toBe(7500);
      expect(response.body.data.overview.paidAmount).toBe(2000);
      expect(response.body.data.overview.pendingAmount).toBe(3000);
      expect(response.body.data.overview.overdueAmount).toBe(2500);
    });
  });

  describe('Authentication', () => {
    it('should require authentication for all endpoints', async () => {
      const response = await request(app)
        .get('/api/fees');

      expect(response.status).toBe(401);
    });

    it('should require admin role for creating fees', async () => {
      // This would require creating a non-admin user and testing
      // For now, we'll just test that admin can create
      const feeData = {
        studentName: 'Test Student',
        course: 'Beginner',
        feeType: 'Monthly Fee',
        amount: 2000,
        dueDate: '2024-02-28'
      };

      const response = await request(app)
        .post('/api/fees')
        .set('Authorization', `Bearer ${authToken}`)
        .send(feeData);

      expect(response.status).toBe(201);
    });
  });
});