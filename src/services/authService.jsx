// src/services/authService.jsx
// This file contains functions for user authentication (login, register, logout).
// It interacts with the mock `api.jsx` for demonstration purposes.

import api from './api.jsx'; // Assuming api.jsx for making network requests

const AuthService = {
  /**
   * Registers a new user.
   * @param {object} userData - User registration details (name, email, password, etc.).
   * @returns {Promise<object>} - A promise resolving to user data or an error.
   */
  register: async (userData) => {
    try {
      // In a real app: const response = await api.post('/register', userData);
      // For mock:
      const response = await api.post('/users/register', userData);
      console.log('User registered:', response.data);
      // Simulate storing a token for the session
      localStorage.setItem('authToken', 'mock_jwt_token_for_' + userData.email);
      return { success: true, user: { email: userData.email, name: userData.name } };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, message: error.message || 'Registration failed' };
    }
  },

  /**
   * Logs in an existing user.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} - A promise resolving to user data or an error.
   */
  login: async (email, password) => {
    try {
      // In a real app: const response = await api.post('/login', { email, password });
      // For mock:
      if (email === 'user@example.com' && password === 'password') {
        const response = await api.post('/users/login', { email, password });
        console.log('User logged in:', response.data);
        // Simulate storing a token for the session
        localStorage.setItem('authToken', 'mock_jwt_token_for_' + email);
        return { success: true, user: { email: email, name: 'John Doe' } };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.message || 'Login failed' };
    }
  },

  /**
   * Logs out the current user.
   */
  logout: () => {
    console.log('User logged out');
    localStorage.removeItem('authToken'); // Clear token on logout
    // In a real app, you might also call a backend /logout endpoint
    return { success: true, message: 'Logged out successfully' };
  },

  /**
   * Checks if a user is currently authenticated (by checking for a token).
   * @returns {object|null} - The authenticated user's data if logged in, otherwise null.
   */
  getCurrentUser: () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // In a real app, you'd decode the JWT token or call a /me endpoint
      // For mock, return a generic user if a token exists
      const mockEmail = authToken.split('_for_')[1]; // Extract mock email from token
      return { email: mockEmail || 'user@example.com', name: 'Authenticated User' };
    }
    return null;
  },

  /**
   * Updates user profile data.
   * @param {string} userId
   * @param {object} profileData - Data to update (e.g., name, currencyPreference).
   * @returns {Promise<object>} - A promise resolving to updated user data or an error.
   */
  updateProfile: async (userId, profileData) => {
    try {
      const response = await api.put(`/users/${userId}/profile`, profileData);
      console.log('Profile updated:', response.data);
      return { success: true, user: profileData }; // Return updated data
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, message: error.message || 'Profile update failed' };
    }
  },

  /**
   * Changes user password.
   * @param {string} userId
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<object>} - A promise resolving to success status or an error.
   */
  changePassword: async (userId, currentPassword, newPassword) => {
    try {
      const response = await api.post(`/users/${userId}/change-password`, { currentPassword, newPassword });
      console.log('Password changed:', response.data);
      return { success: true, message: 'Password changed successfully' };
    } catch (error) {
      console.error('Password change failed:', error);
      return { success: false, message: error.message || 'Password change failed' };
    }
  }
};

export default AuthService;
