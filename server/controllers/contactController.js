const ContactMessage = require('../models/ContactMessage');

let localMessages = [];

// @desc    Submit contact message or inquiry
// @route   POST /api/contact
// @access  Public
exports.sendMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please enter name, email, and message' });
    }

    let contactMsg;
    try {
      contactMsg = await ContactMessage.create({
        name,
        email,
        phone,
        subject,
        message,
        type: type || 'contact_inquiry'
      });
    } catch {
      contactMsg = {
        _id: 'msg-' + Date.now(),
        name,
        email,
        phone,
        subject,
        message,
        type: type || 'contact_inquiry',
        status: 'Unread',
        createdAt: new Date()
      };
      localMessages.unshift(contactMsg);
    }

    res.status(201).json({
      success: true,
      message: 'Message delivered to Seagull General Supply Limited team',
      data: contactMsg
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
exports.getMessages = async (req, res, next) => {
  try {
    let messages = [];
    try {
      messages = await ContactMessage.find().sort('-createdAt');
    } catch {
      messages = localMessages;
    }

    res.json({
      success: true,
      count: messages.length,
      messages: messages.length > 0 ? messages : localMessages
    });
  } catch (err) {
    next(err);
  }
};
