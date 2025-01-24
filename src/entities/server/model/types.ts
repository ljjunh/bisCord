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

export interface ChannelMemberDTO {
  id: number;
  userId: number;
  name: string;
  roleId: number;
  profileImageURL: string | null;
  loginStatus: 'LOGOUT';
}

export interface GetMembersDTO {
  serverUri: string;
  channelId: string;
}
