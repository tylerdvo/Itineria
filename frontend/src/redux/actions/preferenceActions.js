import {
  FETCH_PREFERENCES_REQUEST, FETCH_PREFERENCES_SUCCESS, FETCH_PREFERENCES_FAILURE,
  UPDATE_PREFERENCES_REQUEST, UPDATE_PREFERENCES_SUCCESS, UPDATE_PREFERENCES_FAILURE
} from '../types';

// Mock API for development
const api = {
  get: (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock preference data
        const mockPreferences = [
          { id: "beaches", name: "Beaches", category: "Nature" },
          { id: "museums", name: "Museums", category: "Culture" },
          { id: "food", name: "Food Experiences", category: "Culinary" },
          { id: "hiking", name: "Hiking", category: "Adventure" },
          { id: "culture", name: "Cultural Experiences", category: "Culture" },
          { id: "shopping", name: "Shopping", category: "Urban" },
          { id: "sightseeing", name: "Sightseeing", category: "Tourism" },
          { id: "nature", name: "Nature & Outdoors", category: "Nature" },
          { id: "nightlife", name: "Nightlife", category: "Entertainment" },
          { id: "wellness", name: "Wellness & Spa", category: "Health" }
        ];
        
        // Get user preferences from localStorage
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const userPreferences = user.preferences || [];
        
        resolve({ 
          data: {
            preferences: mockPreferences,
            userPreferences
          }
        });
      }, 500);
    });
  },
  put: (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update user preferences in localStorage
        const user = JSON.parse(localStorage.getItem('user')) || {};
        user.preferences = data.preferences;
        localStorage.setItem('user', JSON.stringify(user));
        
        resolve({ data: data.preferences });
      }, 500);
    });
  }
};

// Fetch all available preferences and user preferences
export const fetchPreferences = () => async (dispatch) => {
  dispatch({ type: FETCH_PREFERENCES_REQUEST });
  
  try {
    const response = await api.get('/preferences');
    
    dispatch({
      type: FETCH_PREFERENCES_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: FETCH_PREFERENCES_FAILURE,
      payload: error.message
    });
    throw error;
  }
};

// Update user preferences
export const updatePreferences = (preferences) => async (dispatch) => {
  dispatch({ type: UPDATE_PREFERENCES_REQUEST });
  
  try {
    const response = await api.put('/user/preferences', { preferences });
    
    dispatch({
      type: UPDATE_PREFERENCES_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_PREFERENCES_FAILURE,
      payload: error.message
    });
    throw error;
  }
};