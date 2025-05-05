const User = require('../models/User');
const { admin } = require('../config/firebase');
const logger = require('../utils/logger');

// Register a new user
exports.registerUser = async (userData) => {
  try {
    console.log('📩 Registering user with:', userData); // ADD THIS LINE

    const user = await User.create(userData);

    const token = user.getSignedJwtToken();
    return { user, token };
  } catch (error) {
    console.error('❌ Registration error:', error.message); // ADD THIS LINE
    logger.error(`Error registering user: ${error.message}`);
    throw error;
  }
};


// Register with Firebase and sync with MongoDB
exports.registerFirebaseUser = async (firebaseUser) => {
  try {
    // Check if user exists by email
    let user = await User.findOne({ email: firebaseUser.email });
    
    if (user) {
      // Update existing user with Firebase UID
      user.firebaseUid = firebaseUser.uid;
      await user.save();
    } else {
      // Create new user with Firebase data
      user = await User.create({
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email,
        firebaseUid: firebaseUser.uid,
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
      });
    }
    
    // Generate JWT token
    const token = user.getSignedJwtToken();
    
    return { user, token };
  } catch (error) {
    logger.error(`Error registering Firebase user: ${error.message}`);
    throw error;
  }
};

// Login user
exports.loginUser = async (email, password) => {
  try {
    // Find user by email and include password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = user.getSignedJwtToken();
    
    return { user, token };
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    throw error;
  }
};

// Verify Firebase token and get user
exports.verifyFirebaseToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    logger.error(`Error verifying Firebase token: ${error.message}`);
    throw error;
  }
};