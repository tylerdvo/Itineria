import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../redux/actions/authActions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated
  const checkAuthState = useCallback(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    setLoading(false);
    return isAuthenticated;
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  // Login handler
  const handleLogin = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(login(email, password));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  // Register handler
  const handleRegister = async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(register(name, email, password));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  // Logout handler
  const handleLogout = async () => {
    setError(null);
    try {
      await dispatch(logout());
      return true;
    } catch (err) {
      setError(err.message || 'Logout failed');
      return false;
    }
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkAuthState
  };
};

export default useAuth;