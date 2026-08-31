const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const PORT = process.env.PORT || 5000;

// Export app instance
module.exports = app;

// Only start listening when run directly (local development)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('====================================================');
    console.log(' SEAGULL GENERAL SUPPLY LIMITED - BACKEND SERVER');
    console.log(' Services Beyond Measure!');
    console.log('====================================================');
    console.log(` Server running on: http://localhost:${PORT}`);
    console.log(` API Health Check: http://localhost:${PORT}/api/health`);
    console.log(` API Products:     http://localhost:${PORT}/api/products`);
    console.log('====================================================');
  });
}