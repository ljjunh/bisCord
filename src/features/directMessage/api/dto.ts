import type { DMUser } from '../model/types';
import type { PageInfo } from '@/shared/types/PageInfo';

export interface GetDMUsersDTO {
  page?: number;
  size?: number;
}

export interface GetDMUsersResponseDTO {
  content: DMUser[];
  pageInfo: PageInfo;
}
