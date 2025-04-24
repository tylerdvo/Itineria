import {
    FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_FAILURE,
    FETCH_ITINERARY_REQUEST, FETCH_ITINERARY_SUCCESS, FETCH_ITINERARY_FAILURE,
    CREATE_ITINERARY_REQUEST, CREATE_ITINERARY_SUCCESS, CREATE_ITINERARY_FAILURE,
    UPDATE_ITINERARY_REQUEST, UPDATE_ITINERARY_SUCCESS, UPDATE_ITINERARY_FAILURE,
    DELETE_ITINERARY_REQUEST, DELETE_ITINERARY_SUCCESS, DELETE_ITINERARY_FAILURE,
    GENERATE_ITINERARY_REQUEST, GENERATE_ITINERARY_SUCCESS, GENERATE_ITINERARY_FAILURE,
    FAVORITE_ITINERARY_REQUEST, FAVORITE_ITINERARY_SUCCESS, FAVORITE_ITINERARY_FAILURE
  } from '../types';
  import api from '../../services/api';
  
  export const fetchItineraries = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_ITINERARIES_REQUEST });
    
    try {
      const response = await api.get(`/itineraries?userId=${userId}`);
      
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
  
  export const fetchItinerary = (itineraryId) => async (dispatch) => {
    dispatch({ type: FETCH_ITINERARY_REQUEST });
    
    try {
      const response = await api.get(`/itineraries/${itineraryId}`);
      
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
  
  export const updateItinerary = (itineraryId, itineraryData) => async (dispatch) => {
    dispatch({ type: UPDATE_ITINERARY_REQUEST });
    
    try {
      const response = await api.put(`/itineraries/${itineraryId}`, itineraryData);
      
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
  
  export const deleteItinerary = (itineraryId) => async (dispatch) => {
    dispatch({ type: DELETE_ITINERARY_REQUEST });
    
    try {
      await api.delete(`/itineraries/${itineraryId}`);
      
      dispatch({
        type: DELETE_ITINERARY_SUCCESS,
        payload: itineraryId
      });
      
      return true;
    } catch (error) {
      dispatch({
        type: DELETE_ITINERARY_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
  
  export const generateItinerary = (data) => async (dispatch) => {
    dispatch({ type: GENERATE_ITINERARY_REQUEST });
    
    try {
      // Call ML service API
      const response = await api.post('/ml/generate-itinerary', data);
      
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
  
  export const favoriteItinerary = (itineraryId, userId) => async (dispatch) => {
    dispatch({ type: FAVORITE_ITINERARY_REQUEST });
    
    try {
      const response = await api.post(`/itineraries/${itineraryId}/favorite`, { userId });
      
      dispatch({
        type: FAVORITE_ITINERARY_SUCCESS,
        payload: response.data
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