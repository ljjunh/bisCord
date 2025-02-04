import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import type { ApiErrorResponse } from '../types/apiResponse';
import { useAuthStore } from '../model/authStore';
import { axiosInstance } from './apiClient';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export class NetworkOfflineError extends Error {
  constructor() {
    super('네트워크 연결을 확인해주세요');
    this.name = 'NetworkOfflineError';
  }
}

export class TokenExpiredHandler {
  static validate(error: AxiosError<ApiErrorResponse>) {
    const request = error.config as CustomAxiosRequestConfig;

    return (
      error.response?.status === 401 &&
      !request._retry &&
      error.response.data.errorDetails.errorName === 'UNAUTHORIZED_USER'
    );
  }

  static async handleRefresh(error: AxiosError<ApiErrorResponse>) {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    originalRequest._retry = true;

    try {
      const { accessToken } = useAuthStore.getState();
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/login/refresh`,
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      );

      const newAccessToken = response.data.data.accessToken;
      useAuthStore.getState().setAccessToken(newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      if (refreshError instanceof AxiosError && refreshError.response?.status === 401) {
        this.handleError();
      }
      return Promise.reject(refreshError);
    }
  }

  static handleError() {
    toast.error('인증이 만료되었습니다.');
    useAuthStore.getState().clearAuth();
    window.location.href = '/signin';
  }
}
