import { queryOptions } from '@tanstack/react-query';
import type { GetOtherUserDTO } from './dto';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { userService } from './service';

export const userQueries = {
  getOtherUser: ({ userId }: GetOtherUserDTO) =>
    queryOptions({
      queryKey: QUERY_KEYS.user.members(userId),
      queryFn: () => userService.getOtherUser({ userId }),
    }),

  putUserProfile: {
    mutationFn: userService.putUserProfile,
  },
  postUserStatus: {
    mutationFn: userService.postUserStatus,
  },
};
