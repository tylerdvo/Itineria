import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const userData = JSON.parse(localStorage.getItem('user')) || {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com'
      };
      setUser(userData);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Register with email/password
  const registerWithEmail = async (email, password, name) => {
    try {
      // For demo, accept any registration
      const userData = {
        id: '1',
        name,
        email,
        displayName: name
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Login with email/password
  const loginWithEmail = async (email, password) => {
    try {
      // For demo, accept any login
      const userData = {
        id: '1',
        name: email.split('@')[0],
        email,
        displayName: email.split('@')[0]
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      // Simulate Google login
      const userData = {
        id: '1',
        name: 'Google User',
        email: 'google@example.com',
        displayName: 'Google User'
      };
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Logout
  const logout = async () => {
    try {
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Check auth state
  const checkAuthState = () => {
    return new Promise((resolve) => {
      // Check if user is authenticated from localStorage
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuthenticated) {
        const userData = JSON.parse(localStorage.getItem('user')) || {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com'
        };
        setUser(userData);
        resolve(userData);
      } else {
        setUser(null);
        resolve(null);
      }
      setLoading(false);
    });
  };

  // Get current user's ID token (simulated)
  const getCurrentUserIdToken = async () => {
    if (!user) return null;
    try {
      // Simulate token
      return "mock-auth-token-for-demo";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    checkAuthState,
    getCurrentUserIdToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};