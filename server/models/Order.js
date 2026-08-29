const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    deliveryAddress: { type: String, required: true }
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
