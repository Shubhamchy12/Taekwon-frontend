const express = require('express');
const Contact = require('../models/Contact');
const { validateContact } = require('../middleware/validation');
const { sendContactConfirmation, sendAdminNotification } = require('../utils/emailService');

const router = express.Router();

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', validateContact, async (req, res) => {
  try {
    const contactData = req.body;

    // Create contact message
    const contact = await Contact.create(contactData);

    // Send confirmation email to user
    try {
      await sendContactConfirmation(contactData);
    } catch (emailError) {
      console.error('Contact confirmation email failed:', emailError);
      // Continue with the response even if email fails
    }

    // Send notification to admin
    try {
      await sendAdminNotification('contact', contactData);
    } catch (emailError) {
      console.error('Admin notification failed:', emailError);
    }

    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully. We will get back to you within 24 hours.',
      data: {
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          inquiryType: contact.inquiryType,
          status: contact.status,
          submittedAt: contact.submittedAt
        }
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error sending message'
    });
  }
});

// @desc    Get contact message status
// @route   GET /api/contact/status/:email
// @access  Public
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const contacts = await Contact.find({ email })
      .select('name email inquiryType status submittedAt respondedAt responseMessage')
      .sort({ submittedAt: -1 })
      .limit(5);

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No messages found for this email'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        contacts: contacts.map(contact => ({
          id: contact._id,
          name: contact.name,
          email: contact.email,
          inquiryType: contact.inquiryType,
          status: contact.status,
          submittedAt: contact.submittedAt,
          respondedAt: contact.respondedAt,
          responseMessage: contact.responseMessage
        }))
      }
    });

  } catch (error) {
    console.error('Contact status check error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error checking message status'
    });
  }
});

// @desc    Get contact statistics (public)
// @route   GET /api/contact/stats
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalMessages = await Contact.countDocuments();
    const thisMonthMessages = await Contact.countDocuments({
      submittedAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    });

    const inquiryTypeStats = await Contact.aggregate([
      {
        $group: {
          _id: '$inquiryType',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusStats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalMessages,
        thisMonthMessages,
        inquiryTypeBreakdown: inquiryTypeStats,
        statusBreakdown: statusStats
      }
    });

  } catch (error) {
    console.error('Contact stats fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching contact statistics'
    });
  }
});

module.exports = router;