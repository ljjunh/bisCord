import type { LoginStatus } from '@/entities/user/model/types';

export interface Friend {
  email: string;
  id: number;
  loginStatus: LoginStatus;
  name: string;
  profileImageURL: string | null;
  status: FriendStatus;
}

export type FriendStatus = 'ACCEPTED' | 'INVITED' | 'RECEIVED';
