import { Message } from '../model/types';
import { PageInfo } from '@/shared/types/PageInfo';

export interface GetChMessageDTO {
  channelId: number;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface GetChMessageResponse {
  content: Message[];
  pageInfo: PageInfo;
}
