import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/authService.jsx'; // Import the authentication service

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // On initial load, check if a user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false); // Authentication check is complete
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await AuthService.login(email, password);
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('AuthContext login error:', error);
      return { success: false, message: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await AuthService.register(userData);
      if (result.success) {
        setUser(result.user); // Log in the user directly after registration
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('AuthContext register error:', error);
      return { success: false, message: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  // Profile update function that also updates the context's user state
  const updateProfile = async (userId, profileData) => {
    try {
      const result = await AuthService.updateProfile(userId, profileData);
      if (result.success) {
        setUser((prevUser) => ({ ...prevUser, ...profileData })); // Update context user state
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('AuthContext profile update error:', error);
      return { success: false, message: error.message || 'Profile update failed' };
    }
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    try {
      const result = await AuthService.changePassword(userId, currentPassword, newPassword);
      if (result.success) {
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('AuthContext password change error:', error);
      return { success: false, message: error.message || 'Password change failed' };
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);