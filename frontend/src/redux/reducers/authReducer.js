import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGOUT
  } from '../types';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          loading: false,
          error: null
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case LOGOUT:
        return {
          ...initialState
        };
      default:
        return state;
    }
  };
  
  export default authReducer;