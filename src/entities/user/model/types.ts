export interface User {
  id: number;
  name: string;
  profileImageURL: string;
  description: string;
  status?: UserStatus;
}

export type UserStatus = 'online' | 'offline' | 'away' | 'busy';
