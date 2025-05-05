import {
  FETCH_PREFERENCES_REQUEST, FETCH_PREFERENCES_SUCCESS, FETCH_PREFERENCES_FAILURE,
  UPDATE_PREFERENCES_REQUEST, UPDATE_PREFERENCES_SUCCESS, UPDATE_PREFERENCES_FAILURE
} from '../types';

const initialState = {
  preferences: [],
  userPreferences: [],
  loading: false,
  error: null
};

const preferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREFERENCES_REQUEST:
    case UPDATE_PREFERENCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_PREFERENCES_SUCCESS:
      return {
        ...state,
        preferences: action.payload.preferences || [],
        userPreferences: action.payload.userPreferences || [],
        loading: false,
        error: null
      };
    
    case UPDATE_PREFERENCES_SUCCESS:
      return {
        ...state,
        userPreferences: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_PREFERENCES_FAILURE:
    case UPDATE_PREFERENCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default preferenceReducer;