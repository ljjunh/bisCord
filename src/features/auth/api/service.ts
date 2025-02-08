import type {
  SignInDTO,
  SignInResponseDTO,
  SignUpDTO,
  SocialSignInDTO,
  SocialSignInResponseDTO,
} from './dto';
import { useAuthStore } from '@/shared/model/authStore';
import { userService } from '@/entities/user/api/service';
import { apiClient } from '@/shared/api/apiClient';
import { AUTH_ENDPOINT } from '@/shared/constants/apiEndpoints';

export const authService = {
  signUp: async (data: SignUpDTO): Promise<void> => {
    await apiClient.post<void>({ url: AUTH_ENDPOINT.SIGN_UP, data });
  },
  signIn: async (data: SignInDTO): Promise<void> => {
    const response = await apiClient.post<SignInResponseDTO>({ url: AUTH_ENDPOINT.SIGN_IN, data });

    const token = response.data.accessToken;

    useAuthStore.getState().setAccessToken(token);

    const user = await userService.getUser();

    useAuthStore.getState().setAuth(user);
  },

  signOut: async (): Promise<void> => {
    await apiClient.post<void>({ url: AUTH_ENDPOINT.SIGN_OUT });
  },

  withdraw: async (): Promise<void> => {
    await apiClient.delete<void>({ url: AUTH_ENDPOINT.WITHDRAW });
  },

  socialSignIn: async ({ code }: SocialSignInDTO): Promise<void> => {
    const response = await apiClient.post<SocialSignInResponseDTO>({
      url: AUTH_ENDPOINT.SOCIAL_SIGN_IN,
      params: { code },
    });

    const token = response.data.accessToken;

    useAuthStore.getState().setAccessToken(token);

    const user = await userService.getUser();

    useAuthStore.getState().setAuth(user);
  },
};
