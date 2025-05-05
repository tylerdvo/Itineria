import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../redux/actions/authActions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // Prevent crash if auth is undefined (e.g., before Redux store is ready)
  const safeAuth = auth || {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };

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
    user: safeAuth.user,
    isAuthenticated: safeAuth.isAuthenticated,
    loading: safeAuth.loading || loading,
    error: safeAuth.error || error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkAuthState
  };
};