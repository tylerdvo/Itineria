import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import itineraryReducer from './itineraryReducer';
import preferenceReducer from './preferenceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  itinerary: itineraryReducer,
  preferences: preferenceReducer
});

export default rootReducer;