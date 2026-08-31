const serverless = require('serverless-http');
const connectDB = require('../../config/db');
const app = require('../../app');

const serverlessHandler = serverless(app);

module.exports.handler = async (event, context) => {
  // Allow Netlify/AWS Lambda to freeze the process and return immediately with active connection pool
  context.callbackWaitsForEmptyEventLoop = false;

  // Initialize or reuse database connection
  try {
    await connectDB();
  } catch (err) {
    console.warn('[Netlify Function DB Warning]:', err.message);
  }

  return serverlessHandler(event, context);
};
