import { type AxiosError, type InternalAxiosRequestConfig, isAxiosError } from 'axios';
import type { ApiErrorResponse, CustomAxiosRequestConfig } from '../model/types/apiResponse';
import type {
  ChatMessage,
  SendMessage,
  UpdateMessage,
  WebRTCSignalData,
  WebSocketMessage,
} from '../model/types/webSocket';

export const isServerError = (error: unknown): error is AxiosError<ApiErrorResponse> => {
  return (
    isAxiosError(error) &&
    error.response !== undefined && // response가 존재하는지 먼저 확인
    typeof error.response.data === 'object' &&
    error.response.data !== null && // data가 null이 아닌지 확인
    'errorDetails' in error.response.data
  );
};

export const isNetworkOffline = () => {
  return !navigator.onLine;
};

export const isUnknownError = (error: Error) => {
  return !isAxiosError(error) || !error.response;
};

export const isCustomRequestConfig = (
  config: InternalAxiosRequestConfig | undefined,
): config is CustomAxiosRequestConfig => {
  return !!config && '_retry' in config;
};

export const isTokenExpiredError = (error: Error): error is AxiosError<ApiErrorResponse> => {
  return (
    isServerError(error) &&
    isCustomRequestConfig(error.config) &&
    error.response?.data.status === 401 &&
    !error.config._retry &&
    error.response.data.errorDetails.errorName === 'UNAUTHORIZED_USER'
  );
};

export const isDMMessage = (data: WebSocketMessage['data']): data is ChatMessage | SendMessage => {
  return 'userId' in data && 'recipientId' in data;
};

export const isSendMessage = (data: WebSocketMessage['data']): data is SendMessage => {
  return 'content' in data && 'createdAt' in data && 'name' in data;
};

export const isUpdateMessage = (data: WebSocketMessage['data']): data is UpdateMessage => {
  return 'chatId' in data && 'content' in data && !('createdAt' in data);
};

export const isWebRTCSignalData = (data: WebSocketMessage['data']): data is WebRTCSignalData => {
  return 'fromUserId' in data && 'toUserId' in data;
};
