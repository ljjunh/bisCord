import { Friend } from '@/entities/friend/model/types';
import { LoginStatus } from '@/entities/user/model/types';

export interface GetOtherUserDTO {
  userId: number;
}

export type GetOtherUserResponseDTO = Friend;

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

export interface PostUserStatusDTO {
  status: LoginStatus;
}
