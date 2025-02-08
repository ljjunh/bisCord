import type {
  GetImageUrlDTO,
  GetImageUrlResponseDTO,
  GetOtherUserDTO,
  GetOtherUserResponseDTO,
  PostImageDTO,
  PostImageResponseDTO,
  PostUserStatusDTO,
  PutImageToS3DTO,
  PutUserDTO,
  PutUserProfileDTO,
} from './dto';
import type { User } from '@/shared/model/types';
import { apiClient } from '@/shared/api/apiClient';
import { USER_ENDPOINT } from '@/shared/constants/apiEndpoints';

export const userService = {
  getOtherUser: async ({ userId }: GetOtherUserDTO): Promise<GetOtherUserResponseDTO> => {
    const response = await apiClient.get<GetOtherUserResponseDTO>({
      url: USER_ENDPOINT.GET_OTHER_USER(userId),
    });

    return response.data;
  },

  putUser: async (data: PutUserDTO): Promise<void> => {
    await apiClient.put<void>({
      url: USER_ENDPOINT.PUT_USER,
      data,
    });
  },

  postImage: async (data: PostImageDTO): Promise<PostImageResponseDTO> => {
    const response = await apiClient.post<PostImageResponseDTO>({
      url: USER_ENDPOINT.POST_IMAGE,
      data,
    });

    return response.data;
  },

  putImageToS3: async ({ presignedUrl, file }: PutImageToS3DTO): Promise<void> => {
    await apiClient.putS3(presignedUrl, file);
  },

  getImageUrl: async ({ key }: GetImageUrlDTO): Promise<GetImageUrlResponseDTO> => {
    const response = await apiClient.get<GetImageUrlResponseDTO>({
      url: USER_ENDPOINT.GET_IMAGE,
      params: {
        key,
      },
    });

    return response.data;
  },

  putUserProfile: async ({
    name,
    image,
    description,
  }: PutUserProfileDTO): Promise<Pick<User, 'name' | 'description' | 'profileImageURL'>> => {
    let profileImageURL = image;

    if (image instanceof File) {
      // 이미지가 File인 경우만 S3 업로드 로직 실행
      const imageData = await userService.postImage({
        fileName: image.name,
        contentType: image.type,
        contentLength: image.size,
      });

      await userService.putImageToS3({
        presignedUrl: imageData.presignedUrl,
        file: image,
      });

      const { imageUrl } = await userService.getImageUrl({
        key: imageData.key,
      });
      profileImageURL = imageUrl;
    }

    await userService.putUser({
      name: name,
      description: description,
      profileImageURL: profileImageURL as string,
    });

    return {
      name,
      description,
      profileImageURL: profileImageURL as string,
    };
  },

  postUserStatus: async ({ status }: PostUserStatusDTO): Promise<void> => {
    await apiClient.post<void>({
      url: USER_ENDPOINT.POST_USER_STATUS,
      params: { status },
    });
  },
};
