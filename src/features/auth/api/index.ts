import type { SignInFormData, SignUpFormData } from '../model/schema';
import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/types/apiResponse';

export const signUp = async (data: Omit<SignUpFormData, 'confirmPassword'>): Promise<void> => {
  await apiClient.post<ApiResponse<void>>({ url: '/api/signup', data });
};

export const signIn = async (data: SignInFormData): Promise<void> => {
  await apiClient.post<ApiResponse<void>>({ url: '/login', data });
};
