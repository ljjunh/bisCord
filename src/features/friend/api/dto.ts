import { Content, FriendRequestType, Pageable, Sort } from './../model/types';

export interface GetFriendsDTO {
  type: FriendRequestType;
  status?: Content['loginStatus'];
  keyword?: string;
  page?: number;
  size?: number;
}

export interface GetFriendsResponseDTO {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}
