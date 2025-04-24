const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  firebaseAuth
} = require('../controllers/authController');
const { protect, firebaseAuth: firebaseAuthMiddleware } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  validateRequest
} = require('../utils/validators');

// Register user
router.post('/register', registerValidation, validateRequest, register);

// Login user
router.post('/login', loginValidation, validateRequest, login);

// Logout user
router.get('/logout', logout);

// Get current user
router.get('/me', protect, getMe);

// Firebase authentication
router.post('/firebase', firebaseAuthMiddleware, firebaseAuth);

module.exports = router;