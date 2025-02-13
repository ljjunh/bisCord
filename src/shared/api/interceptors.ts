import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/shared/model/store/authStore';
import {
  NetworkOfflineErrorHandler,
  TokenExpiredHandler,
  UnknownErrorHandler,
} from './errorHandlers';
import { isServerError, isTokenExpiredError } from './typeGuards';

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
  if (NetworkOfflineErrorHandler.validate()) {
    throw new NetworkOfflineErrorHandler.Error();
  }

  if (UnknownErrorHandler.validate(error)) {
    throw new UnknownErrorHandler.Error();
  }

  if (isServerError(error)) {
    console.error(error.response?.data.message);
  }

  if (isTokenExpiredError(error)) {
    return TokenExpiredHandler.handleRefresh(error);
  }

  return Promise.reject(error);
};
