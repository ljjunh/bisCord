import type {
  GetFriendsDTO,
  GetFriendsResponseDTO,
  PostFriendAcceptDTO,
  PostFriendDeclineDTO,
  PostFriendRequestDTO,
} from './dto';
import { apiClient } from '@/shared/api/apiClient';

export const friendService = {
  getFriends: async ({
    type,
    status,
    keyword,
    page = 1,
    size = 10,
  }: GetFriendsDTO): Promise<GetFriendsResponseDTO> => {
    const response = await apiClient.get<GetFriendsResponseDTO>({
      url: '/user/friends',
      params: {
        type,
        status,
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },
  postFriendRequest: async ({ invitedUserId }: PostFriendRequestDTO): Promise<void> => {
    await apiClient.post<void>({
      url: `/friendship/${invitedUserId}`,
    });
  },
  postFriendAccept: async ({ invitingUserId }: PostFriendAcceptDTO): Promise<void> => {
    await apiClient.post<void>({
      url: `/friendship/${invitingUserId}/accept`,
    });
  },
  postFriendDecline: async ({ userId }: PostFriendDeclineDTO): Promise<void> => {
    await apiClient.post<void>({
      url: `/friendship/${userId}/decline`,
    });
  },
};
