import type { SignInDTO, SignInResponseDTO, SignUpDTO, SocialSignInResponseDTO } from './dto';
import { useAuthStore } from '@/shared/model/authStore';
import { userService } from '@/entities/user/api/service';
import { apiClient } from '@/shared/api/apiClient';

export const authService = {
  signUp: async (data: SignUpDTO): Promise<void> => {
    await apiClient.post<void>({ url: '/signup', data });
  },
  signIn: async (data: SignInDTO): Promise<void> => {
    const response = await apiClient.post<SignInResponseDTO>({ url: '/login', data });

    const token = response.data.accessToken;

    useAuthStore.getState().setAccessToken(token);

    const user = await userService.getUser();

    useAuthStore.getState().setAuth(user);
  },
  socialSignIn: async (code: string): Promise<string> => {
    const response = await apiClient.post<SocialSignInResponseDTO>({
      url: '/login/code',
      params: { code },
    });

    return response.data.accessToken;
  },
  signOut: async (): Promise<void> => {
    await apiClient.post<void>({ url: '/login/logout' });
  },
};
