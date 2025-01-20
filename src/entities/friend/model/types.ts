export interface Friend {
  email: string;
  id: number;
  loginStatus: FriendLoginStatus;
  name: string;
  profileImageURL: string | null;
  status: FriendStatus;
}

export type FriendLoginStatus = 'LOGIN' | 'LOGOUT';

export type FriendStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';
