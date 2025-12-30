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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
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

// Test admin endpoint directly in server.js
app.get('/api/admin/test-direct', (req, res) => {
  res.json({ status: 'success', message: 'Direct admin route working' });
});

// Test global endpoint
app.get('/api/test-global', (req, res) => {
  res.json({ status: 'success', message: 'Global route working' });
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