import { GetFriendsDTO, GetFriendsResponseDTO } from './dto';
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
    // TODO: 데이터 이상한게 너무 많이옴 글고 또 바뀔듯 그냥 매퍼를 쓰자

    return response.data;
  },
};
