const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'seagull_secret_laboratory_token_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Admin / User Login
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Check user in MongoDB if connected
    let user;
    try {
      user = await User.findOne({ email }).select('+password');
    } catch {
      user = null;
    }

    // If found in MongoDB, verify password
    if (user) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      const token = generateToken(user._id);
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    // Default built-in admin credentials check
    if (email === 'admin@seagull.co.tz' && password === 'admin123') {
      const token = generateToken('usr-admin-01');
      return res.json({
        success: true,
        token,
        user: {
          id: 'usr-admin-01',
          name: 'Seagull Admin Operations',
          email: 'admin@seagull.co.tz',
          role: 'admin'
        }
      });
    }

    return res.status(401).json({ success: false, error: 'Invalid credentials. Use admin@seagull.co.tz / admin123' });
  } catch (err) {
    next(err);
  }
};

// @desc    Register a new staff/user
// @route   POST /api/auth/register
// @access  Private/Admin
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists with this email' });
    }

    user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get Current Logged in User
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
