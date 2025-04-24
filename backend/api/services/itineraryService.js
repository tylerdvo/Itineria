const axios = require('axios');
const Itinerary = require('../models/Itinerary');
const config = require('../config');
const logger = require('../utils/logger');

// Generate itinerary recommendations based on user preferences and destination
exports.generateRecommendations = async (userId, destination, startDate, endDate, preferences) => {
  try {
    // Call ML service for recommendations
    const response = await axios.post(`${config.mlServiceUrl}/recommendations`, {
      userId,
      destination,
      startDate,
      endDate,
      preferences
    });
    
    return response.data;
  } catch (error) {
    logger.error(`Error generating recommendations: ${error.message}`);
    throw new Error('Failed to generate recommendations from ML service');
  }
};

// Create a new itinerary with activities
exports.createItinerary = async (itineraryData, userId) => {
  try {
    // Add user ID to itinerary data
    itineraryData.userId = userId;
    
    // If activities are included, set the correct dates
    if (itineraryData.activities && itineraryData.activities.length > 0) {
      const startDate = new Date(itineraryData.startDate);
      
      itineraryData.activities = itineraryData.activities.map(activity => {
        if (!activity.date) {
          // Set activity date based on day of itinerary if not provided
          const activityDate = new Date(startDate);
          activityDate.setDate(startDate.getDate() + (activity.day || 0));
          activity.date = activityDate;
        }
        return activity;
      });
    }
    
    // Create itinerary
    const itinerary = await Itinerary.create(itineraryData);
    
    return itinerary;
  } catch (error) {
    logger.error(`Error creating itinerary: ${error.message}`);
    throw error;
  }
};

// Update an existing itinerary
exports.updateItinerary = async (itineraryId, updateData, userId) => {
  try {
    // Find itinerary
    let itinerary = await Itinerary.findById(itineraryId);
    
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    
    // Check if user is authorized to update
    if (itinerary.userId.toString() !== userId.toString() && 
        !itinerary.collaborators.some(id => id.toString() === userId.toString())) {
      throw new Error('Not authorized to update this itinerary');
    }
    
    // Update itinerary
    itinerary = await Itinerary.findByIdAndUpdate(
      itineraryId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    return itinerary;
  } catch (error) {
    logger.error(`Error updating itinerary: ${error.message}`);
    throw error;
  }
};

// Add an activity to an itinerary
exports.addActivity = async (itineraryId, activityData, userId) => {
  try {
    // Find itinerary
    const itinerary = await Itinerary.findById(itineraryId);
    
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    
    // Check if user is authorized
    if (itinerary.userId.toString() !== userId.toString() && 
        !itinerary.collaborators.some(id => id.toString() === userId.toString())) {
      throw new Error('Not authorized to update this itinerary');
    }
    
    // Add activity
    itinerary.activities.push(activityData);
    await itinerary.save();
    
    return itinerary;
  } catch (error) {
    logger.error(`Error adding activity: ${error.message}`);
    throw error;
  }
};

// Update an activity in an itinerary
exports.updateActivity = async (itineraryId, activityId, activityData, userId) => {
  try {
    // Find itinerary
    const itinerary = await Itinerary.findById(itineraryId);
    
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    
    // Check if user is authorized
    if (itinerary.userId.toString() !== userId.toString() && 
        !itinerary.collaborators.some(id => id.toString() === userId.toString())) {
      throw new Error('Not authorized to update this itinerary');
    }
    
    // Find activity index
    const activityIndex = itinerary.activities.findIndex(
      activity => activity._id.toString() === activityId
    );
    
    if (activityIndex === -1) {
      throw new Error('Activity not found');
    }
    
    // Update activity
    itinerary.activities[activityIndex] = {
      ...itinerary.activities[activityIndex].toObject(),
      ...activityData
    };
    
    await itinerary.save();
    
    return itinerary;
  } catch (error) {
    logger.error(`Error updating activity: ${error.message}`);
    throw error;
  }
};

// Remove an activity from an itinerary
exports.removeActivity = async (itineraryId, activityId, userId) => {
  try {
    // Find itinerary
    const itinerary = await Itinerary.findById(itineraryId);
    
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    
    // Check if user is authorized
    if (itinerary.userId.toString() !== userId.toString() && 
        !itinerary.collaborators.some(id => id.toString() === userId.toString())) {
      throw new Error('Not authorized to update this itinerary');
    }
    
    // Remove activity
    itinerary.activities = itinerary.activities.filter(
      activity => activity._id.toString() !== activityId
    );
    
    await itinerary.save();
    
    return itinerary;
  } catch (error) {
    logger.error(`Error removing activity: ${error.message}`);
    throw error;
  }
};

// Add a collaborator to an itinerary
exports.addCollaborator = async (itineraryId, collaboratorId, userId) => {
  try {
    // Find itinerary
    const itinerary = await Itinerary.findById(itineraryId);
    
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    
    // Check if user is authorized
    if (itinerary.userId.toString() !== userId.toString()) {
      throw new Error('Only the owner can add collaborators');
    }
    
    // Check if collaborator is already added
    if (itinerary.collaborators.some(id => id.toString() === collaboratorId.toString())) {
      throw new Error('Collaborator already added');
    }
    
    // Add collaborator
    itinerary.collaborators.push(collaboratorId);
    await itinerary.save();
    
    return itinerary;
  } catch (error) {
    logger.error(`Error adding collaborator: ${error.message}`);
    throw error;
  }
};

// Remove a collaborator from an itinerary
exports.removeCollaborator = async (itineraryId, collaboratorId, userId) => {
  try {
    // Find itinerary
    const itinerary = await Itinerary.findById(itineraryId);
    
    if (!itinerary) {
      throw new Error('Itinerary not found');
    }
    
    // Check if user is authorized
    if (itinerary.userId.toString() !== userId.toString()) {
      throw new Error('Only the owner can remove collaborators');
    }
    
    // Remove collaborator
    itinerary.collaborators = itinerary.collaborators.filter(
      id => id.toString() !== collaboratorId.toString()
    );
    
    await itinerary.save();
    
    return itinerary;
  } catch (error) {
    logger.error(`Error removing collaborator: ${error.message}`);
    throw error;
  }
};