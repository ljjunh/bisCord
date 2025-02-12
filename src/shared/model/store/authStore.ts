import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginStatus, User } from '../types/auth';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string) => void;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  setLoginStatus: (status: LoginStatus) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      setAuth: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),

      setLoginStatus: (status: LoginStatus) =>
        set((state) => ({
          user: state.user ? { ...state.user, loginStatus: status } : null,
        })),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
