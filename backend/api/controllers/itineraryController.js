// backend/api/controllers/itineraryController.js
const Itinerary = require('../models/Itinerary');
const Preference = require('../models/Preference');
const itineraryService = require('../services/itineraryService');
const logger = require('../utils/logger');

// @desc    Get all itineraries
// @route   GET /api/v1/itineraries
// @access  Private
exports.getItineraries = async (req, res, next) => {
  try {
    let query;
    
    // If user is not admin, show only their itineraries or public ones
    if (req.user.role !== 'admin') {
      query = {
        $or: [
          { userId: req.user._id },
          { collaborators: req.user._id },
          { isPublic: true }
        ]
      };
    }
    
    // Adding filters from query params
    if (req.query.destination) {
      query = { ...query, destination: { $regex: req.query.destination, $options: 'i' } };
    }
    
    if (req.query.startDate) {
      query = { ...query, startDate: { $gte: new Date(req.query.startDate) } };
    }
    
    if (req.query.endDate) {
      query = { ...query, endDate: { $lte: new Date(req.query.endDate) } };
    }
    
    // Find itineraries based on query
    const itineraries = await Itinerary.find(query)
      .populate('userId', 'name email')
      .populate('collaborators', 'name email');
    
    res.status(200).json({
      success: true,
      count: itineraries.length,
      data: itineraries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single itinerary
// @route   GET /api/v1/itineraries/:id
// @access  Private
exports.getItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('collaborators', 'name email');
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found'
      });
    }
    
    // Check if user is authorized to view the itinerary
    const isOwner = itinerary.userId._id.toString() === req.user.id.toString();
    const isCollaborator = itinerary.collaborators.some(
      user => user._id.toString() === req.user.id.toString()
    );
    
    if (!isOwner && !isCollaborator && !itinerary.isPublic && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this itinerary'
      });
    }
    
    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new itinerary
// @route   POST /api/v1/itineraries
// @access  Private
exports.createItinerary = async (req, res, next) => {
  try {
    // Create itinerary
    const itinerary = await itineraryService.createItinerary(req.body, req.user.id);
    
    res.status(201).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update itinerary
// @route   PUT /api/v1/itineraries/:id
// @access  Private
exports.updateItinerary = async (req, res, next) => {
  try {
    // Update itinerary
    const itinerary = await itineraryService.updateItinerary(
      req.params.id,
      req.body,
      req.user.id
    );
    
    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    if (error.message === 'Itinerary not found') {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found'
      });
    } else if (error.message === 'Not authorized to update this itinerary') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this itinerary'
      });
    }
    next(error);
  }
};

// @desc    Delete itinerary
// @route   DELETE /api/v1/itineraries/:id
// @access  Private
exports.deleteItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found'
      });
    }
    
    // Check if user is authorized to delete
    if (itinerary.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this itinerary'
      });
    }
    
    await itinerary.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add activity to itinerary
// @route   POST /api/v1/itineraries/:id/activities
// @access  Private
exports.addActivity = async (req, res, next) => {
  try {
    // Add activity
    const itinerary = await itineraryService.addActivity(
      req.params.id,
      req.body,
      req.user.id
    );
    
    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    if (error.message === 'Itinerary not found') {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found'
      });
    } else if (error.message === 'Not authorized to update this itinerary') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this itinerary'
      });
    }
    next(error);
  }
};

// @desc    Update activity in itinerary
// @route   PUT /api/v1/itineraries/:id/activities/:activityId
// @access  Private
exports.updateActivity = async (req, res, next) => {
  try {
    // Update activity
    const itinerary = await itineraryService.updateActivity(
      req.params.id,
      req.params.activityId,
      req.body,
      req.user.id
    );
    
    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    if (error.message === 'Itinerary not found' || error.message === 'Activity not found') {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    } else if (error.message === 'Not authorized to update this itinerary') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this itinerary'
      });
    }
    next(error);
  }
};

// @desc    Remove activity from itinerary
// @route   DELETE /api/v1/itineraries/:id/activities/:activityId
// @access  Private
exports.removeActivity = async (req, res, next) => {
  try {
    // Remove activity
    const itinerary = await itineraryService.removeActivity(
      req.params.id,
      req.params.activityId,
      req.user.id
    );
    
    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    if (error.message === 'Itinerary not found') {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found'
      });
    } else if (error.message === 'Not authorized to update this itinerary') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this itinerary'
      });
    }
    next(error);
  }
};

// @desc    Add collaborator to itinerary
// @route   POST /api/v1/itineraries/:id/collaborators
// @access  Private
exports.addCollaborator = async (req, res, next) => {
  try {
    const { collaboratorId } = req.body;
    
    if (!collaboratorId) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a collaborator ID'
      });
    }
    
    // Add collaborator
    const itinerary = await itineraryService.addCollaborator(
      req.params.id,
      collaboratorId,
      req.user.id
    );
    
    res.status(200).json({
      success: true,
      data: itinerary
    });
  } catch (error) {
    if (error.message === 'Itinerary not found') {
      return res.status(404).json({
        success: false,
        error: 'Itinerary not found'
      });
    } else if (error.message === 'Only the owner can add collaborators') {
      return res.status(403).json({
        success: false,
        error: 'Only the owner can add collaborators'
      });
    } else if (error.message === 'Collaborator already added') {
        return res.status(400).json({
          success: false,
          error: 'Collaborator already added'
        });
      }
      next(error);
    }
  };
  
  // @desc    Remove collaborator from itinerary
// @route   DELETE /api/v1/itineraries/:id/collaborators/:collaboratorId
// @access  Private
exports.removeCollaborator = async (req, res, next) => {
    try {
      // Remove collaborator
      const itinerary = await itineraryService.removeCollaborator(
        req.params.id,
        req.params.collaboratorId,
        req.user.id
      );
      
      res.status(200).json({
        success: true,
        data: itinerary
      });
    } catch (error) {
      if (error.message === 'Itinerary not found') {
        return res.status(404).json({
          success: false,
          error: 'Itinerary not found'
        });
      } else if (error.message === 'Only the owner can remove collaborators') {
        return res.status(403).json({
          success: false,
          error: 'Only the owner can remove collaborators'
        });
      }
      next(error);
    }
  };
  
  // @desc    Generate itinerary recommendations
  // @route   POST /api/v1/itineraries/generate
  // @access  Private
  exports.generateRecommendations = async (req, res, next) => {
    try {
      const { destination, startDate, endDate } = req.body;
      
      // Validate required fields
      if (!destination || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'Please provide destination, start date, and end date'
        });
      }
      
      // Get user preferences
      const preferences = await Preference.findOne({ userId: req.user.id });
      
      // Generate recommendations
      const recommendations = await itineraryService.generateRecommendations(
        req.user.id,
        destination,
        startDate,
        endDate,
        preferences || {}
      );
      
      res.status(200).json({
        success: true,
        data: recommendations
      });
    } catch (error) {
      if (error.message === 'Failed to generate recommendations from ML service') {
        return res.status(503).json({
          success: false,
          error: 'Recommendation service currently unavailable'
        });
      }
      next(error);
    }
  };