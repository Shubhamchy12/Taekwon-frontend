const jwt = require('jsonwebtoken');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  console.log('🔐 Auth middleware called for:', req.method, req.path);
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('🎫 Token found in headers');
    }

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded.id);

    // Handle mock user (when database is disabled)
    if (decoded.id === 'mock-admin-id') {
      console.log('Mock admin authenticated successfully');
      req.user = {
        _id: 'mock-admin-id',
        id: 'mock-admin-id',
        name: 'Combat Warrior Admin',
        email: 'admin@combatwarrior.com',
        role: 'admin',
        isActive: true
      };
      return next();
    }

    // If database is disabled, only allow mock users
    if (process.env.MONGODB_URI === 'disabled') {
      return res.status(401).json({
        status: 'error',
        message: 'Database unavailable. Only mock admin login allowed.'
      });
    }

    // Get user from token (database mode)
    try {
      const User = require('../models/User');
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Token is invalid. User not found.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'User account is deactivated.'
        });
      }

      req.user = user;
      next();
    } catch (dbError) {
      console.error('Database error in auth middleware:', dbError);
      return res.status(500).json({
        status: 'error',
        message: 'Database error during authentication.'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error.message, error.stack);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired.'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Server error during authentication.'
    });
  }
};

// Restrict to specific roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log('Role check - User:', req.user?.role, 'Required roles:', roles);
    if (!req.user || !roles.includes(req.user.role)) {
      console.log('Access denied - insufficient permissions');
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Insufficient permissions.'
      });
    }
    console.log('Role check passed');
    next();
  };
};

// Admin only middleware
const adminOnly = restrictTo('admin');

// Admin or Instructor middleware
const staffOnly = restrictTo('admin', 'instructor');

module.exports = {
  protect,
  restrictTo,
  adminOnly,
  staffOnly
};