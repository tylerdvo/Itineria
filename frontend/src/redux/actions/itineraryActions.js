import {
  FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_FAILURE,
  FETCH_ITINERARY_REQUEST, FETCH_ITINERARY_SUCCESS, FETCH_ITINERARY_FAILURE,
  CREATE_ITINERARY_REQUEST, CREATE_ITINERARY_SUCCESS, CREATE_ITINERARY_FAILURE,
  UPDATE_ITINERARY_REQUEST, UPDATE_ITINERARY_SUCCESS, UPDATE_ITINERARY_FAILURE,
  DELETE_ITINERARY_REQUEST, DELETE_ITINERARY_SUCCESS, DELETE_ITINERARY_FAILURE,
  GENERATE_ITINERARY_REQUEST, GENERATE_ITINERARY_SUCCESS, GENERATE_ITINERARY_FAILURE,
  FAVORITE_ITINERARY_SUCCESS, FAVORITE_ITINERARY_FAILURE
} from '../types';

// Mock API for development
const api = {
  get: (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get mock data based on URL
        if (url.includes('/itineraries/')) {
          // Get single itinerary
          const id = url.split('/').pop();
          const mockItineraries = [
            {
              id: 1,
              title: "Weekend in Paris",
              destination: "Paris, France",
              duration: 3,
              createdAt: "2024-04-28T15:32:10Z",
              activities: [
                { id: 1, name: "Eiffel Tower", day: 1, time: "10:00 AM", duration: 2, type: "Sightseeing" },
                { id: 2, name: "Louvre Museum", day: 1, time: "2:00 PM", duration: 3, type: "Museum" },
                { id: 3, name: "Notre Dame Cathedral", day: 2, time: "9:00 AM", duration: 2, type: "Sightseeing" }
              ],
              budget: 1200,
              preferences: ["museums", "sightseeing", "local cuisine"]
            },
            {
              id: 2,
              title: "Tokyo Adventure",
              destination: "Tokyo, Japan",
              duration: 5,
              createdAt: "2024-05-01T09:15:22Z",
              activities: [
                { id: 1, name: "Meiji Shrine", day: 1, time: "9:00 AM", duration: 2, type: "Cultural" },
                { id: 2, name: "Tokyo Skytree", day: 1, time: "2:00 PM", duration: 2, type: "Sightseeing" },
                { id: 3, name: "Tsukiji Fish Market", day: 2, time: "7:00 AM", duration: 3, type: "Food" }
              ],
              budget: 2500,
              preferences: ["culture", "food", "shopping"]
            }
          ];
          const itinerary = mockItineraries.find(i => i.id === parseInt(id)) || mockItineraries[0];
          resolve({ data: itinerary });
        } else {
          // Get all itineraries
          const mockItineraries = [
            {
              id: 1,
              title: "Weekend in Paris",
              destination: "Paris, France",
              duration: 3,
              createdAt: "2024-04-28T15:32:10Z",
              activities: [
                { id: 1, name: "Eiffel Tower", day: 1, time: "10:00 AM", duration: 2, type: "Sightseeing" },
                { id: 2, name: "Louvre Museum", day: 1, time: "2:00 PM", duration: 3, type: "Museum" },
                { id: 3, name: "Notre Dame Cathedral", day: 2, time: "9:00 AM", duration: 2, type: "Sightseeing" }
              ],
              budget: 1200,
              preferences: ["museums", "sightseeing", "local cuisine"]
            },
            {
              id: 2,
              title: "Tokyo Adventure",
              destination: "Tokyo, Japan",
              duration: 5,
              createdAt: "2024-05-01T09:15:22Z",
              activities: [
                { id: 1, name: "Meiji Shrine", day: 1, time: "9:00 AM", duration: 2, type: "Cultural" },
                { id: 2, name: "Tokyo Skytree", day: 1, time: "2:00 PM", duration: 2, type: "Sightseeing" },
                { id: 3, name: "Tsukiji Fish Market", day: 2, time: "7:00 AM", duration: 3, type: "Food" }
              ],
              budget: 2500,
              preferences: ["culture", "food", "shopping"]
            }
          ];
          resolve({ data: mockItineraries });
        }
      }, 500);
    });
  },
  post: (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create new itinerary
        const newItinerary = {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          ...data
        };
        resolve({ data: newItinerary });
      }, 500);
    });
  },
  put: (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update itinerary
        resolve({ data });
      }, 500);
    });
  },
  delete: (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Delete itinerary
        const id = url.split('/').pop();
        resolve({ data: { id: parseInt(id) } });
      }, 500);
    });
  }
};

// Fetch all itineraries
export const fetchItineraries = () => async (dispatch) => {
  dispatch({ type: FETCH_ITINERARIES_REQUEST });
  
  try {
    const response = await api.get('/itineraries');
    
    dispatch({
      type: FETCH_ITINERARIES_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: FETCH_ITINERARIES_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Fetch a single itinerary
export const fetchItinerary = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ITINERARY_REQUEST });
  
  try {
    const response = await api.get(`/itineraries/${id}`);
    
    dispatch({
      type: FETCH_ITINERARY_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: FETCH_ITINERARY_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Create a new itinerary
export const createItinerary = (itineraryData) => async (dispatch) => {
  dispatch({ type: CREATE_ITINERARY_REQUEST });
  
  try {
    const response = await api.post('/itineraries', itineraryData);
    
    dispatch({
      type: CREATE_ITINERARY_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_ITINERARY_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Update an existing itinerary
export const updateItinerary = (id, itineraryData) => async (dispatch) => {
  dispatch({ type: UPDATE_ITINERARY_REQUEST });
  
  try {
    const response = await api.put(`/itineraries/${id}`, itineraryData);
    
    dispatch({
      type: UPDATE_ITINERARY_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_ITINERARY_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Delete an itinerary
export const deleteItinerary = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ITINERARY_REQUEST });
  
  try {
    await api.delete(`/itineraries/${id}`);
    
    dispatch({
      type: DELETE_ITINERARY_SUCCESS,
      payload: id
    });
    
    return id;
  } catch (error) {
    dispatch({
      type: DELETE_ITINERARY_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Generate an AI-based itinerary
export const generateItinerary = (preferences) => async (dispatch) => {
  dispatch({ type: GENERATE_ITINERARY_REQUEST });
  
  try {
    // This would normally call an AI service
    const response = await api.post('/generate-itinerary', preferences);
    
    dispatch({
      type: GENERATE_ITINERARY_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: GENERATE_ITINERARY_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Toggle favorite status of an itinerary
export const toggleFavoriteItinerary = (id, isFavorite) => async (dispatch) => {
  try {
    const response = await api.put(`/itineraries/${id}/favorite`, { isFavorite });
    
    dispatch({
      type: FAVORITE_ITINERARY_SUCCESS,
      payload: { id, isFavorite }
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: FAVORITE_ITINERARY_FAILURE,
      payload: error.message
    });
    throw error;
  }
};