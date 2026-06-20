import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      login: async (username, password) => {
        const { data } = await axios.post(`${API}/auth/login`, { username, password }, { withCredentials: true });
        set({ user: data.user, accessToken: data.accessToken, isAuthenticated: true });
        return data;
      },

      logout: async () => {
        try { await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }); } catch (_) {}
        set({ user: null, accessToken: null, isAuthenticated: false });
      },

      refreshToken: async () => {
        try {
          const { data } = await axios.post(`${API}/auth/refresh`, {}, { withCredentials: true });
          set({ accessToken: data.accessToken });
          return data.accessToken;
        } catch (_) {
          set({ user: null, accessToken: null, isAuthenticated: false });
          return null;
        }
      },
    }),
    { name: 'lacso-auth', partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }) }
  )
);
