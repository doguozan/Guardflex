// MongoDB Connection Test Script
// Run with: node server/scripts/checkConnection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('📍 Connection String:', process.env.MONGODB_URI ? '✅ Found' : '❌ Not found');
    
    await connectDB();
    
    // Test query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📊 Database Collections:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    console.log('\n✅ Connection test successful!');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection test failed:');
    console.error(error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('  1. Check your .env file has MONGODB_URI');
    console.log('  2. Verify MongoDB Atlas network access settings');
    console.log('  3. Check your internet connection');
    console.log('  4. Verify username/password in connection string');
    process.exit(1);
  }
};

testConnection();

