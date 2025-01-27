import type { LoginStatus } from '@/shared/model/types';

export interface DMUser {
  userId: number;
  name: string;
  profileImageURL: string | null;
  loginStatus: LoginStatus;
}
