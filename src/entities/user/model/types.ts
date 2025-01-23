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
