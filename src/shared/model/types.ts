export interface User {
  id: number;
  name: string;
  email: string;
  profileImageURL: string;
  loginStatus: LoginStatus;
  description: string;
}

export type LoginStatus = 'ONLINE' | 'OFFLINE' | 'AWAY' | 'BUSY';
