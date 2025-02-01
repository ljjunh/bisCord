import type { GetDMDTO, GetDMResponseDTO, GetDMUsersDTO, GetDMUsersResponseDTO } from './dto';
import { apiClient } from '@/shared/api/apiClient';

export const DMService = {
  getDMUsers: async ({ page = 1, size = 10 }: GetDMUsersDTO) => {
    const response = await apiClient.get<GetDMUsersResponseDTO>({
      url: '/dm',
      params: {
        page,
        size,
      },
    });

    return response.data;
  },
  getDM: async ({ otherUserId, page = 1, size = 10 }: GetDMDTO) => {
    const response = await apiClient.get<GetDMResponseDTO>({
      url: `/chat/dm/${otherUserId}`,
      params: {
        page,
        size,
      },
    });

    return response.data;
  },
};
