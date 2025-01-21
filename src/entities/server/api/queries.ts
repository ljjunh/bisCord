import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { serverService } from './servive';

// 여기더 엔티티
export const serverQueries = {
  getServerData: () =>
    queryOptions({
      queryKey: QUERY_KEYS.server.servers(),
      queryFn: serverService.getServer,
    }),
};
