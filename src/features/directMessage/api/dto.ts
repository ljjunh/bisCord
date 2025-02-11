import type { DMUser, Message } from '../model/types';
import type { PageInfo } from '@/shared/model/types/PageInfo';

export interface GetDMRoomsDTO {
  page?: number;
  size?: number;
}

export interface GetDMRoomsResponseDTO {
  content: DMUser[];
  pageInfo: PageInfo;
}

export interface GetDMDTO {
  otherUserId: number;
  page?: number;
  size?: number;
}

export interface GetDMResponseDTO {
  chats: {
    content: Message[];
    pageInfo: PageInfo;
  };
}

export interface PostDMDTO {
  recipientId: number;
  content: string;
}

export interface DeleteDMDTO {
  recipientId: number;
  chatId: string;
}

export interface PatchDMDTO {
  recipientId: number;
  chatId: string;
  content: string;
}

export interface DeleteDMRoomDTO {
  recipientId: number;
}

export interface PostDMRoomDTO {
  recipientId: number;
}
