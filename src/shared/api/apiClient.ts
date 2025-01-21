import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { ApiResponse } from '@/shared/types/apiResponse';
import { useAuthStore } from '../model/authStore';

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
      config.headers.Authorization = `Bearer ${accessToken}`;
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
        // TODO : 이거 너무 비효율적인데 백엔드 수정하면 이쪽 다시 다 바꿔야됨
        const { accessToken } = useAuthStore.getState();

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/login/refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch {
        toast.error('인증이 만료되었습니다');

        await useAuthStore.getState().clearAuth();

        window.location.href = '/signin';
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
