import { LoginStatus } from '@/shared/model/types';

export interface User {
  id: number;
  name: string;
  email: string;
  profileImageURL: string;
  description: string;
  loginStatus: LoginStatus;
}
