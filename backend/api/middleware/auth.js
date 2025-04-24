const jwt = require('jsonwebtoken');
const { admin } = require('../config/firebase');
const User = require('../models/User');
const config = require('../config');
const logger = require('../utils/logger');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and has the right format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add user from payload
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error.message}`);
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Firebase authentication middleware
exports.firebaseAuth = async (req, res, next) => {
  let token;

  // Check if auth header exists and has the right format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken;
    
    // Try to find user by Firebase UID
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (user) {
      req.user = user;
    }
    
    next();
  } catch (error) {
    logger.error(`Firebase auth middleware error: ${error.message}`);
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        error: 'User has no assigned role'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};