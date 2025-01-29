import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiErrorResponse } from '../types/apiResponse';
import { useAuthStore } from '@/shared/model/authStore';
import { NetworkOfflineError, TokenExpiredHandler } from './errorHandler';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (config.headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData();

    Object.entries(config.data || {}).forEach(([key, value]) => {
      if (value == null) return;
      formData.append(key, value instanceof File ? value : String(value));
    });

    config.data = formData;
  }

  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return Promise.resolve(response);
};

export const rejectInterceptor = async (error: AxiosError) => {
  if (!navigator.onLine) {
    throw new NetworkOfflineError();
  }

  if (TokenExpiredHandler.validate(error as AxiosError<ApiErrorResponse>)) {
    return TokenExpiredHandler.handleRefresh(error as AxiosError<ApiErrorResponse>);
  }

  return Promise.reject(error);
};
