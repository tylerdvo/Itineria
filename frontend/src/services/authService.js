import api from './api';

// Register a new user
const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Firebase authentication
const firebaseAuth = async (firebaseUser) => {
  try {
    const response = await api.post('/auth/firebase', { firebaseUser });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile
const updateProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user preferences
const getUserPreferences = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/preferences`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user preferences
const updatePreferences = async (userId, preferencesData) => {
  try {
    const response = await api.put(`/users/${userId}/preferences`, preferencesData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authService = {
  register,
  login,
  firebaseAuth,
  getCurrentUser,
  updateProfile,
  getUserPreferences,
  updatePreferences,
};

export default authService;