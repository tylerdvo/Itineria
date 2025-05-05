import {
  FETCH_ITINERARIES_REQUEST, FETCH_ITINERARIES_SUCCESS, FETCH_ITINERARIES_FAILURE,
  FETCH_ITINERARY_REQUEST, FETCH_ITINERARY_SUCCESS, FETCH_ITINERARY_FAILURE,
  CREATE_ITINERARY_REQUEST, CREATE_ITINERARY_SUCCESS, CREATE_ITINERARY_FAILURE,
  UPDATE_ITINERARY_REQUEST, UPDATE_ITINERARY_SUCCESS, UPDATE_ITINERARY_FAILURE,
  DELETE_ITINERARY_REQUEST, DELETE_ITINERARY_SUCCESS, DELETE_ITINERARY_FAILURE,
  GENERATE_ITINERARY_REQUEST, GENERATE_ITINERARY_SUCCESS, GENERATE_ITINERARY_FAILURE,
  FAVORITE_ITINERARY_SUCCESS
} from '../types';

const initialState = {
  itineraries: [],
  currentItinerary: null,
  loading: false,
  error: null
};

const itineraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITINERARIES_REQUEST:
    case FETCH_ITINERARY_REQUEST:
    case CREATE_ITINERARY_REQUEST:
    case UPDATE_ITINERARY_REQUEST:
    case DELETE_ITINERARY_REQUEST:
    case GENERATE_ITINERARY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_ITINERARIES_SUCCESS:
      return {
        ...state,
        itineraries: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_ITINERARY_SUCCESS:
      return {
        ...state,
        currentItinerary: action.payload,
        loading: false,
        error: null
      };
    
    case CREATE_ITINERARY_SUCCESS:
      return {
        ...state,
        itineraries: [...state.itineraries, action.payload],
        currentItinerary: action.payload,
        loading: false,
        error: null
      };
    
    case UPDATE_ITINERARY_SUCCESS:
      return {
        ...state,
        itineraries: state.itineraries.map(itinerary => 
          itinerary.id === action.payload.id ? action.payload : itinerary
        ),
        currentItinerary: action.payload,
        loading: false,
        error: null
      };
    
    case DELETE_ITINERARY_SUCCESS:
      return {
        ...state,
        itineraries: state.itineraries.filter(itinerary => 
          itinerary.id !== action.payload
        ),
        currentItinerary: null,
        loading: false,
        error: null
      };
    
    case GENERATE_ITINERARY_SUCCESS:
      return {
        ...state,
        currentItinerary: action.payload,
        loading: false,
        error: null
      };
    
    case FAVORITE_ITINERARY_SUCCESS:
      return {
        ...state,
        itineraries: state.itineraries.map(itinerary => 
          itinerary.id === action.payload.id ? {
            ...itinerary,
            isFavorite: action.payload.isFavorite
          } : itinerary
        ),
        loading: false,
        error: null
      };
    
    case FETCH_ITINERARIES_FAILURE:
    case FETCH_ITINERARY_FAILURE:
    case CREATE_ITINERARY_FAILURE:
    case UPDATE_ITINERARY_FAILURE:
    case DELETE_ITINERARY_FAILURE:
    case GENERATE_ITINERARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default itineraryReducer;