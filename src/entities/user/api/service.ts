import type { User } from '../model/types';
import type { GetUserResponseDTO, GetUsersDTO, GetUsersResponseDTO } from './dto';
import { apiClient } from '@/shared/api/apiClient';
import { USER_ENDPOINT } from '@/shared/constants/apiEndpoints';
import { mapUserResponseDTOToUser } from './mappers';

export const userService = {
  getUser: async (): Promise<User> => {
    const response = await apiClient.get<GetUserResponseDTO>({ url: USER_ENDPOINT.GET_USER });

    return mapUserResponseDTOToUser(response.data);
  },
  getUsers: async ({ keyword, page = 1, size = 10 }: GetUsersDTO): Promise<GetUsersResponseDTO> => {
    const response = await apiClient.get<GetUsersResponseDTO>({
      url: USER_ENDPOINT.GET_USERS,
      params: {
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },
};
