import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import type { ApiErrorResponse } from '../model/types/apiResponse';
import { useAuthStore } from '../model/store/authStore';
import { env } from '../config/env';
import { AUTH_ENDPOINT } from '../model/constants/apiEndpoints';
import { ROUTES } from '../model/constants/routes';
import { axiosInstance } from './apiClient';
import { NetworkOfflineError, UnknownError } from './customErrors';
import {
  isCustomRequestConfig,
  isNetworkOffline,
  isServerError,
  isUnknownError,
} from './typeGuards';

export const NetworkOfflineErrorHandler = {
  Error: NetworkOfflineError,
  validate: isNetworkOffline,
};

export const UnknownErrorHandler = {
  Error: UnknownError,
  validate: isUnknownError,
};

export class TokenExpiredHandler {
  static async handleRefresh(error: AxiosError<ApiErrorResponse>) {
    if (!isCustomRequestConfig(error.config)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    originalRequest._retry = true;

    try {
      const { accessToken, setAccessToken } = useAuthStore.getState();
      const response = await axios.post(`${env.apiBaseURL}${AUTH_ENDPOINT.REFRESH}`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      const newAccessToken = response.data.data.accessToken;
      setAccessToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      if (isServerError(refreshError) && refreshError.response?.status === 401) {
        this.handleError();
      }
      return Promise.reject(refreshError);
    }
  }

  static handleError() {
    toast.error('인증이 만료되었습니다.');
    useAuthStore.getState().clearAuth();
    window.location.href = ROUTES.AUTH.SIGN_IN;
  }
}
