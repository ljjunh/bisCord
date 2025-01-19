import type { FriendRequestType, PageInfo } from './../model/types';
import type { Friend } from '@/entities/friend/model/types';

export interface GetFriendsDTO {
  type: FriendRequestType;
  status?: Friend['loginStatus'];
  keyword?: string;
  page?: number;
  size?: number;
}

export interface GetFriendsResponseDTO {
  content: Friend[];
  pageInfo: PageInfo;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}
