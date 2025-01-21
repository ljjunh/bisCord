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
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, data);
    const token = response.data.data.accessToken;

    useAuthStore.getState().setInitialAuth(token);

    const user = await userService.getUser();

    useAuthStore.getState().setCompleteAuth(token, user);
  },
  socialSignIn: async (data: string): Promise<string> => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login/code`,
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
