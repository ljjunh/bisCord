import type { SignInFormData, SignUpFormData } from '../model/schema';
import { apiClient } from '@/shared/api/apiClient';
import { useAuthStore } from '@/shared/model/store';
import { User } from '@/shared/model/types';
import axios from 'axios';

export const signUp = async (data: Omit<SignUpFormData, 'confirmPassword'>): Promise<void> => {
  await apiClient.post<void>({ url: '/signup', data });
};

export const signIn = async (data: SignInFormData): Promise<void> => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, data);

  const token = response.headers.authorization.split(' ')[1];

  // 이렇게 해야하나 맞나... 로그인할때 유저정보 주면 되자나...
  useAuthStore.getState().setAuth(token, null);

  const user = await getUser();

  useAuthStore.getState().setAuth(token, user);
};

export const getUser = async (): Promise<User> => {
  const response = await apiClient.get<User>({ url: '/user' });

  return response.data;
};
