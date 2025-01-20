import type { FriendRequestType } from './../model/types';
import type { Friend } from '@/entities/friend/model/types';
import type { PageInfo } from '@/shared/types/PageInfo';

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
}

export interface PostFriendRequestDTO {
  invitedUserId: number;
}

export interface PostFriendAcceptDTO {
  invitingUserId: number;
}

export interface PostFriendDeclineDTO {
  userId: number;
}
