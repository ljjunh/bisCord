import { ApiResponse } from '@/shared/model/types';
import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: 토큰 넣어야됨
    const accessToken = '토큰 넣기';
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

function createApiMethod<T>(method: Method) {
  return (config: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return axiosInstance({
      ...config,
      method,
    }).then((response) => response.data);
  };
}

export const apiClient = {
  get: createApiMethod('GET'),
  post: createApiMethod('POST'),
  put: createApiMethod('PUT'),
  patch: createApiMethod('PATCH'),
  delete: createApiMethod('DELETE'),
} as const;
