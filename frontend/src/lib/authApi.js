import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // For cookies
});

// Auth API functions
export const authApi = {
  // Login
  login: (credentials) =>
    api.post("/api/auth/login", {
      emailOrUsername: credentials.emailOrUsername,
      password: credentials.password,
    }),

  // Signup
  signup: (userData) => api.post("/api/auth/signup", userData),

  // Google OAuth
  googleAuth: () => {
    window.location.href = `${backendUrl}/api/auth/google`;
  },
};

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
