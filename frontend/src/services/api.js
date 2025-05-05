// frontend/src/services/api.js
// Simplified API service without Firebase dependency

import axios from 'axios';

// Create API instance with base URL from environment variable
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // For demo purposes, we'll not use actual auth tokens
    // In a real app, you'd add auth token to headers here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // Return just the data part of the response
    return response.data;
  },
  error => {
    // Handle error responses
    const { response } = error;
    
    if (response && response.data) {
      return Promise.reject(response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;