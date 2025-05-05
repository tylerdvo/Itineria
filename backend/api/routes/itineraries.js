const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

// POST /api/v1/itineraries/:id/activities
router.post('/:id/activities', itineraryController.addActivity);

// GET /api/v1/itineraries/:id
router.get('/:id', itineraryController.getUserItineraries);

module.exports = router;

router.put('/:id/activities/:activityId', itineraryController.updateActivity);
router.delete('/:id/activities/:activityId', itineraryController.deleteActivity);