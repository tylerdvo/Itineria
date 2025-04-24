import {
    FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE
  } from '../types';
  import api from '../../services/api';
  
  export const fetchUser = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    
    try {
      const response = await api.get(`/users/${userId}`);
      
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data
      });
      
      return response.data;
    } catch (error) {
      dispatch({
        type: FETCH_USER_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
  
  export const updateUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    
    try {
      const response = await api.put(`/users/${userId}`, userData);
      
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