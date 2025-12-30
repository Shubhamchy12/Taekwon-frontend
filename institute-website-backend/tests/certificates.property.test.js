const fc = require('fast-check');
const Certificate = require('../models/Certificate');
const CertificateTemplate = require('../models/CertificateTemplate');
const Student = require('../models/Student');
const User = require('../models/User');
const CertificateService = require('../services/CertificateService');

// Mock nodemailer at the module level
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' })
  }))
}));

describe('Certificate Property Tests', () => {
  let certificateService;
  let testUser;
  let testStudent;
  let testTemplates = {};

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
      admissionId: testUser._id, // Using user ID as placeholder
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

    // Create separate templates for each achievement type
    const templateTypes = ['belt_promotion', 'course_completion', 'special_achievement'];
    
    for (const type of templateTypes) {
      const template = new CertificateTemplate({
        name: `Test Template - ${type}`,
        type: type,
        description: `Test template for ${type}`,
        templateFile: `/test/template-${type}.pdf`,
        previewImage: `/test/preview-${type}.png`,
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
      await template.save();
      testTemplates[type] = template;
    }
  });

  /**
   * Property 1: Certificate Generation Completeness
   * Feature: certificate-achievement-management, Property 1: For any valid certificate request with student data and achievement details, the generated certificate should contain all required fields specific to the achievement type
   * Validates: Requirements 1.1, 1.2, 1.3
   */
  test('Property 1: Certificate Generation Completeness', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate random certificate request data
        fc.record({
          achievementType: fc.constantFrom('belt_promotion', 'course_completion', 'special_achievement'),
          achievementDetails: fc.record({
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            level: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
            grade: fc.option(fc.string({ minLength: 1, maxLength: 10 })),
            examiner: fc.option(fc.string({ minLength: 1, maxLength: 100 }))
          })
        }),
        async (requestData) => {
          // Mock PDF generation and email service
          const originalRenderCertificate = certificateService.templateService.renderCertificate;
          const originalSendNotification = certificateService.notificationService.sendCertificateNotification;
          
          certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
          certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

          try {
            const certificateRequest = {
              studentId: testStudent._id.toString(),
              achievementType: requestData.achievementType,
              achievementDetails: requestData.achievementDetails,
              templateId: testTemplates[requestData.achievementType]._id.toString(),
              issuedBy: testUser._id.toString()
            };

            const certificate = await certificateService.generateCertificate(certificateRequest);

            // Verify all required fields are present
            expect(certificate).toBeDefined();
            expect(certificate.studentId.toString()).toBe(testStudent._id.toString());
            expect(certificate.studentName).toBe(testStudent.fullName);
            expect(certificate.achievementType).toBe(requestData.achievementType);
            expect(certificate.achievementDetails.title).toBe(requestData.achievementDetails.title);
            expect(certificate.achievementDetails.description).toBe(requestData.achievementDetails.description);
            expect(certificate.templateId.toString()).toBe(testTemplates[requestData.achievementType]._id.toString());
            expect(certificate.issuedBy.toString()).toBe(testUser._id.toString());
            expect(certificate.verificationCode).toBeDefined();
            expect(certificate.verificationCode).toMatch(/^[A-F0-9]{32}$/);
            expect(certificate.status).toBe('active');
            expect(certificate.filePath).toBeDefined();
            expect(certificate.fileHash).toBeDefined();

            // Verify achievement type specific fields
            if (requestData.achievementDetails.level) {
              expect(certificate.achievementDetails.level).toBe(requestData.achievementDetails.level);
            }
            if (requestData.achievementDetails.grade) {
              expect(certificate.achievementDetails.grade).toBe(requestData.achievementDetails.grade);
            }
            if (requestData.achievementDetails.examiner) {
              expect(certificate.achievementDetails.examiner).toBe(requestData.achievementDetails.examiner);
            }

            // Verify metadata
            expect(certificate.metadata).toBeDefined();
            expect(certificate.metadata.templateVersion).toBe(testTemplates[requestData.achievementType].version);
            expect(certificate.metadata.generationMethod).toBe('automated');

          } finally {
            // Restore original methods
            certificateService.templateService.renderCertificate = originalRenderCertificate;
            certificateService.notificationService.sendCertificateNotification = originalSendNotification;
          }
        }
      ),
      { numRuns: 50, timeout: 10000 } // Reduced runs and added timeout
    );
  }, 60000); // Increased test timeout

  /**
   * Property 2: Verification Code Uniqueness and Security
   * Feature: certificate-achievement-management, Property 2: For any set of generated certificates, all verification codes should be unique, non-guessable (cryptographically secure), and successfully validate their corresponding certificates
   * Validates: Requirements 8.1, 2.1
   */
  test('Property 2: Verification Code Uniqueness and Security', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate multiple certificate requests
        fc.array(
          fc.record({
            achievementType: fc.constantFrom('belt_promotion', 'course_completion', 'special_achievement'),
            achievementDetails: fc.record({
              title: fc.string({ minLength: 1, maxLength: 100 }),
              description: fc.string({ minLength: 1, maxLength: 500 })
            })
          }),
          { minLength: 2, maxLength: 5 } // Reduced max length for faster tests
        ),
        async (requestsData) => {
          // Mock services
          const originalRenderCertificate = certificateService.templateService.renderCertificate;
          const originalSendNotification = certificateService.notificationService.sendCertificateNotification;
          
          certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
          certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

          try {
            const certificates = [];
            const verificationCodes = new Set();

            // Generate multiple certificates
            for (const requestData of requestsData) {
              const certificateRequest = {
                studentId: testStudent._id.toString(),
                achievementType: requestData.achievementType,
                achievementDetails: requestData.achievementDetails,
                templateId: testTemplates[requestData.achievementType]._id.toString(),
                issuedBy: testUser._id.toString()
              };

              const certificate = await certificateService.generateCertificate(certificateRequest);
              certificates.push(certificate);
              verificationCodes.add(certificate.verificationCode);
            }

            // Verify uniqueness
            expect(verificationCodes.size).toBe(certificates.length);

            // Verify security properties of verification codes
            for (const certificate of certificates) {
              // Should be 32 character hex string (cryptographically secure)
              expect(certificate.verificationCode).toMatch(/^[A-F0-9]{32}$/);
              expect(certificate.verificationCode.length).toBe(32);

              // Should successfully verify
              const verificationResult = await certificateService.verifyCertificate(certificate.verificationCode);
              expect(verificationResult.isValid).toBe(true);
              expect(verificationResult.certificate.studentName).toBe(testStudent.fullName);
              expect(verificationResult.certificate.verificationCode).toBe(certificate.verificationCode);
            }

          } finally {
            certificateService.templateService.renderCertificate = originalRenderCertificate;
            certificateService.notificationService.sendCertificateNotification = originalSendNotification;
          }
        }
      ),
      { numRuns: 25, timeout: 15000 } // Reduced runs and added timeout
    );
  }, 60000);

  /**
   * Property 3: Verification Response Correctness
   * Feature: certificate-achievement-management, Property 3: For any verification code, if the code is valid, the verification service should return complete certificate information without exposing sensitive student data; if invalid, it should return an appropriate error message
   * Validates: Requirements 2.2, 2.3, 2.5
   */
  test('Property 3: Verification Response Correctness', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          achievementType: fc.constantFrom('belt_promotion', 'course_completion', 'special_achievement'),
          achievementDetails: fc.record({
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 })
          }),
          invalidCode: fc.string({ minLength: 1, maxLength: 50 })
        }),
        async (testData) => {
          // Mock services
          const originalRenderCertificate = certificateService.templateService.renderCertificate;
          const originalSendNotification = certificateService.notificationService.sendCertificateNotification;
          
          certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
          certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

          try {
            // Generate a valid certificate
            const certificateRequest = {
              studentId: testStudent._id.toString(),
              achievementType: testData.achievementType,
              achievementDetails: testData.achievementDetails,
              templateId: testTemplates[testData.achievementType]._id.toString(),
              issuedBy: testUser._id.toString()
            };

            const certificate = await certificateService.generateCertificate(certificateRequest);

            // Test valid verification code
            const validResult = await certificateService.verifyCertificate(certificate.verificationCode);
            expect(validResult.isValid).toBe(true);
            expect(validResult.certificate).toBeDefined();
            expect(validResult.certificate.studentName).toBe(testStudent.fullName);
            expect(validResult.certificate.achievementType).toBe(testData.achievementType);
            expect(validResult.certificate.achievementDetails.title).toBe(testData.achievementDetails.title);
            expect(validResult.certificate.achievementDetails.description).toBe(testData.achievementDetails.description);
            expect(validResult.certificate.issuedDate).toBeDefined();
            expect(validResult.certificate.verificationCode).toBe(certificate.verificationCode);
            expect(validResult.certificate.status).toBe('active');

            // Verify no sensitive data is exposed (should not contain full student record)
            expect(validResult.certificate.studentId).toBeUndefined();
            expect(validResult.certificate.phone).toBeUndefined();
            expect(validResult.certificate.address).toBeUndefined();
            expect(validResult.certificate.emergencyContact).toBeUndefined();

            // Test invalid verification code
            const invalidResult = await certificateService.verifyCertificate(testData.invalidCode);
            expect(invalidResult.isValid).toBe(false);
            expect(invalidResult.error).toBeDefined();
            expect(invalidResult.certificate).toBeUndefined();

          } finally {
            certificateService.templateService.renderCertificate = originalRenderCertificate;
            certificateService.notificationService.sendCertificateNotification = originalSendNotification;
          }
        }
      ),
      { numRuns: 50, timeout: 10000 }
    );
  }, 60000);

  /**
   * Property 4: Certificate Status and Lifecycle
   * Feature: certificate-achievement-management, Property 4: For any certificate, status changes should be properly tracked and affect verification results
   * Validates: Requirements 8.3, 2.1
   */
  test('Property 4: Certificate Status and Lifecycle', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          achievementType: fc.constantFrom('belt_promotion', 'course_completion', 'special_achievement'),
          achievementDetails: fc.record({
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 })
          })
        }),
        async (testData) => {
          // Mock services
          const originalRenderCertificate = certificateService.templateService.renderCertificate;
          const originalSendNotification = certificateService.notificationService.sendCertificateNotification;
          
          certificateService.templateService.renderCertificate = jest.fn().mockResolvedValue(Buffer.from('mock-pdf'));
          certificateService.notificationService.sendCertificateNotification = jest.fn().mockResolvedValue();

          try {
            // Generate certificate
            const certificateRequest = {
              studentId: testStudent._id.toString(),
              achievementType: testData.achievementType,
              achievementDetails: testData.achievementDetails,
              templateId: testTemplates[testData.achievementType]._id.toString(),
              issuedBy: testUser._id.toString()
            };

            const certificate = await certificateService.generateCertificate(certificateRequest);

            // Initially should be active and verifiable
            expect(certificate.status).toBe('active');
            let verificationResult = await certificateService.verifyCertificate(certificate.verificationCode);
            expect(verificationResult.isValid).toBe(true);

            // Revoke certificate
            await certificate.revoke();
            expect(certificate.status).toBe('revoked');

            // Should no longer be verifiable
            verificationResult = await certificateService.verifyCertificate(certificate.verificationCode);
            expect(verificationResult.isValid).toBe(false);

          } finally {
            certificateService.templateService.renderCertificate = originalRenderCertificate;
            certificateService.notificationService.sendCertificateNotification = originalSendNotification;
          }
        }
      ),
      { numRuns: 50, timeout: 10000 }
    );
  }, 60000);
});