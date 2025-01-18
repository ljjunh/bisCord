import { userService } from './service';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { queryOptions } from '@tanstack/react-query';

export const userQueries = {
  getUserInfo: () =>
    queryOptions({
      queryKey: QUERY_KEYS.user.detail(),
      queryFn: userService.getUser,
    }),
};
