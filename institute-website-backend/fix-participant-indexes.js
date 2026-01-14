const mongoose = require('mongoose');
require('dotenv').config();

async function fixParticipantIndexes() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('eventparticipants');

    console.log('\n📋 Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    // Drop old indexes that don't match current schema
    const indexesToDrop = ['eventId_1_studentId_1', 'eventId_1', 'studentId_1'];
    
    for (const indexName of indexesToDrop) {
      try {
        console.log(`\n🗑️  Attempting to drop index: ${indexName}`);
        await collection.dropIndex(indexName);
        console.log(`✅ Dropped index: ${indexName}`);
      } catch (error) {
        if (error.code === 27 || error.codeName === 'IndexNotFound') {
          console.log(`ℹ️  Index ${indexName} doesn't exist (OK)`);
        } else {
          console.log(`⚠️  Error dropping ${indexName}:`, error.message);
        }
      }
    }

    console.log('\n📋 Indexes after cleanup:');
    const indexesAfter = await collection.indexes();
    indexesAfter.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    // Sync with current schema
    console.log('\n🔄 Syncing indexes with current schema...');
    const EventParticipant = require('./models/EventParticipant');
    await EventParticipant.syncIndexes();
    console.log('✅ Indexes synced successfully');

    console.log('\n📋 Final indexes:');
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    console.log('\n✅ EventParticipant index fix completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Restart your backend server');
    console.log('   2. Try registering a student to an event');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

fixParticipantIndexes();
