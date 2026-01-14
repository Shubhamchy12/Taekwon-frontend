const mongoose = require('mongoose');
require('dotenv').config();

async function fixEventSchema() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('events');

    console.log('\n📋 Current indexes on events collection:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    // Drop old indexes that don't exist in current schema
    const indexesToCheck = ['eventId_1', 'eventType_1', 'eventLevel_1'];
    
    for (const indexName of indexesToCheck) {
      try {
        const indexInfo = indexes.find(idx => idx.name === indexName);
        if (indexInfo) {
          console.log(`\n🔍 Checking index: ${indexName}`);
          console.log(`   Current definition:`, JSON.stringify(indexInfo));
          
          // Drop and recreate to ensure it's correct
          console.log(`🗑️  Dropping index: ${indexName}`);
          await collection.dropIndex(indexName);
          console.log(`✅ Dropped index: ${indexName}`);
        }
      } catch (error) {
        if (error.code === 27 || error.codeName === 'IndexNotFound') {
          console.log(`ℹ️  Index ${indexName} doesn't exist (OK)`);
        } else {
          console.log(`⚠️  Error with ${indexName}:`, error.message);
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
    const Event = require('./models/Event');
    await Event.syncIndexes();
    console.log('✅ Indexes synced successfully');

    console.log('\n📋 Final indexes:');
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach(index => {
      console.log(`  - ${index.name}:`, JSON.stringify(index.key));
    });

    console.log('\n✅ Event schema fix completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Restart your backend server');
    console.log('   2. Try creating a new event');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

fixEventSchema();
