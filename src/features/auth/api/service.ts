import type { SignInDTO, SignUpDTO } from './dto';
import { userService } from '@/entities/user/api/service';
import { apiClient } from '@/shared/api/apiClient';
import { useAuthStore } from '@/shared/model/authStore';
import { ApiResponse } from '@/shared/types/apiResponse';
import axios from 'axios';

export const authService = {
  signUp: async (data: SignUpDTO): Promise<void> => {
    await apiClient.post<void>({ url: '/signup', data });
  },
  signIn: async (data: SignInDTO): Promise<void> => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, data);

    const token = response.headers.authorization.split(' ')[1];

    // 이렇게 해야하나 맞나... 로그인할때 유저정보 주면 되자나...
    useAuthStore.getState().setInitialAuth(token);

    const user = await userService.getUser();

    useAuthStore.getState().setCompleteAuth(token, user);
  },
  socialSignIn: async (data: string): Promise<string> => {
    const response = await axios.post<ApiResponse<null>>(
      `${import.meta.env.VITE_BASE_URL}/login/code`,
      {},
      {
        params: {
          code: data,
        },
      },
    );
    const token = response.headers.authorization.split(' ')[1];

    return token;
  },
};
