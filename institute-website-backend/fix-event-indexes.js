const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    fixIndexes();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

async function fixIndexes() {
  try {
    const Event = require('./models/Event');
    
    console.log('\n🔧 Fixing Event collection indexes...\n');
    
    // Get all indexes
    const indexes = await Event.collection.getIndexes();
    console.log('📋 Current indexes:', Object.keys(indexes));
    
    // Drop the problematic eventId index if it exists
    if (indexes.eventId_1) {
      console.log('\n🗑️  Dropping old eventId_1 index...');
      await Event.collection.dropIndex('eventId_1');
      console.log('✅ Dropped eventId_1 index');
    } else {
      console.log('\n✅ No eventId_1 index found (already clean)');
    }
    
    // Recreate indexes based on current schema
    console.log('\n🔄 Syncing indexes with current schema...');
    await Event.syncIndexes();
    console.log('✅ Indexes synced successfully');
    
    // Show final indexes
    const finalIndexes = await Event.collection.getIndexes();
    console.log('\n📋 Final indexes:', Object.keys(finalIndexes));
    
    console.log('\n✅ Index fix complete!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error fixing indexes:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}
