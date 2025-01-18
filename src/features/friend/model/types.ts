export type FriendTab = 'online' | 'all' | 'pending' | 'add';

export type FriendRequestType = 'INVITED' | 'RECEIVED' | 'ACCEPTED';

export interface Content {
  id: number;
  name: string;
  profileImageURL: string;
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
  loginStatus: 'LOGIN' | 'LOGOUT';
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
