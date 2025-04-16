import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v0.1',
  timeout: 10000,
});

// Request interceptor to add JWT token to headers, if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
