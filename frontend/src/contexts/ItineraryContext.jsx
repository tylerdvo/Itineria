import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Create context
export const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itineraries, setItineraries] = useState([]);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = useSelector(state => state.auth || {});
  const { user } = auth;

  // Mock itinerary service
  const mockItineraryService = {
    getItineraries: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockItineraries = [
            {
              _id: 1,
              title: "Weekend in Paris",
              destination: "Paris, France",
              duration: 3,
              createdAt: new Date().toISOString(),
              activities: [
                { _id: 1, name: "Eiffel Tower", day: 1, time: "10:00 AM", duration: 2, type: "Sightseeing" },
                { _id: 2, name: "Louvre Museum", day: 1, time: "2:00 PM", duration: 3, type: "Museum" },
                { _id: 3, name: "Notre Dame Cathedral", day: 2, time: "9:00 AM", duration: 2, type: "Sightseeing" }
              ],
              budget: 1200,
              preferences: ["museums", "sightseeing", "local cuisine"]
            },
            {
              _id: 2,
              title: "Tokyo Adventure",
              destination: "Tokyo, Japan",
              duration: 5,
              createdAt: new Date().toISOString(),
              activities: [
                { _id: 1, name: "Meiji Shrine", day: 1, time: "9:00 AM", duration: 2, type: "Cultural" },
                { _id: 2, name: "Tokyo Skytree", day: 1, time: "2:00 PM", duration: 2, type: "Sightseeing" },
                { _id: 3, name: "Tsukiji Fish Market", day: 2, time: "7:00 AM", duration: 3, type: "Food" }
              ],
              budget: 2500,
              preferences: ["culture", "food", "shopping"]
            }
          ];
          resolve(mockItineraries);
        }, 500);
      });
    },
    
    getItinerary: (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockItineraries = [
            {
              _id: 1,
              title: "Weekend in Paris",
              destination: "Paris, France",
              duration: 3,
              createdAt: new Date().toISOString(),
              activities: [
                { _id: 1, name: "Eiffel Tower", day: 1, time: "10:00 AM", duration: 2, type: "Sightseeing" },
                { _id: 2, name: "Louvre Museum", day: 1, time: "2:00 PM", duration: 3, type: "Museum" },
                { _id: 3, name: "Notre Dame Cathedral", day: 2, time: "9:00 AM", duration: 2, type: "Sightseeing" }
              ],
              budget: 1200,
              preferences: ["museums", "sightseeing", "local cuisine"]
            },
            {
              _id: 2,
              title: "Tokyo Adventure",
              destination: "Tokyo, Japan",
              duration: 5,
              createdAt: new Date().toISOString(),
              activities: [
                { _id: 1, name: "Meiji Shrine", day: 1, time: "9:00 AM", duration: 2, type: "Cultural" },
                { _id: 2, name: "Tokyo Skytree", day: 1, time: "2:00 PM", duration: 2, type: "Sightseeing" },
                { _id: 3, name: "Tsukiji Fish Market", day: 2, time: "7:00 AM", duration: 3, type: "Food" }
              ],
              budget: 2500,
              preferences: ["culture", "food", "shopping"]
            }
          ];
          
          const itinerary = mockItineraries.find(i => i._id === parseInt(id));
          resolve(itinerary);
        }, 500);
      });
    },
    
    createItinerary: (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newItinerary = {
            _id: Date.now(),
            createdAt: new Date().toISOString(),
            ...data,
            activities: data.activities || []
          };
          resolve(newItinerary);
        }, 500);
      });
    },
    
    updateItinerary: (id, data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedItinerary = {
            _id: parseInt(id),
            ...data
          };
          resolve(updatedItinerary);
        }, 500);
      });
    },
    
    deleteItinerary: (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 500);
      });
    },
    
    addActivity: (itineraryId, activity) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newActivity = {
            _id: Date.now(),
            ...activity
          };
          
          // Find current itinerary
          const updatedItinerary = {
            _id: parseInt(itineraryId),
            activities: [...(currentItinerary?.activities || []), newActivity]
          };
          
          resolve(updatedItinerary);
        }, 500);
      });
    },
    
    updateActivity: (itineraryId, activityId, activityData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Update activity in current itinerary
          const updatedActivities = currentItinerary.activities.map(activity => 
            activity._id === parseInt(activityId) 
              ? { ...activity, ...activityData } 
              : activity
          );
          
          const updatedItinerary = {
            ...currentItinerary,
            activities: updatedActivities
          };
          
          resolve(updatedItinerary);
        }, 500);
      });
    },
    
    removeActivity: (itineraryId, activityId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Remove activity from current itinerary
          const updatedActivities = currentItinerary.activities.filter(
            activity => activity._id !== parseInt(activityId)
          );
          
          const updatedItinerary = {
            ...currentItinerary,
            activities: updatedActivities
          };
          
          resolve(updatedItinerary);
        }, 500);
      });
    },
    
    generateRecommendations: (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Generate mock recommendations
          const recommendations = {
            activities: [
              { name: "Visit the Louvre", type: "Museum", duration: 3 },
              { name: "Eiffel Tower", type: "Sightseeing", duration: 2 },
              { name: "Notre Dame Cathedral", type: "Sightseeing", duration: 1.5 },
              { name: "Seine River Cruise", type: "Entertainment", duration: 1 },
              { name: "Montmartre Walking Tour", type: "Cultural", duration: 2 }
            ],
            restaurants: [
              { name: "Le Jules Verne", cuisine: "French", priceLevel: "High" },
              { name: "Café de Flore", cuisine: "French", priceLevel: "Medium" },
              { name: "L'As du Fallafel", cuisine: "Middle Eastern", priceLevel: "Low" }
            ]
          };
          
          resolve(recommendations);
        }, 1000);
      });
    }
  };

  // Fetch user's itineraries
  const fetchItineraries = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const fetchedItineraries = await mockItineraryService.getItineraries();
      setItineraries(fetchedItineraries);
    } catch (err) {
      setError(err.message || 'Failed to fetch itineraries');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single itinerary by ID
  const fetchItinerary = async (id) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const itinerary = await mockItineraryService.getItinerary(id);
      setCurrentItinerary(itinerary);
      return itinerary;
    } catch (err) {
      setError(err.message || 'Failed to fetch itinerary');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new itinerary
  const createItinerary = async (itineraryData) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const newItinerary = await mockItineraryService.createItinerary(itineraryData);
      setItineraries([...itineraries, newItinerary]);
      setCurrentItinerary(newItinerary);
      return newItinerary;
    } catch (err) {
      setError(err.message || 'Failed to create itinerary');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing itinerary
  const updateItinerary = async (id, updateData) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const updatedItinerary = await mockItineraryService.updateItinerary(id, updateData);
      
      // Update itineraries list
      setItineraries(
        itineraries.map((itinerary) => 
          itinerary._id === id ? updatedItinerary : itinerary
        )
      );
      
      // Update current itinerary if it's the one being edited
      if (currentItinerary && currentItinerary._id === id) {
        setCurrentItinerary(updatedItinerary);
      }
      
      return updatedItinerary;
    } catch (err) {
      setError(err.message || 'Failed to update itinerary');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete an itinerary
  const deleteItinerary = async (id) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await mockItineraryService.deleteItinerary(id);
      
      // Remove from itineraries list
      setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
      
      // Clear current itinerary if it's the one being deleted
      if (currentItinerary && currentItinerary._id === id) {
        setCurrentItinerary(null);
      }
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete itinerary');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add activity to itinerary
  const addActivity = async (itineraryId, activityData) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const updatedItinerary = await mockItineraryService.addActivity(itineraryId, activityData);
      
      // Update itineraries list
      setItineraries(
        itineraries.map((itinerary) => 
          itinerary._id === itineraryId ? updatedItinerary : itinerary
        )
      );
      
      // Update current itinerary if it's the one being edited
      if (currentItinerary && currentItinerary._id === itineraryId) {
        setCurrentItinerary(updatedItinerary);
      }
      
      return updatedItinerary;
    } catch (err) {
      setError(err.message || 'Failed to add activity');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update activity in itinerary
  const updateActivity = async (itineraryId, activityId, activityData) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const updatedItinerary = await mockItineraryService.updateActivity(
        itineraryId,
        activityId,
        activityData
      );
      
      // Update itineraries list
      setItineraries(
        itineraries.map((itinerary) => 
          itinerary._id === itineraryId ? updatedItinerary : itinerary
        )
      );
      
      // Update current itinerary if it's the one being edited
      if (currentItinerary && currentItinerary._id === itineraryId) {
        setCurrentItinerary(updatedItinerary);
      }
      
      return updatedItinerary;
    } catch (err) {
      setError(err.message || 'Failed to update activity');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Remove activity from itinerary
  const removeActivity = async (itineraryId, activityId) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const updatedItinerary = await mockItineraryService.removeActivity(itineraryId, activityId);
      
      // Update itineraries list
      setItineraries(
        itineraries.map((itinerary) => 
          itinerary._id === itineraryId ? updatedItinerary : itinerary
        )
      );
      
      // Update current itinerary if it's the one being edited
      if (currentItinerary && currentItinerary._id === itineraryId) {
        setCurrentItinerary(updatedItinerary);
      }
      
      return updatedItinerary;
    } catch (err) {
      setError(err.message || 'Failed to remove activity');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Generate itinerary recommendations
  const generateRecommendations = async (recommendationData) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const recommendations = await mockItineraryService.generateRecommendations(recommendationData);
      return recommendations;
    } catch (err) {
      setError(err.message || 'Failed to generate recommendations');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear current itinerary
  const clearCurrentItinerary = () => {
    setCurrentItinerary(null);
  };

  // Reset context state
  const resetState = () => {
    setItineraries([]);
    setCurrentItinerary(null);
    setError(null);
  };

  // Load user's itineraries when authenticated
  useEffect(() => {
    if (user) {
      fetchItineraries();
    } else {
      resetState();
    }
  }, [user]);

  // Context value
  const value = {
    itineraries,
    currentItinerary,
    loading,
    error,
    fetchItineraries,
    fetchItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    addActivity,
    updateActivity,
    removeActivity,
    generateRecommendations,
    clearCurrentItinerary,
    setCurrentItinerary,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};