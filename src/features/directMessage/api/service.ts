import type { GetDMUsersDTO, GetDMUsersResponseDTO } from './dto';
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
};
