const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/seagull_db');
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Notice] Could not connect to MongoDB instance: ${error.message}`);
    console.warn(`[MongoDB Notice] Server is running in resilient mode. Local mock storage and API controllers will handle requests.`);
  }
};

module.exports = connectDB;
