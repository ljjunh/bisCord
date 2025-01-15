import { useAuthStore } from '../model/store';
import { ApiResponse } from '@/shared/types/apiResponse';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: 이부분 분리해서 401, 403, 429, 500 등 공통에러 처리
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // TODO : 리프레시 로직, 새로운 토큰 저장, 요청 헤더 업데이트, 원래 요청 재시도
      } catch (refreshError) {
        console.error('리프레시 실패', refreshError);
        // TODO : 리프레시 토큰도 만료된 경우 로그아웃, 로그인 페이지로 이동
      }
    }

    return Promise.reject(error);
  },
);

export const apiClient = {
  get: <T>(config: AxiosRequestConfig) =>
    axiosInstance.get<ApiResponse<T>>(config.url!, config).then((response) => response.data),

  post: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .post<ApiResponse<T>>(config.url!, config.data, config)
      .then((response) => response.data),

  put: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .put<ApiResponse<T>>(config.url!, config.data, config)
      .then((response) => response.data),

  patch: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .patch<ApiResponse<T>>(config.url!, config.data, config)
      .then((response) => response.data),

  delete: <T>(config: AxiosRequestConfig) =>
    axiosInstance.delete<ApiResponse<T>>(config.url!, config).then((response) => response.data),
} as const;
