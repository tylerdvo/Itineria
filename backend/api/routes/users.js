const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserPreferences
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Protect all routes in this router
router.use(protect);

// Get all users - admin only
router.get('/', authorize('admin'), getUsers);

// Get, update, delete single user
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// Get user preferences
router.get('/:id/preferences', getUserPreferences);

module.exports = router;