// src/services/api.jsx
// This file centralizes generic API request logic.
// In a real application, you would configure Axios or Fetch here
// with base URLs, headers (like authorization tokens), and error handling.

// A simple mock API function
const mockApiCall = (data, delay = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success or failure
      if (Math.random() > 0.1) { // 90% success rate for mock calls
        resolve({ success: true, data });
      } else {
        reject({ success: false, message: 'Mock API Error: Something went wrong.' });
      }
    }, delay);
  });
};

const api = {
  // Generic GET request (mocked)
  get: async (endpoint, params = {}) => {
    console.log(`Mock API GET: ${endpoint} with params:`, params);
    // In a real app: return axios.get(endpoint, { params, headers: getAuthHeaders() });
    return mockApiCall({ message: `Data from ${endpoint}`, params });
  },

  // Generic POST request (mocked)
  post: async (endpoint, data) => {
    console.log(`Mock API POST: ${endpoint} with data:`, data);
    // In a real app: return axios.post(endpoint, data, { headers: getAuthHeaders() });
    return mockApiCall({ message: `Created resource at ${endpoint}`, data });
  },

  // Generic PUT request (mocked)
  put: async (endpoint, data) => {
    console.log(`Mock API PUT: ${endpoint} with data:`, data);
    // In a real app: return axios.put(endpoint, data, { headers: getAuthHeaders() });
    return mockApiCall({ message: `Updated resource at ${endpoint}`, data });
  },

  // Generic DELETE request (mocked)
  remove: async (endpoint) => {
    console.log(`Mock API DELETE: ${endpoint}`);
    // In a real app: return axios.delete(endpoint, { headers: getAuthHeaders() });
    return mockApiCall({ message: `Deleted resource at ${endpoint}` });
  },

  // Function to retrieve authentication headers (e.g., JWT token)
  getAuthHeaders: () => {
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export default api;
