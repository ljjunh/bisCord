import type { LoginStatus } from '@/shared/model/types';

export interface DMUser {
  userId: number;
  name: string;
  profileImageURL: string | null;
  loginStatus: LoginStatus;
}

export interface Message {
  chatId: string;
  content: string;
  userId: number;
  name: string;
  createdAt: string;
  updated: boolean;
}

export interface MessageGroups {
  user: {
    id: number;
    name: string;
  };
  messages: Message[];
  timestamp: string;
}
