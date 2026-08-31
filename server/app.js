const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

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

// API Router
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Seagull General Supply Limited API',
    tagline: 'Services Beyond Measure!',
    timestamp: new Date().toISOString()
  });
});

// Resource routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/contact', contactRoutes);

// Mount API router for unified Netlify rewrites and standard API paths
app.use('/api', apiRouter);
app.use('/.netlify/functions/api', apiRouter);
app.use('/', apiRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
