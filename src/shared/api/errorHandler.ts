import axios, { AxiosError, type InternalAxiosRequestConfig, isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import type { ApiErrorResponse } from '../model/types/apiResponse';
import { useAuthStore } from '../model/store/authStore';
import { axiosInstance } from './apiClient';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class NetworkOfflineError extends Error {
  constructor() {
    super('네트워크 연결을 확인해주세요');
    this.name = 'NetworkOfflineError';
  }
}

const isNetworkOffline = () => {
  return !navigator.onLine;
};

export const NetworkOfflineErrorHandler = {
  Error: NetworkOfflineError,
  validate: isNetworkOffline,
};

class UnknownError extends Error {
  constructor() {
    super('원인 불명의 에러입니다. 고객센터로 문의해주세요.');
    this.name = 'UnknownError';
  }
}

/**
 *  @description 폐쇄적인 인트라넷 환경에서 요청을 보낸 경우가 의심되는 에러
 */
export const isUnknownError = (error: Error) => {
  return !isAxiosError(error) || !error.response;
};

export const UnknownErrorHandler = {
  Error: UnknownError,
  validate: isUnknownError,
};

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
