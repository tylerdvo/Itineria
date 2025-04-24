import {
    FETCH_PREFERENCES_REQUEST, FETCH_PREFERENCES_SUCCESS, FETCH_PREFERENCES_FAILURE,
    UPDATE_PREFERENCES_REQUEST, UPDATE_PREFERENCES_SUCCESS, UPDATE_PREFERENCES_FAILURE
  } from '../types';
  import api from '../../services/api';
  
  export const fetchPreferences = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_PREFERENCES_REQUEST });
    
    try {
      const response = await api.get(`/preferences/${userId}`);
      
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
  
  export const updatePreferences = (userId, preferences) => async (dispatch) => {
    dispatch({ type: UPDATE_PREFERENCES_REQUEST });
    
    try {
      const response = await api.put(`/preferences/${userId}`, preferences);
      
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