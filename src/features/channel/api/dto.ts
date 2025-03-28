import type { Message } from '../model/types';
import type { PageInfo } from '@/shared/model/types/PageInfo';

export interface GetChMessageDTO {
  channelId: number;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface GetChMessageResponse {
  channelProfile: ChannelProfile;
  chats: ChatsResponse;
}

export interface ChannelProfile {
  id: number;
  name: string;
  type: string;
  roleId: number;
  roleName: string;
  notificationScope: string;
}

export interface ChatsResponse {
  content: Message[];
  pageInfo: PageInfo;
}

export interface PostSendMessageRequest {
  channelId: number;
  content: string;
}

export interface PostSendMessageResponse {
  chatId: string;
  channelId: number;
  content: string;
  userId: number;
  name: string;
  profileImageUrl: string;
  createdAt: string;
  updated: boolean;
}
export interface DeleteCHMessage {
  channelId: number;
  chatId: string;
}
export interface EditMessage {
  channelId: number;
  chatId: string;
  content: string;
}
