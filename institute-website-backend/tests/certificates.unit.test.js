const Certificate = require('../models/Certificate');
const CertificateTemplate = require('../models/CertificateTemplate');
const Student = require('../models/Student');
const User = require('../models/User');
const CertificateService = require('../services/CertificateService');

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' })
  }))
}));

describe('Certificate Unit Tests', () => {
  let certificateService;
  let testUser;
  let testStudent;
  let testTemplate;

  beforeEach(async () => {
    certificateService = new CertificateService();

    // Create test user
    testUser = new User({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'hashedpassword',
      phone: '+1234567890',
      role: 'admin'
    });
    await testUser.save();

    // Create test student
    testStudent = new Student({
      studentId: 'TEST001',
      userId: testUser._id,
      admissionId: testUser._id,
      fullName: 'Test Student',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      phone: '+1234567890',
      email: 'student@test.com',
      address: 'Test Address',
      emergencyContact: {
        name: 'Emergency Contact',
        phone: '+1234567891',
        relationship: 'parent'
      },
      courseLevel: 'beginner'
    });
    await testStudent.save();

    // Create test template
    testTemplate = new CertificateTemplate({
      name: 'Test Template',
      type: 'belt_promotion',
      description: 'Test template for unit tests',
      templateFile: '/test/template.pdf',
      previewImage: '/test/preview.png',
      styling: {
        dimensions: { width: 800, height: 600 },
        backgroundColor: '#ffffff'
      },
      fields: [
        {
          name: 'studentName',
          type: 'text',
          position: { x: 100, y: 100 },
          size: { width: 200, height: 30 },
          style: { fontSize: 16 },
          required: true
        }
      ],
      createdBy: testUser._id,
      version: '1.0.0'
    });
    await testTemplate.save();
  });

  describe('Certificate Generation', () => {
    test('should generate certificate with valid data', async () => {
      // Mock services
      certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
      certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

      const certificateRequest = {
        studentId: testStudent._id.toString(),
        achievementType: 'belt_promotion',
        achievementDetails: {
          title: 'Yellow Belt Promotion',
          description: 'Successfully completed yellow belt requirements'
        },
        templateId: testTemplate._id.toString(),
        issuedBy: testUser._id.toString()
      };

      const certificate = await certificateService.generateCertificate(certificateRequest);

      expect(certificate).toBeDefined();
      expect(certificate.studentName).toBe(testStudent.fullName);
      expect(certificate.achievementType).toBe('belt_promotion');
      expect(certificate.verificationCode).toMatch(/^[A-F0-9]{32}$/);
      expect(certificate.status).toBe('active');
    });

    test('should throw error for missing required fields', async () => {
      const invalidRequest = {
        studentId: testStudent._id.toString(),
        // Missing achievementType, templateId, issuedBy
      };

      await expect(certificateService.generateCertificate(invalidRequest))
        .rejects.toThrow('Missing required fields for certificate generation');
    });

    test('should throw error for non-existent student', async () => {
      const invalidRequest = {
        studentId: '507f1f77bcf86cd799439011', // Non-existent ID
        achievementType: 'belt_promotion',
        achievementDetails: { title: 'Test', description: 'Test' },
        templateId: testTemplate._id.toString(),
        issuedBy: testUser._id.toString()
      };

      await expect(certificateService.generateCertificate(invalidRequest))
        .rejects.toThrow('Student not found');
    });

    test('should throw error for achievement type mismatch', async () => {
      const invalidRequest = {
        studentId: testStudent._id.toString(),
        achievementType: 'course_completion', // Template is for belt_promotion
        achievementDetails: { title: 'Test', description: 'Test' },
        templateId: testTemplate._id.toString(),
        issuedBy: testUser._id.toString()
      };

      await expect(certificateService.generateCertificate(invalidRequest))
        .rejects.toThrow('Achievement type does not match template type');
    });
  });

  describe('Certificate Verification', () => {
    let testCertificate;

    beforeEach(async () => {
      // Mock services and create a test certificate
      certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
      certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

      const certificateRequest = {
        studentId: testStudent._id.toString(),
        achievementType: 'belt_promotion',
        achievementDetails: {
          title: 'Yellow Belt Promotion',
          description: 'Successfully completed yellow belt requirements'
        },
        templateId: testTemplate._id.toString(),
        issuedBy: testUser._id.toString()
      };

      testCertificate = await certificateService.generateCertificate(certificateRequest);
    });

    test('should verify valid certificate', async () => {
      const result = await certificateService.verifyCertificate(testCertificate.verificationCode);

      expect(result.isValid).toBe(true);
      expect(result.certificate.studentName).toBe(testStudent.fullName);
      expect(result.certificate.verificationCode).toBe(testCertificate.verificationCode);
      expect(result.certificate.status).toBe('active');
    });

    test('should not expose sensitive student data in verification', async () => {
      const result = await certificateService.verifyCertificate(testCertificate.verificationCode);

      expect(result.certificate.studentId).toBeUndefined();
      expect(result.certificate.phone).toBeUndefined();
      expect(result.certificate.address).toBeUndefined();
      expect(result.certificate.emergencyContact).toBeUndefined();
    });

    test('should reject invalid verification code', async () => {
      const result = await certificateService.verifyCertificate('INVALID_CODE');

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.certificate).toBeUndefined();
    });

    test('should reject revoked certificate', async () => {
      // Revoke the certificate
      await testCertificate.revoke();

      const result = await certificateService.verifyCertificate(testCertificate.verificationCode);

      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Certificate Retrieval', () => {
    let testCertificate;

    beforeEach(async () => {
      // Mock services and create a test certificate
      certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
      certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

      const certificateRequest = {
        studentId: testStudent._id.toString(),
        achievementType: 'belt_promotion',
        achievementDetails: {
          title: 'Yellow Belt Promotion',
          description: 'Successfully completed yellow belt requirements'
        },
        templateId: testTemplate._id.toString(),
        issuedBy: testUser._id.toString()
      };

      testCertificate = await certificateService.generateCertificate(certificateRequest);
    });

    test('should get certificate by ID', async () => {
      const certificate = await certificateService.getCertificate(testCertificate._id);

      expect(certificate).toBeDefined();
      expect(certificate._id.toString()).toBe(testCertificate._id.toString());
      expect(certificate.studentName).toBe(testStudent.fullName);
    });

    test('should get certificates by student ID', async () => {
      const certificates = await certificateService.getCertificatesByStudent(testStudent._id);

      expect(certificates).toHaveLength(1);
      expect(certificates[0]._id.toString()).toBe(testCertificate._id.toString());
    });

    test('should throw error for non-existent certificate', async () => {
      await expect(certificateService.getCertificate('507f1f77bcf86cd799439011'))
        .rejects.toThrow('Certificate not found');
    });
  });

  describe('Verification Code Generation', () => {
    test('should generate unique verification codes', () => {
      const codes = new Set();
      
      for (let i = 0; i < 1000; i++) {
        const code = certificateService.generateVerificationCode();
        expect(code).toMatch(/^[A-F0-9]{32}$/);
        expect(code.length).toBe(32);
        codes.add(code);
      }

      // All codes should be unique
      expect(codes.size).toBe(1000);
    });

    test('should generate cryptographically secure codes', () => {
      const code = certificateService.generateVerificationCode();
      
      // Should be uppercase hex
      expect(code).toMatch(/^[A-F0-9]+$/);
      
      // Should not contain predictable patterns
      expect(code).not.toMatch(/^(.)\1+$/); // Not all same character
      expect(code).not.toMatch(/^0+/); // Not all zeros
      expect(code).not.toMatch(/^F+/); // Not all F's
    });
  });

  describe('Certificate Statistics', () => {
    beforeEach(async () => {
      // Mock services
      certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
      certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

      // Create multiple certificates
      const requests = [
        { achievementType: 'belt_promotion', title: 'Yellow Belt' },
        { achievementType: 'belt_promotion', title: 'Orange Belt' },
        { achievementType: 'course_completion', title: 'Basic Course' }
      ];

      // Create templates for each type
      const courseTemplate = new CertificateTemplate({
        name: 'Course Template',
        type: 'course_completion',
        description: 'Course completion template',
        templateFile: '/test/course-template.pdf',
        previewImage: '/test/course-preview.png',
        styling: { dimensions: { width: 800, height: 600 } },
        fields: [{ name: 'studentName', type: 'text', position: { x: 100, y: 100 }, size: { width: 200, height: 30 } }],
        createdBy: testUser._id,
        version: '1.0.0'
      });
      await courseTemplate.save();

      for (const req of requests) {
        const templateId = req.achievementType === 'belt_promotion' ? testTemplate._id : courseTemplate._id;
        
        await certificateService.generateCertificate({
          studentId: testStudent._id.toString(),
          achievementType: req.achievementType,
          achievementDetails: { title: req.title, description: 'Test description' },
          templateId: templateId.toString(),
          issuedBy: testUser._id.toString()
        });
      }
    });

    test('should return correct certificate statistics', async () => {
      const stats = await certificateService.getCertificateStats();

      expect(stats.total).toBe(3);
      expect(stats.active).toBe(3);
      expect(stats.byType).toHaveLength(2);
      
      const beltPromotions = stats.byType.find(s => s._id === 'belt_promotion');
      const courseCompletions = stats.byType.find(s => s._id === 'course_completion');
      
      expect(beltPromotions.count).toBe(2);
      expect(courseCompletions.count).toBe(1);
    });
  });
});