import type {
  GetFriendsDTO,
  GetFriendsResponseDTO,
  PostFriendAcceptDTO,
  PostFriendDeclineDTO,
  PostFriendRequestDTO,
} from './dto';
import { apiClient } from '@/shared/api/apiClient';
import { FRIEND_ENDPOINT } from '@/shared/constants/apiEndpoints';

export const friendService = {
  getFriends: async ({
    type,
    status,
    keyword,
    page = 1,
    size = 10,
  }: GetFriendsDTO): Promise<GetFriendsResponseDTO> => {
    const response = await apiClient.get<GetFriendsResponseDTO>({
      url: FRIEND_ENDPOINT.GET_FRIENDS,
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
      url: FRIEND_ENDPOINT.POST_FRIEND_REQUEST(invitedUserId),
    });
  },
  postFriendAccept: async ({ invitingUserId }: PostFriendAcceptDTO): Promise<void> => {
    await apiClient.post<void>({
      url: FRIEND_ENDPOINT.POST_FRIEND_ACCEPT(invitingUserId),
    });
  },
  postFriendDecline: async ({ userId }: PostFriendDeclineDTO): Promise<void> => {
    await apiClient.post<void>({
      url: FRIEND_ENDPOINT.POST_FRIEND_DECLINE(userId),
    });
  },
};
