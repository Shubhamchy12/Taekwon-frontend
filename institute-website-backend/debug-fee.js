const mongoose = require('mongoose');
require('dotenv').config();

async function debugFee() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const Fee = require('./models/Fee');
    console.log('Fee model loaded');
    console.log('Schema paths:', Object.keys(Fee.schema.paths));
    console.log('Required paths:', Fee.schema.requiredPaths());

    // Try to create a simple fee
    const testFee = {
      studentName: 'Debug Test',
      course: 'Beginner',
      feeType: 'Monthly Fee',
      amount: 1000,
      dueDate: new Date('2025-02-15')
    };

    console.log('Creating fee with:', testFee);
    const fee = new Fee(testFee);
    await fee.save();
    console.log('Fee created successfully:', fee._id);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
  }
}

debugFee();