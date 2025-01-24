import type { LoginStatus } from '@/shared/model/types';

export interface DirectMessage {
  id: number;
  name: string;
  status: LoginStatus;
  hasUnread: boolean;
}
