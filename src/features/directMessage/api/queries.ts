import { infiniteQueryOptions } from '@tanstack/react-query';
import type { GetDMUsersDTO } from './dto';
import { DMService } from './service';

export const DMQueries = {
  getDMUsers: (params: GetDMUsersDTO) =>
    infiniteQueryOptions({
      queryKey: ['temp'],
      queryFn: ({ pageParam = 1 }) => DMService.getDMUsers({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return lastPage.pageInfo.currentPage + 1;
        }
        return undefined;
      },
    }),
};
