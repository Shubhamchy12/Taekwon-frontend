const express = require('express');
const router = express.Router();

console.log('🥋 Belt routes module loading...');

const {
  getBeltLevels,
  getBeltById,
  createBelt,
  updateBelt,
  deleteBelt,
  getPromotions,
  createPromotion,
  getBeltTests,
  createBeltTest,
  updateBeltTest,
  getBeltStatistics
} = require('../controllers/beltController');

const { protect, adminOnly } = require('../middleware/auth');

console.log('🥋 Belt routes configured');

// Public routes (none - all require authentication)

// Protected routes - require authentication
router.use(protect);

// Belt Levels Routes
router.get('/levels', getBeltLevels);
router.get('/levels/:id', getBeltById);

// Promotions Routes
router.get('/promotions', getPromotions);

// Belt Tests Routes
router.get('/tests', getBeltTests);

// Statistics Route
router.get('/statistics', getBeltStatistics);

// Admin only routes
router.use(adminOnly);

// Belt Levels Admin Routes
router.post('/levels', createBelt);
router.put('/levels/:id', updateBelt);
router.delete('/levels/:id', deleteBelt);

// Promotions Admin Routes
router.post('/promotions', createPromotion);

// Belt Tests Admin Routes
router.post('/tests', createBeltTest);
router.put('/tests/:id', updateBeltTest);

module.exports = router;
