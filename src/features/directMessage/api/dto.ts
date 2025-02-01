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
