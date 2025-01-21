import axios from 'axios';
import type { SignInDTO, SignUpDTO } from './dto';
import { useAuthStore } from '@/shared/model/authStore';
import { userService } from '@/entities/user/api/service';
import { apiClient } from '@/shared/api/apiClient';

export const authService = {
  signUp: async (data: SignUpDTO): Promise<void> => {
    await apiClient.post<void>({ url: '/signup', data });
  },
  signIn: async (data: SignInDTO): Promise<void> => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, data, {
      withCredentials: true,
    });
    const token = response.data.data.accessToken;

    useAuthStore.getState().setAccessToken(token);

    const user = await userService.getUser();

    useAuthStore.getState().setAuth(user);
  },
  socialSignIn: async (data: string): Promise<string> => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/login/code`,
      {},
      {
        params: {
          code: data,
        },
      },
    );
    const token = response.data.data.accessToken;

    return token;
  },
};
