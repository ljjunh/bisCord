import { GetFriendsDTO } from './dto';
import { friendService } from './service';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { queryOptions } from '@tanstack/react-query';

export const friendQuery = {
  getFriends: (params: GetFriendsDTO) =>
    queryOptions({
      queryKey: QUERY_KEYS.friend.list(params),
      queryFn: () => friendService.getFriends(params),
    }),
};
