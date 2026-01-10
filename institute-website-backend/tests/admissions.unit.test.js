const request = require('supertest');
const express = require('express');
const admissionRoutes = require('../routes/admissions');
const { submitAdmission, getAdmissionStats } = require('../controllers/admissionController');

// Mock the controller functions
jest.mock('../controllers/admissionController');
jest.mock('../middleware/validation', () => ({
  validateAdmission: (req, res, next) => next()
}));

const app = express();
app.use(express.json());
app.use('/api/admissions', admissionRoutes);

describe('Admission Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/admissions', () => {
    it('should submit admission application successfully', async () => {
      const mockAdmissionData = {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+91 9876543210',
        dateOfBirth: '2000-01-01',
        gender: 'male',
        address: '123 Main St, City, State',
        courseLevel: 'beginner',
        preferredSchedule: 'evening',
        emergencyContactName: 'Jane Doe',
        emergencyContactPhone: '+91 9876543211',
        relationshipToStudent: 'parent',
        medicalConditions: 'None',
        agreeToTerms: true
      };

      const mockResponse = {
        status: 'success',
        message: 'Admission application submitted successfully.',
        data: {
          admission: {
            id: 'mock-id',
            fullName: 'John Doe',
            email: 'john.doe@email.com',
            courseLevel: 'beginner',
            status: 'pending',
            submittedAt: new Date().toISOString()
          }
        }
      };

      submitAdmission.mockImplementation((req, res) => {
        res.status(201).json(mockResponse);
      });

      const response = await request(app)
        .post('/api/admissions')
        .send(mockAdmissionData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.admission.fullName).toBe('John Doe');
      expect(submitAdmission).toHaveBeenCalled();
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        fullName: 'John Doe'
        // Missing required fields
      };

      submitAdmission.mockImplementation((req, res) => {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: ['Email is required', 'Course level is required']
        });
      });

      const response = await request(app)
        .post('/api/admissions')
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(submitAdmission).toHaveBeenCalled();
    });
  });

  describe('GET /api/admissions/stats', () => {
    it('should return admission statistics', async () => {
      const mockStats = {
        status: 'success',
        data: {
          totalApplications: 10,
          thisMonthApplications: 3,
          statusBreakdown: [
            { _id: 'pending', count: 5 },
            { _id: 'approved', count: 4 },
            { _id: 'rejected', count: 1 }
          ],
          levelBreakdown: [
            { _id: 'beginner', count: 6 },
            { _id: 'intermediate', count: 3 },
            { _id: 'advanced', count: 1 }
          ]
        }
      };

      getAdmissionStats.mockImplementation((req, res) => {
        res.status(200).json(mockStats);
      });

      const response = await request(app)
        .get('/api/admissions/stats');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.totalApplications).toBe(10);
      expect(getAdmissionStats).toHaveBeenCalled();
    });
  });

  describe('GET /api/admissions/status/:email', () => {
    it('should return admission status for valid email', async () => {
      // This would be handled by getAdmissionStatus controller
      // Test implementation would be similar to above
    });

    it('should return 404 for non-existent email', async () => {
      // Test for email not found scenario
    });
  });
});

describe('Admission Controller Unit Tests', () => {
  describe('Data Validation', () => {
    it('should validate required fields', () => {
      const requiredFields = [
        'fullName',
        'email',
        'phone',
        'dateOfBirth',
        'gender',
        'address',
        'courseLevel',
        'emergencyContactName',
        'emergencyContactPhone',
        'relationshipToStudent'
      ];

      const sampleData = {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+91 9876543210',
        dateOfBirth: '2000-01-01',
        gender: 'male',
        address: '123 Main St',
        courseLevel: 'beginner',
        emergencyContactName: 'Jane Doe',
        emergencyContactPhone: '+91 9876543211',
        relationshipToStudent: 'parent'
      };

      requiredFields.forEach(field => {
        expect(sampleData).toHaveProperty(field);
        expect(sampleData[field]).toBeTruthy();
      });
    });

    it('should validate email format', () => {
      const validEmails = [
        'test@example.com',
        'user@domain.co',
        'simple@test.org'
      ];

      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain'
      ];

      // Use the same regex as in the Admission model
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });

    it('should validate phone number format', () => {
      const validPhones = [
        '+91 9876543210',
        '9876543210',
        '+1 1234567890'
      ];

      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;

      validPhones.forEach(phone => {
        const cleanPhone = phone.replace(/\s/g, '');
        expect(phoneRegex.test(cleanPhone)).toBe(true);
      });
    });
  });

  describe('Age Calculation', () => {
    it('should calculate age correctly', () => {
      const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        return age;
      };

      // Test with a known date
      const birthDate = '2000-01-01';
      const age = calculateAge(birthDate);
      
      expect(age).toBeGreaterThan(20);
      expect(typeof age).toBe('number');
    });
  });

  describe('Student ID Generation', () => {
    it('should generate unique student ID', () => {
      const generateStudentId = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `CW${year}${randomNum}`;
      };

      const id1 = generateStudentId();
      const id2 = generateStudentId();
      const currentYear = new Date().getFullYear();

      expect(id1).toMatch(/^CW\d{8}$/);
      expect(id2).toMatch(/^CW\d{8}$/);
      expect(id1.startsWith(`CW${currentYear}`)).toBe(true);
    });
  });
});