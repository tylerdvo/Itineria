import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGOUT,
  FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE
} from '../types';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: userFromStorage,
  loading: false,
  error: null
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    
    default:
      return state;
  }
};

export default authReducer;