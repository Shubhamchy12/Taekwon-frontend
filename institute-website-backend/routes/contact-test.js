const express = require('express');
const router = express.Router();

console.log('Contact test routes loaded');

// Simple test route
router.get('/test', (req, res) => {
  res.json({ status: 'success', message: 'Contact test routes working' });
});

module.exports = router;