import type { GetFriendsDTO } from './dto';
import { friendService } from './service';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { infiniteQueryOptions } from '@tanstack/react-query';

export const friendQuery = {
  getFriends: (params: GetFriendsDTO) =>
    // 첫 쿼리 실행시 pageParam은 initialPageParam에 설정한 값(1)을 사용
    // queryFn이 이 값으로 첫 페이지 요청
    // 호출부에서 fetchNextPage() 호출 시 getNextPageParam이 실행되서
    // 백엔드 응답값인 currentPage에 +1을 반환
    // tanstackQuery가 다음 queryFn 호출의 pageParam으로 전달
    infiniteQueryOptions({
      queryKey: QUERY_KEYS.friend.list(params),
      queryFn: ({ pageParam = 1 }) => friendService.getFriends({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.hasNextPage) {
          return lastPage.pageInfo.currentPage + 1;
        }
        return undefined;
      },
    }),
};
