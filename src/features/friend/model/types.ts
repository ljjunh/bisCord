import { FRIEND_REQUEST_TYPE } from './constants';

export type FriendTab = 'online' | 'all' | 'pending' | 'add';

export type FriendRequestType = (typeof FRIEND_REQUEST_TYPE)[keyof typeof FRIEND_REQUEST_TYPE];

export interface PageInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
}
