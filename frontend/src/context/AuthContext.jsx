
import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Auto login on refresh
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("skillmitra_token");

      if (!token) {
        setIsLoading(false);
        return;
      }

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

        // Save user for chat UI
        localStorage.setItem(
          "skillmitra_user",
          JSON.stringify(response.data)
        );

      } catch (error) {
        console.error("Auto-login failed");
        localStorage.removeItem("skillmitra_token");
        localStorage.removeItem("skillmitra_user");
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, user } = response.data;

      localStorage.setItem("skillmitra_token", token);
      localStorage.setItem("skillmitra_user", JSON.stringify(user));

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

  // SIGNUP
  const signup = async (userData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData
      );

      const { token, user } = response.data;

      localStorage.setItem("skillmitra_token", token);
      localStorage.setItem("skillmitra_user", JSON.stringify(user));

      setUser(user);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Signup failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  // GOOGLE LOGIN (not implemented yet)
  const loginWithGoogle = async () => {
    alert("Google login not implemented yet");
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('skillmitra_token');
    localStorage.removeItem('skillmitra_user');
    setUser(null);
    setAnonymousMode(false);
  };

  const toggleAnonymousMode = () => {
    setAnonymousMode(prev => !prev);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
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

