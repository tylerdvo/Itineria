import axios from 'axios';
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE
} from '../types';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post('/api/v1/auth/login', { email, password });
    const user = response.data.user;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    dispatch({ type: LOGIN_SUCCESS, payload: user });
    return user;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post('/api/v1/auth/register', { name, email, password });
    const user = response.data.user;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    dispatch({ type: REGISTER_SUCCESS, payload: user });
    return user;
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || error.message });
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_REQUEST });

  try {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({ type: FETCH_USER_SUCCESS, payload: user });
      return user;
    } else {
      dispatch({ type: FETCH_USER_FAILURE, payload: 'Not authenticated' });
      return null;
    }
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
    throw error;
  }
};
