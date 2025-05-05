import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1/itineraries';

const itineraryService = {
  createActivity: async (userId, activityData) => {
    try {
      const response = await axios.post(`${API_URL}/${userId}/activities`, activityData);
      return response.data;
    } catch (error) {
      console.error('Failed to create activity:', error);
      throw error;
    }
  },

  getActivities: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      // For 404 errors (no itinerary found), return empty array instead of throwing
      if (error.response && error.response.status === 404) {
        console.log('No itineraries found for this user. Returning empty array.');
        return [];
      }
      console.error('Failed to fetch activities:', error);
      throw error;
    }
  },

  updateActivity: async (itineraryId, activityId, activityData) => {
    try {
      // Make PUT request to update the activity
      const response = await axios.put(`${API_URL}/${itineraryId}/activities/${activityId}`, activityData);
      return response.data;
    } catch (error) {
      console.error('Failed to update activity:', error);
      throw error;
    }
  },

  deleteActivity: async (itineraryId, activityId) => {
    try {
      // Make DELETE request to remove the activity
      const response = await axios.delete(`${API_URL}/${itineraryId}/activities/${activityId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete activity:', error);
      throw error;
    }
  }
};

export default itineraryService;