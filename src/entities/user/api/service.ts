import type { User } from '../model/types';
import type { GetUserResponseDTO, GetUsersDTO, GetUsersResponseDTO } from './dto';
import { mapUserResponseDTOToUser } from './mappers';
import { apiClient } from '@/shared/api/apiClient';

export const userService = {
  getUser: async (): Promise<User> => {
    const response = await apiClient.get<GetUserResponseDTO>({ url: '/user' });

    return mapUserResponseDTOToUser(response.data);
  },
  getUsers: async ({ keyword, page = 1, size = 10 }: GetUsersDTO): Promise<GetUsersResponseDTO> => {
    const response = await apiClient.get<GetUsersResponseDTO>({
      url: '/user/users',
      params: {
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },
};
