import type { DMUser, Message } from '../model/types';
import type { PageInfo } from '@/shared/types/PageInfo';

export interface GetDMUsersDTO {
  page?: number;
  size?: number;
}

export interface GetDMUsersResponseDTO {
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
