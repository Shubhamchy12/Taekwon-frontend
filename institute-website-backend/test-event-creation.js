const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    testEventCreation();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

async function testEventCreation() {
  try {
    const Event = require('./models/Event');
    
    console.log('\n🧪 Testing Event Creation...\n');
    
    const testEventData = {
      name: 'Test Tournament 2025',
      eventType: 'Tournament',
      eventLevel: 'Beginner',
      description: 'Test event for debugging',
      date: new Date('2025-03-15'),
      location: 'Test Location',
      capacity: 50,
      currentParticipants: 0,
      status: 'Scheduled',
      isActive: true
    };
    
    console.log('📦 Test event data:', JSON.stringify(testEventData, null, 2));
    
    const event = new Event(testEventData);
    await event.save();
    
    console.log('\n✅ Event created successfully!');
    console.log('Event ID:', event._id);
    console.log('Event Name:', event.name);
    console.log('Event Type:', event.eventType);
    console.log('Event Level:', event.eventLevel);
    
    // Clean up - delete the test event
    await Event.findByIdAndDelete(event._id);
    console.log('\n🧹 Test event cleaned up');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating event:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}
