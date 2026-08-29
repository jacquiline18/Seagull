const express = require('express');
const { sendMessage, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(sendMessage)
  .get(protect, getMessages);

module.exports = router;
