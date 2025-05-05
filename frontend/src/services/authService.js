// frontend/src/services/authService.js
// Simplified auth service without Firebase dependency

// Mock API for authentication functions
const mockApi = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful API calls
        if (url === '/auth/register') {
          // Register user
          const userData = {
            id: '1',
            name: data.name || 'Demo User',
            email: data.email || 'demo@example.com',
            ...data
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('isAuthenticated', 'true');
          
          resolve({ data: userData });
        } else if (url === '/auth/login') {
          // Login user
          const userData = {
            id: '1',
            name: data.email.split('@')[0],
            email: data.email,
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('isAuthenticated', 'true');
          
          resolve({ data: userData });
        } else {
          // Unknown endpoint
          reject(new Error('Invalid endpoint'));
        }
      }, 500);
    });
  },
  
  get: (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === '/auth/me') {
          // Get current user
          const userData = JSON.parse(localStorage.getItem('user')) || null;
          
          if (userData) {
            resolve({ data: userData });
          } else {
            reject(new Error('Not authenticated'));
          }
        } else {
          // User preferences
          const preferences = ['museums', 'food', 'culture', 'sightseeing'];
          resolve({ data: preferences });
        }
      }, 500);
    });
  },
  
  put: (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update user or preferences
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        const updatedUser = { ...userData, ...data };
        
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        resolve({ data: updatedUser });
      }, 500);
    });
  }
};

// Register a new user
const register = async (userData) => {
  try {
    const response = await mockApi.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await mockApi.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const response = await mockApi.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile
const updateProfile = async (userId, profileData) => {
  try {
    const response = await mockApi.put(`/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user preferences
const getUserPreferences = async (userId) => {
  try {
    const response = await mockApi.get(`/users/${userId}/preferences`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user preferences
const updatePreferences = async (userId, preferencesData) => {
  try {
    const response = await mockApi.put(`/users/${userId}/preferences`, preferencesData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authService = {
  register,
  login,
  getCurrentUser,
  updateProfile,
  getUserPreferences,
  updatePreferences,
};

export default authService;