import type { UserStatus } from '@/entities/user/model/types';

export interface DirectMessage {
  id: number;
  name: string;
  status: UserStatus;
  hasUnread: boolean;
}
