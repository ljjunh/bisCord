import type { GetUsersDTO } from './dto';
import { userService } from './service';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const userQueries = {
  getUser: () =>
    queryOptions({
      queryKey: QUERY_KEYS.user.detail(),
      queryFn: userService.getUser,
    }),
  getUsers: (params: GetUsersDTO) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEYS.user.list(params),
      queryFn: ({ pageParam = 1 }) => userService.getUsers({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return lastPage.pageInfo.currentPage + 1;
        }
        return undefined;
      },
    }),
};
