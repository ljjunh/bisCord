import type { Friend } from '@/entities/friend/model/types';
import type { PageInfo } from '@/shared/types/PageInfo';

export interface GetUserResponseDTO {
  id: number;
  name: string;
  profileImageURL: string;
  description: string;
}

export interface GetUsersDTO {
  keyword: string;
  page?: number;
  size?: number;
}

export interface GetUsersResponseDTO {
  content: Friend[];
  pageInfo: PageInfo;
}
