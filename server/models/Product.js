const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true
  },
  sku: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'Laboratory Instruments',
      'Chemistry Equipment',
      'Measuring Equipment',
      'Glassware',
      'Safety Equipment',
      'Laboratory Consumables',
      'Educational Supplies',
      'Other'
    ],
    default: 'Laboratory Instruments'
  },
  categoryId: {
    type: String,
    default: 'instruments'
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  price: {
    type: Number,
    required: [true, 'Please enter price in TZS'],
    default: 0
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  stock: {
    type: Number,
    required: [true, 'Please enter stock quantity'],
    default: 10
  },
  inStock: {
    type: Boolean,
    default: true
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  features: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
