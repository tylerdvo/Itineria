import axios from 'axios';

// Create API instance with base URL from environment variable
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // For demo purposes, we're not using actual authentication tokens
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

// For demo purposes, these functions will simulate API calls using localStorage
const mockAPI = {
  // Auth related
  login: async (email, password) => {
    // For demo, accept any credentials
    if (email && password) {
      const userData = {
        id: '1',
        name: email.split('@')[0],
        email
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } else {
      throw new Error('Email and password are required');
    }
  },
  
  register: async (name, email, password) => {
    // For demo, accept any registration
    if (name && email && password) {
      const userData = {
        id: '1',
        name,
        email
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, data: userData };
    } else {
      throw new Error('Name, email, and password are required');
    }
  },
  
  logout: async () => {
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    return { success: true };
  },
  
  // User related
  getUser: async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { success: true, data: user };
  },
  
  updateUser: async (id, data) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const updatedUser = { ...user, ...data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true, data: updatedUser };
  },
  
  // Itinerary related
  getItineraries: async () => {
    const mockItineraries = [
      {
        id: 1,
        title: "Weekend in Paris",
        destination: "Paris, France",
        duration: 3,
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
        activities: [
          { id: 1, name: "Meiji Shrine", day: 1, time: "9:00 AM", duration: 2, type: "Cultural" },
          { id: 2, name: "Tokyo Skytree", day: 1, time: "2:00 PM", duration: 2, type: "Sightseeing" },
          { id: 3, name: "Tsukiji Fish Market", day: 2, time: "7:00 AM", duration: 3, type: "Food" }
        ],
        budget: 2500,
        preferences: ["culture", "food", "shopping"]
      }
    ];
    
    return { success: true, data: mockItineraries };
  },
  
  getItinerary: async (id) => {
    const mockItineraries = [
      {
        id: 1,
        title: "Weekend in Paris",
        destination: "Paris, France",
        duration: 3,
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
        activities: [
          { id: 1, name: "Meiji Shrine", day: 1, time: "9:00 AM", duration: 2, type: "Cultural" },
          { id: 2, name: "Tokyo Skytree", day: 1, time: "2:00 PM", duration: 2, type: "Sightseeing" },
          { id: 3, name: "Tsukiji Fish Market", day: 2, time: "7:00 AM", duration: 3, type: "Food" }
        ],
        budget: 2500,
        preferences: ["culture", "food", "shopping"]
      }
    ];
    
    const itinerary = mockItineraries.find(i => i.id === parseInt(id));
    return { success: true, data: itinerary };
  },
  
  createItinerary: async (data) => {
    const newItinerary = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...data
    };
    
    return { success: true, data: newItinerary };
  },
  
  updateItinerary: async (id, data) => {
    return { success: true, data: { id, ...data } };
  },
  
  deleteItinerary: async (id) => {
    return { success: true, data: { id } };
  },
  
  // Preference related
  getPreferences: async () => {
    const preferences = [
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
    
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userPreferences = user.preferences || [];
    
    return { 
      success: true, 
      data: {
        preferences,
        userPreferences
      }
    };
  },
  
  updatePreferences: async (data) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    user.preferences = data.preferences;
    localStorage.setItem('user', JSON.stringify(user));
    
    return { success: true, data: data.preferences };
  }
};

// For the demo, we'll use the mock API instead of real API calls
export default mockAPI;