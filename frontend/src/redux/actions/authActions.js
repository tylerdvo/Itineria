import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGOUT
  } from '../types';
  import { auth } from '../../firebase';
  import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut
  } from 'firebase/auth';
  import api from '../../services/api';
  
  export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      
      // Fetch user data from backend
      const userData = await api.get(`/users/${user.uid}`);
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData.data
      });
      
      return userData.data;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
  
  export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      
      // Create user in backend
      const userData = await api.post('/users', {
        id: user.uid,
        name,
        email
      });
      
      dispatch({
        type: REGISTER_SUCCESS,
        payload: userData.data
      });
      
      return userData.data;
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
  
  export const logout = () => async (dispatch) => {
    try {
      await signOut(auth);
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };