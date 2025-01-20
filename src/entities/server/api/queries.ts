import { serverService } from './servive';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { queryOptions } from '@tanstack/react-query';

// 여기더 엔티티
export const serverQueries = {
  getServerData: () =>
    queryOptions({
      queryKey: QUERY_KEYS.server.servers(),
      queryFn: serverService.getServer,
    }),
};
