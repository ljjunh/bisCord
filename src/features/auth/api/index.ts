import type { SignUpFormData } from '../model/schema';
import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/types/apiResponse';

export const signUp = async (data: Omit<SignUpFormData, 'confirmPassword'>): Promise<void> => {
  await apiClient.post<ApiResponse<void>>({ url: '/signup', data });
};
