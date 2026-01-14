const mongoose = require('mongoose');
require('dotenv').config();

async function fixEventParticipantCounts() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const Event = require('./models/Event');
    const EventParticipant = require('./models/EventParticipant');

    console.log('\n🔍 Checking all events...\n');

    const events = await Event.find({});
    console.log(`Found ${events.length} events\n`);

    let fixedCount = 0;

    for (const event of events) {
      // Count actual participants for this event
      const actualCount = await EventParticipant.countDocuments({ event: event._id });
      
      if (event.currentParticipants !== actualCount) {
        console.log(`❌ Event "${event.name}" has incorrect count:`);
        console.log(`   Database shows: ${event.currentParticipants}`);
        console.log(`   Actual count: ${actualCount}`);
        
        // Fix the count
        event.currentParticipants = actualCount;
        await event.save();
        
        console.log(`   ✅ Fixed to: ${actualCount}\n`);
        fixedCount++;
      } else {
        console.log(`✅ Event "${event.name}" count is correct: ${actualCount}`);
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`\n✅ Sync completed!`);
    console.log(`   Total events: ${events.length}`);
    console.log(`   Fixed: ${fixedCount}`);
    console.log(`   Already correct: ${events.length - fixedCount}\n`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

fixEventParticipantCounts();
