export type FriendTab = 'online' | 'all' | 'pending' | 'add';

export type FriendRequestType = 'INVITED' | 'RECEIVED' | 'ACCEPTED';

export interface PageInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
}
