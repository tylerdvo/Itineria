import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../types';

// Sample API for development
const api = {
  put: (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update user in localStorage
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const updatedUser = { ...user, ...data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        resolve({ data: updatedUser });
      }, 300);
    });
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  
  try {
    // Get current user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update user in backend
    const response = await api.put(`/users/${user.id}`, userData);
    
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.message
    });
    throw error;
  }
};