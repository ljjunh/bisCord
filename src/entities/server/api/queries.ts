import { queryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { serverService } from './servive';

// 여기더 엔티티
export const serverQueries = {
  getServers: queryOptions({
    queryKey: QUERY_KEYS.server.list(),
    queryFn: serverService.getServers,
  }),
  getServerDetail: (serverUri: string) =>
    queryOptions({
      queryKey: QUERY_KEYS.server.detail(serverUri), // 특정 서버에 대한 고유 쿼리 키
      queryFn: () => serverService.thisServer({ serverUri }), // 서버 데이터 조회 함수
      enabled: !!serverUri, // serverUri가 있을 때만 실행
    }),

  getChannels: (serverUri: string) =>
    queryOptions({
      queryKey: QUERY_KEYS.channel.detail(serverUri),
      queryFn: () => serverService.thisChannel({ serverUri }),
      enabled: !!serverUri,
    }),

  // 생성 관련 api
  postCreateServer: {
    mutationFn: serverService.createServer,
  },
  postCreateChannel: {
    mutationFn: serverService.createChannel,
  },

  // 삭제 관련 api
  deleteServer: {
    mutationFn: serverService.deleteServer,
  },
};
