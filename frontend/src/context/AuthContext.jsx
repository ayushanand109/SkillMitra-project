import React, { createContext, useContext, useState, useEffect } from 'react';
import { currentUser } from '../data/mockData';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);
  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("skillmitra_token");
    if (!token) return;

    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(response.data);

    } catch (error) {
      console.error("Auto-login failed");
      localStorage.removeItem("skillmitra_token");
    }
  };

  fetchUser();
}, []);

  useEffect(() => {
    // Simulate checking for existing session
    const token = localStorage.getItem('skillmitra_token');
    if (token) {
      // In a real app, you would validate the token with your backend
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
  setIsLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    const { token, user } = response.data;

    localStorage.setItem("skillmitra_token", token);
    setUser(user);

    return { success: true };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed"
    };
  } finally {
    setIsLoading(false);
  }
};

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const token = 'google_mock_token_' + Date.now();
      localStorage.setItem('skillmitra_token', token);
      setUser(currentUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, you would create the user account
      const newUser = {
        ...currentUser,
        name: userData.name,
        email: userData.email,
        jobTitle: userData.jobTitle || "New Member"
      };
      
      const token = 'signup_mock_token_' + Date.now();
      localStorage.setItem('skillmitra_token', token);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('skillmitra_token');
    setUser(null);
    setAnonymousMode(false);
  };

  const toggleAnonymousMode = () => {
    setAnonymousMode(prev => !prev);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    // In a real app, you would make an API call to update the user profile
  };

  const value = {
    user,
    isLoading,
    anonymousMode,
    login,
    loginWithGoogle,
    signup,
    logout,
    toggleAnonymousMode,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
