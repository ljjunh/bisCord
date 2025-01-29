import { LOGIN_STATUS } from './constants';

export interface User {
  id: number;
  name: string;
  email: string;
  profileImageURL: string;
  description: string;
  loginStatus: LoginStatus;
}

export type LoginStatus = keyof typeof LOGIN_STATUS;

export interface UserProfile {
  name: string;
  description: string;
  image: string | File;
}
