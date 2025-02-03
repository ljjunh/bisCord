import { LoginStatus } from '@/shared/model/types';
import { PageInfo } from '@/shared/types/PageInfo';

export interface Servers {
  name: string;
  serverUri: string;
  serverImageURL: string;
}
export interface PutServerDTO {
  name: string;
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

export interface GetmemberDTO {
  serverUri: string;
  roleId?: number;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface MemberDTO {
  content: ServerMemberDTO[];
  pageInfo: PageInfo;
}

export interface Channel {
  id: string;
  name: string;
  type: 'TEXT' | 'VOICE';
  roleId: number;
}

export interface ServerMemberDTO {
  id: number;
  userId: number;
  name: string;
  roleRank: number;
  roleName: string;
  profileImageURL: string | null;
  loginStatus: LoginStatus;
}

export interface PostInviteServer {
  serverUri: string;
}
export interface InviteServer {
  inviteUrl: string;
}

export interface PutUserDTO {
  name: string;
  profileImageURL: string;
  description: string;
}

export interface PutImageToS3DTO {
  presignedUrl: string;
  file: File;
}

export interface PostImageDTO {
  fileName: string;
  contentType: string;
  contentLength: number;
}

export interface PostImageResponseDTO {
  presignedUrl: string;
  key: string;
}

export interface GetImageUrlDTO {
  key: string;
}

export interface GetImageUrlResponseDTO {
  imageUrl: string;
}

export interface PutUserProfileDTO extends Omit<PutUserDTO, 'profileImageURL'> {
  image: string | File;
}

export interface PostDMDTO {
  recipientId: number;
  content: string;
}
