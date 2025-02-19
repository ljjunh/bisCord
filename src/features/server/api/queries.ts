import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import type { GetmemberDTO } from '../model/types';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { serverService } from './service';

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
    // 서버 생성
    mutationFn: serverService.createServer,
  },
  postCreateChannel: {
    // 채널 생성
    mutationFn: serverService.createChannel,
  },

  // 삭제 관련 api
  deleteServer: {
    mutationFn: serverService.deleteServer,
  },
  deleteChannel: {
    mutationFn: serverService.deleteChannel,
  },

  // 수정 관련
  putEditServer: {
    mutationFn: serverService.putServerProfile,
  },
  postDM: {
    mutationFn: serverService.postDM,
  },
  postDMRoom: {
    mutationFn: serverService.postDMRoom,
  },

  getMembers: (params: GetmemberDTO) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEYS.server.members(params.serverUri),
      queryFn: ({ pageParam = 1 }) =>
        serverService.getServerMembers({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return lastPage.pageInfo.currentPage + 1;
        }
        return undefined;
      },
    }),

  postInvite: (serverUri: string) =>
    queryOptions({
      queryKey: QUERY_KEYS.server.invite(serverUri),
      queryFn: () => serverService.postInviteServer({ serverUri }),
    }),

  postJoin: {
    mutationFn: serverService.postJoinServer,
  },
};
