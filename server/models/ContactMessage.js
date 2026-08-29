const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: 'General Laboratory Inquiry'
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['contact_inquiry', 'quote_request', 'consultation'],
    default: 'contact_inquiry'
  },
  status: {
    type: String,
    enum: ['Unread', 'In Progress', 'Responded', 'Archived'],
    default: 'Unread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
