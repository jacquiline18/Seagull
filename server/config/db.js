const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // Reuse existing connection if active
  if (isConnected || mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/seagull_db';
    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Notice] Could not connect to MongoDB instance: ${error.message}`);
    console.warn(`[MongoDB Notice] Server is running in resilient mode. Local mock storage and API controllers will handle requests.`);
  }
};

module.exports = connectDB;
