import type { User } from '../model/types';
import type { GetUserResponseDTO, GetUsersDTO, GetUsersResponseDTO } from './dto';
import { apiClient } from '@/shared/api/apiClient';
import { mapUserResponseDTOToUser } from './mappers';

export const userService = {
  getUser: async (): Promise<User> => {
    const response = await apiClient.get<GetUserResponseDTO>({ url: '/user' });

    console.log('왜안옴?', response.data);

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
