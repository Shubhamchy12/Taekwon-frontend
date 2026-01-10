const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const admissionRoutes = require('./routes/admissions');
const adminAdmissionRoutes = require('./routes/admin/admissions');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const certificateRoutes = require('./routes/certificates');
const achievementRoutes = require('./routes/achievements');
const badgeRoutes = require('./routes/badges');
const certificateTemplateRoutes = require('./routes/certificate-templates');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { createDefaultAdmin } = require('./utils/createAdmin');

const app = express();

// Simple test route right after app creation
app.get('/api/simple-test', (req, res) => {
  res.json({ status: 'success', message: 'Simple test route working' });
});

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'disabled') {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      createDefaultAdmin();
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      console.log('⚠️  Running without database - using mock data');
    });
} else {
  console.log('📝 Database disabled - running in mock mode');
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, inquiryType, message, isSubscribed } = req.body;

    // Basic validation
    if (!name || !email || !inquiryType || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, inquiry type, and message are required'
      });
    }

    // Create contact object (in a real app, this would save to database)
    const contact = {
      _id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      inquiryType,
      message: message.trim(),
      status: 'new',
      priority: 'medium',
      submittedAt: new Date().toISOString(),
      adminNotes: '',
      responseMessage: '',
      isSubscribed: isSubscribed || false
    };

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('New contact submission:', contact);

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
      message: 'Error sending message. Please try again.'
    });
  }
});

// Direct contact routes for testing
app.get('/api/contact-stats', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      totalContacts: 3,
      newContacts: 1,
      inProgressContacts: 1,
      resolvedContacts: 1,
      thisMonthContacts: 2,
      recentActivity: 1,
      inquiryTypeBreakdown: [
        { _id: 'admission', count: 1 },
        { _id: 'trial', count: 1 },
        { _id: 'fees', count: 1 }
      ],
      priorityBreakdown: [
        { _id: 'high', count: 1 },
        { _id: 'medium', count: 1 },
        { _id: 'low', count: 1 }
      ]
    }
  });
});

app.get('/api/contact/admin/stats', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      totalContacts: 3,
      newContacts: 1,
      inProgressContacts: 1,
      resolvedContacts: 1,
      thisMonthContacts: 2,
      recentActivity: 1,
      inquiryTypeBreakdown: [
        { _id: 'admission', count: 1 },
        { _id: 'trial', count: 1 },
        { _id: 'fees', count: 1 }
      ],
      priorityBreakdown: [
        { _id: 'high', count: 1 },
        { _id: 'medium', count: 1 },
        { _id: 'low', count: 1 }
      ]
    }
  });
});

app.get('/api/contact/admin', (req, res) => {
  const mockContacts = [
    {
      _id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      inquiryType: 'admission',
      message: 'I want to enroll my son in Taekwon-Do classes. Please provide more information about the beginner courses.',
      status: 'new',
      priority: 'high',
      submittedAt: '2024-01-15T10:30:00Z',
      adminNotes: '',
      responseMessage: ''
    },
    {
      _id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      inquiryType: 'trial',
      message: 'Can I schedule a trial class for my daughter? She is 8 years old.',
      status: 'in-progress',
      priority: 'medium',
      submittedAt: '2024-01-14T14:20:00Z',
      adminNotes: 'Scheduled trial for next week',
      responseMessage: ''
    },
    {
      _id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 9876543212',
      inquiryType: 'fees',
      message: 'What are the monthly fees for intermediate level classes?',
      status: 'resolved',
      priority: 'low',
      submittedAt: '2024-01-13T09:15:00Z',
      adminNotes: 'Fee information provided',
      responseMessage: 'Thank you for your inquiry. Our intermediate level classes are ₹3000 per month.'
    }
  ];

  res.status(200).json({
    status: 'success',
    data: {
      contacts: mockContacts,
      pagination: {
        page: 1,
        limit: 10,
        total: mockContacts.length,
        pages: 1
      }
    }
  });
});

app.put('/api/contact/admin/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Contact updated successfully',
    data: {
      contact: {
        _id: req.params.id,
        ...req.body,
        updatedAt: new Date()
      }
    }
  });
});

app.delete('/api/contact/admin/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Contact deleted successfully'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/admin/admissions', adminAdmissionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/certificate-templates', certificateTemplateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Combat Warrior Institute API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Test global endpoint
app.get('/api/test-global', (req, res) => {
  res.json({ status: 'success', message: 'Global route working' });
});

// Test contact endpoint directly in server.js
app.get('/api/contact/direct-test', (req, res) => {
  res.json({ status: 'success', message: 'Direct contact route working' });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});