import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItineraries,
  fetchItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  generateItinerary
} from '../redux/actions/itineraryActions';

export const useItinerary = () => {
  const dispatch = useDispatch();
  const { itineraries, currentItinerary, loading, error } = useSelector(state => state.itinerary);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Get all itineraries
  const getItineraries = useCallback(async () => {
    setLocalError(null);
    setLocalLoading(true);
    try {
      await dispatch(fetchItineraries());
      setLocalLoading(false);
      return true;
    } catch (err) {
      setLocalError(err.message || 'Failed to fetch itineraries');
      setLocalLoading(false);
      return false;
    }
  }, [dispatch]);

  // Get single itinerary
  const getItinerary = useCallback(async (id) => {
    setLocalError(null);
    setLocalLoading(true);
    try {
      await dispatch(fetchItinerary(id));
      setLocalLoading(false);
      return true;
    } catch (err) {
      setLocalError(err.message || 'Failed to fetch itinerary');
      setLocalLoading(false);
      return false;
    }
  }, [dispatch]);

  // Create new itinerary
  const createNewItinerary = useCallback(async (data) => {
    setLocalError(null);
    setLocalLoading(true);
    try {
      const result = await dispatch(createItinerary(data));
      setLocalLoading(false);
      return result;
    } catch (err) {
      setLocalError(err.message || 'Failed to create itinerary');
      setLocalLoading(false);
      return false;
    }
  }, [dispatch]);

  // Update existing itinerary
  const updateExistingItinerary = useCallback(async (id, data) => {
    setLocalError(null);
    setLocalLoading(true);
    try {
      const result = await dispatch(updateItinerary(id, data));
      setLocalLoading(false);
      return result;
    } catch (err) {
      setLocalError(err.message || 'Failed to update itinerary');
      setLocalLoading(false);
      return false;
    }
  }, [dispatch]);

  // Delete itinerary
  const deleteExistingItinerary = useCallback(async (id) => {
    setLocalError(null);
    setLocalLoading(true);
    try {
      await dispatch(deleteItinerary(id));
      setLocalLoading(false);
      return true;
    } catch (err) {
      setLocalError(err.message || 'Failed to delete itinerary');
      setLocalLoading(false);
      return false;
    }
  }, [dispatch]);

  // Generate AI itinerary
  const generateNewItinerary = useCallback(async (preferences) => {
    setLocalError(null);
    setLocalLoading(true);
    try {
      const result = await dispatch(generateItinerary(preferences));
      setLocalLoading(false);
      return result;
    } catch (err) {
      setLocalError(err.message || 'Failed to generate itinerary');
      setLocalLoading(false);
      return false;
    }
  }, [dispatch]);

  return {
    itineraries,
    currentItinerary,
    loading: loading || localLoading,
    error: error || localError,
    getItineraries,
    getItinerary,
    createItinerary: createNewItinerary,
    updateItinerary: updateExistingItinerary,
    deleteItinerary: deleteExistingItinerary,
    generateItinerary: generateNewItinerary
  };
};

export default useItinerary;