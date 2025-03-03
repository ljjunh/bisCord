import { infiniteQueryOptions } from '@tanstack/react-query';
import type { GetDMDTO, GetDMRoomsDTO } from './dto';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { DMService } from './service';

export const DMQueries = {
  getDMRooms: (params: GetDMRoomsDTO) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEYS.directMessage.members(),
      queryFn: ({ pageParam = 1 }) => DMService.getDMRooms({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return lastPage.pageInfo.currentPage + 1;
        }
        return undefined;
      },
    }),

  getDM: (params: GetDMDTO) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEYS.directMessage.detail(params),
      queryFn: ({ pageParam = 1 }) => DMService.getDM({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.chats.pageInfo.hasNextPage) {
          return lastPage.chats.pageInfo.currentPage + 1;
        }
        return undefined;
      },
    }),

  postDM: {
    mutationFn: DMService.postDM,
  },
  deleteDM: {
    mutationFn: DMService.deleteDM,
  },
  patchDM: {
    mutationFn: DMService.patchDM,
  },
  deleteDMRoom: {
    mutationFn: DMService.deleteDMRoom,
  },
  postDMRoom: {
    mutationFn: DMService.postDMRoom,
  },
};
