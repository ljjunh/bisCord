import { serverService } from './servive';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { queryOptions } from '@tanstack/react-query';

export const serverQueries = {
  getServerData: () => {
    queryOptions({
      queryKey: [QUERY_KEYS.server.detail()],
      queryFn: serverService.getServer,
    });
  },
};
