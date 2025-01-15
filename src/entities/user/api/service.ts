import type { User } from '../model/types';
import type { UserResponseDTO } from './dto';
import { mapUserResponseDTOToUser } from './mappers';
import { apiClient } from '@/shared/api/apiClient';

export const userService = {
  getUser: async (): Promise<User> => {
    const response = await apiClient.get<UserResponseDTO>({ url: '/user' });

    return mapUserResponseDTOToUser(response.data);
  },
};
