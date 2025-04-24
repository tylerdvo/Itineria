import {
    FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE
  } from '../types';
  
  const initialState = {
    userData: null,
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_REQUEST:
      case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_USER_SUCCESS:
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          loading: false,
          error: null
        };
      case FETCH_USER_FAILURE:
      case UPDATE_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;