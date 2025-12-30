const express = require('express');
const Admission = require('../models/Admission');
const { validateAdmission } = require('../middleware/validation');
const { sendAdmissionConfirmation, sendAdminNotification } = require('../utils/emailService');

const router = express.Router();

// @desc    Submit admission application
// @route   POST /api/admissions
// @access  Public
router.post('/', validateAdmission, async (req, res) => {
  try {
    const admissionData = req.body;

    // Check if email already exists
    const existingApplication = await Admission.findOne({ email: admissionData.email });
    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'An application with this email already exists'
      });
    }

    // Create admission application
    const admission = await Admission.create(admissionData);

    // Calculate age for the response
    const age = admission.age;

    // Send confirmation email to applicant
    try {
      await sendAdmissionConfirmation({ ...admissionData, age });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with the response even if email fails
    }

    // Send notification to admin
    try {
      await sendAdminNotification('admission', { ...admissionData, age });
    } catch (emailError) {
      console.error('Admin notification failed:', emailError);
    }

    res.status(201).json({
      status: 'success',
      message: 'Admission application submitted successfully. You will receive a confirmation email shortly.',
      data: {
        admission: {
          id: admission._id,
          fullName: admission.fullName,
          email: admission.email,
          courseLevel: admission.courseLevel,
          status: admission.status,
          submittedAt: admission.submittedAt,
          age: age
        }
      }
    });

  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error submitting admission application'
    });
  }
});

// @desc    Get admission application status
// @route   GET /api/admissions/status/:email
// @access  Public
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const admission = await Admission.findOne({ email }).select(
      'fullName email courseLevel status submittedAt reviewedAt studentId'
    );

    if (!admission) {
      return res.status(404).json({
        status: 'error',
        message: 'No admission application found for this email'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        admission: {
          id: admission._id,
          fullName: admission.fullName,
          email: admission.email,
          courseLevel: admission.courseLevel,
          status: admission.status,
          submittedAt: admission.submittedAt,
          reviewedAt: admission.reviewedAt,
          studentId: admission.studentId,
          age: admission.age
        }
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error checking admission status'
    });
  }
});

// @desc    Get admission statistics (public)
// @route   GET /api/admissions/stats
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const stats = await Admission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalApplications = await Admission.countDocuments();
    const thisMonthApplications = await Admission.countDocuments({
      submittedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    const levelStats = await Admission.aggregate([
      {
        $group: {
          _id: '$courseLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalApplications,
        thisMonthApplications,
        statusBreakdown: stats,
        levelBreakdown: levelStats
      }
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching admission statistics'
    });
  }
});

module.exports = router;