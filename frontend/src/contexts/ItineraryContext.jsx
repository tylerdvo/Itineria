// frontend/src/contexts/ItineraryContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import itineraryService from '../services/itineraryService';

// Create context
export const ItineraryContext = createContext();

export const ItineraryProvider = ({ children }) => {
  const [itineraries, setItineraries] = useState([]);
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  // Fetch user's itineraries
  const fetchItineraries = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const fetchedItineraries = await itineraryService.getItineraries();
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
      const itinerary = await itineraryService.getItinerary(id);
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
        const newItinerary = await itineraryService.createItinerary(itineraryData);
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
      const updatedItinerary = await itineraryService.updateItinerary(id, updateData);
      
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
      await itineraryService.deleteItinerary(id);
      
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
      const updatedItinerary = await itineraryService.addActivity(itineraryId, activityData);
      
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
      const updatedItinerary = await itineraryService.updateActivity(
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
      const updatedItinerary = await itineraryService.removeActivity(itineraryId, activityId);
      
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
      const recommendations = await itineraryService.generateRecommendations(recommendationData);
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