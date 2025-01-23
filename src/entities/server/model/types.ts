import { PageInfo } from '@/shared/types/PageInfo';

export interface Servers {
  name: string;
  serverUri: string;
  serverImageURL: string;
}

export interface ServersDTO {
  content: Servers[];
  pageInfo: PageInfo;
}

export interface ChannelDTO {
  content: Channel[];
  pageInfo: PageInfo;
}
export interface Channel {
  id: string;
  name: string;
  type: 'TEXT' | 'VOICE';
  roleId: number;
}
