const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Initialize MongoDB connection
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const path = require('path');

// Serve static assets and full website directly on port 5000
app.use(express.static(path.join(__dirname, '..')));

// Route for root - serves the complete Seagull web application directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'preview.html'));
});

// Route for /order-request
app.get('/order-request', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'preview.html'));
});

// Route for /products
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'preview.html'));
});

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Seagull General Supply Limited API',
    tagline: 'Services Beyond Measure!',
    timestamp: new Date().toISOString()
  });
});

// Mount Routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` SEAGULL GENERAL SUPPLY LIMITED - BACKEND SERVER`);
  console.log(` "Services Beyond Measure!"`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Running on port: http://localhost:${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});
