import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, try refresh once. Also reject if response is HTML (Vite fallback).
api.interceptors.response.use(
  (res) => {
    // If we expect JSON but get HTML, the backend is likely offline and Vite served index.html
    if (typeof res.data === 'string' && res.data.trim().startsWith('<!DOCTYPE html>')) {
      return Promise.reject(new Error('Backend offline, received HTML fallback'));
    }
    return res;
  },
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const newToken = await useAuthStore.getState().refreshToken();
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
