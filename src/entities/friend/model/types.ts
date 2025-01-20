import { FRIEND_LOGIN_STATUS } from './constants';

export interface Friend {
  email: string;
  id: number;
  loginStatus: FriendLoginStatus;
  name: string;
  profileImageURL: string | null;
  status: FriendStatus;
}

export type FriendLoginStatus = (typeof FRIEND_LOGIN_STATUS)[keyof typeof FRIEND_LOGIN_STATUS];

export type FriendStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';
