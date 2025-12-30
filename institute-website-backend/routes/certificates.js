const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const CertificateService = require('../services/CertificateService');
const { protect, adminOnly, staffOnly } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const certificateService = new CertificateService();

// Get all certificates (Admin only)
router.get('/', staffOnly, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const certificates = await Certificate.find()
      .populate('studentId', 'fullName studentId')
      .populate('templateId', 'name type')
      .populate('issuedBy', 'name email')
      .sort({ issuedDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Certificate.countDocuments();

    res.json({
      success: true,
      certificates,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate new certificate
router.post('/generate', [
  staffOnly,
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('achievementType').isIn(['belt_promotion', 'course_completion', 'special_achievement']).withMessage('Invalid achievement type'),
  body('achievementDetails.title').notEmpty().withMessage('Achievement title is required'),
  body('achievementDetails.description').notEmpty().withMessage('Achievement description is required'),
  body('templateId').notEmpty().withMessage('Template ID is required')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user is admin or instructor
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const certificateRequest = {
      studentId: req.body.studentId,
      achievementType: req.body.achievementType,
      achievementDetails: req.body.achievementDetails,
      templateId: req.body.templateId,
      issuedBy: req.user.id
    };

    const certificate = await certificateService.generateCertificate(certificateRequest);

    res.json({
      success: true,
      message: 'Certificate generated successfully',
      certificate
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to generate certificate' 
    });
  }
});

// Get certificate by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const certificate = await certificateService.getCertificate(req.params.id);
    
    // Check if user has permission to view this certificate
    if (req.user.role !== 'admin' && req.user.role !== 'instructor' && 
        certificate.studentId.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ success: true, certificate });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(404).json({ message: 'Certificate not found' });
  }
});

// Download certificate
router.get('/:id/download', protect, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'instructor' && 
        certificate.studentId.toString() !== req.user.studentId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Increment download count
    await certificate.incrementDownloadCount();

    // Send file
    res.download(certificate.filePath, `certificate_${certificate.verificationCode}.pdf`);
  } catch (error) {
    console.error('Error downloading certificate:', error);
    res.status(500).json({ message: 'Failed to download certificate' });
  }
});

// Verify certificate (Public endpoint)
router.post('/verify', [
  body('verificationCode').notEmpty().withMessage('Verification code is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await certificateService.verifyCertificate(req.body.verificationCode);
    res.json(result);
  } catch (error) {
    console.error('Error verifying certificate:', error);
    res.status(500).json({ 
      isValid: false, 
      error: 'Verification service temporarily unavailable' 
    });
  }
});

// Revoke certificate
router.put('/:id/revoke', adminOnly, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    await certificate.revoke();
    res.json({ success: true, message: 'Certificate revoked successfully' });
  } catch (error) {
    console.error('Error revoking certificate:', error);
    res.status(500).json({ message: 'Failed to revoke certificate' });
  }
});

// Get certificates by student (for student portal)
router.get('/student/:studentId', protect, async (req, res) => {
  try {
    // Check if user is accessing their own certificates or is admin/instructor
    if (req.user.role !== 'admin' && req.user.role !== 'instructor' && 
        req.user.studentId !== req.params.studentId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const certificates = await certificateService.getCertificatesByStudent(req.params.studentId);
    res.json({ success: true, certificates });
  } catch (error) {
    console.error('Error fetching student certificates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get certificate statistics (Admin only)
router.get('/stats/overview', adminOnly, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const stats = await certificateService.getCertificateStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching certificate stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;