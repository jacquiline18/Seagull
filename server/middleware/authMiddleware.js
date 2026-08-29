const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect admin routes with JWT verification
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seagull_secret_laboratory_token_key_2026');

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user && decoded.id === 'usr-admin-01') {
        // Fallback for mock user
        req.user = { id: 'usr-admin-01', name: 'Seagull Admin Operations', email: 'admin@seagull.co.tz', role: 'admin' };
      }
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }
};

module.exports = { protect };
