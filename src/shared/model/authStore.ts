import type { User } from './types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setInitialAuth: (token: string) => void;
  setCompleteAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setInitialAuth: (token) =>
        set({
          accessToken: token,
          user: null,
          isAuthenticated: false,
        }),

      setCompleteAuth: (token, user) =>
        set({
          accessToken: token,
          user,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
