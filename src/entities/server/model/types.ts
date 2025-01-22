import { PageInfo } from '@/shared/types/PageInfo';

export interface IServers {
  name: string;
  serverUri: string;
  serverImageURL: string;
}

export interface ServersDTO {
  content: IServers[];
  pageInfo: PageInfo;
}

export interface ChannelDTO {
  content: Channel[];
  pageInfo: PageInfo;
}
export interface Channel {
  id: string;
  name: string;
  type: string;
  roleId: number;
}
