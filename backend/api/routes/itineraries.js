const express = require('express');
const router = express.Router();
const {
  getItineraries,
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  addActivity,
  updateActivity,
  removeActivity,
  addCollaborator,
  removeCollaborator,
  generateRecommendations
} = require('../controllers/itineraryController');
const { protect } = require('../middleware/auth');
const { itineraryValidation, validateRequest } = require('../utils/validators');

// Protect all routes
router.use(protect);

// Generate recommendations
router.post('/generate', generateRecommendations);

// Itinerary main routes
router.route('/')
  .get(getItineraries)
  .post(itineraryValidation, validateRequest, createItinerary);

router.route('/:id')
  .get(getItinerary)
  .put(updateItinerary)
  .delete(deleteItinerary);

// Activity routes
router.route('/:id/activities')
  .post(addActivity);

router.route('/:id/activities/:activityId')
  .put(updateActivity)
  .delete(removeActivity);

// Collaborator routes
router.route('/:id/collaborators')
  .post(addCollaborator);

router.route('/:id/collaborators/:collaboratorId')
  .delete(removeCollaborator);

module.exports = router;