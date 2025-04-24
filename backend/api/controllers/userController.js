const User = require('../models/User');
const Preference = require('../models/Preference');
const logger = require('../utils/logger');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is requesting their own profile or is an admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this user profile'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    // Check if user exists
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is updating their own profile or is an admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this user profile'
      });
    }
    
    // Fields to update
    const { name, email } = req.body;
    const fieldsToUpdate = {};
    
    if (name) fieldsToUpdate.name = name;
    if (email) fieldsToUpdate.email = email;
    
    // Update user
    user = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is deleting their own profile or is an admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this user profile'
      });
    }
    
    // Delete user preferences
    await Preference.findOneAndDelete({ userId: req.params.id });
    
    // Delete user
    await user.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user preferences
// @route   GET /api/v1/users/:id/preferences
// @access  Private
exports.getUserPreferences = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Check if user is requesting their own preferences or is an admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access these preferences'
      });
    }
    
    // Get user preferences
    const preferences = await Preference.findOne({ userId: req.params.id });
    
    if (!preferences) {
      return res.status(404).json({
        success: false,
        error: 'No preferences found for this user'
      });
    }
    
    res.status(200).json({
      success: true,
      data: preferences
    });
  } catch (error) {
    next(error);
  }
};