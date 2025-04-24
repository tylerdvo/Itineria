import api from './api';

// Get all itineraries
const getItineraries = async () => {
  try {
    const response = await api.get('/itineraries');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single itinerary
const getItinerary = async (id) => {
  try {
    const response = await api.get(`/itineraries/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new itinerary
const createItinerary = async (itineraryData) => {
  try {
    const response = await api.post('/itineraries', itineraryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update itinerary
const updateItinerary = async (id, updateData) => {
  try {
    const response = await api.put(`/itineraries/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete itinerary
const deleteItinerary = async (id) => {
  try {
    const response = await api.delete(`/itineraries/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add activity to itinerary
const addActivity = async (itineraryId, activityData) => {
  try {
    const response = await api.post(`/itineraries/${itineraryId}/activities`, activityData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update activity in itinerary
const updateActivity = async (itineraryId, activityId, activityData) => {
  try {
    const response = await api.put(
      `/itineraries/${itineraryId}/activities/${activityId}`,
      activityData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove activity from itinerary
const removeActivity = async (itineraryId, activityId) => {
  try {
    const response = await api.delete(`/itineraries/${itineraryId}/activities/${activityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add collaborator to itinerary
const addCollaborator = async (itineraryId, collaboratorId) => {
  try {
    const response = await api.post(`/itineraries/${itineraryId}/collaborators`, {
      collaboratorId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove collaborator from itinerary
const removeCollaborator = async (itineraryId, collaboratorId) => {
  try {
    const response = await api.delete(
      `/itineraries/${itineraryId}/collaborators/${collaboratorId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generate itinerary recommendations
const generateRecommendations = async (recommendationData) => {
  try {
    const response = await api.post('/itineraries/generate', recommendationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const itineraryService = {
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
  generateRecommendations,
};

export default itineraryService;