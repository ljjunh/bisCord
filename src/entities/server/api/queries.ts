import { serverService } from './getServer';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { queryOptions } from '@tanstack/react-query';

export const serverQueries = {
  getServerInfo: () =>
    queryOptions({
      queryKey: [QUERY_KEYS.user.detail()],
      queryFn: serverService.getServer,
    }),
};
