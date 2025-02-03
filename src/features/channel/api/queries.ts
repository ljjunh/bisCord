import { infiniteQueryOptions } from '@tanstack/react-query';
import { GetChMessageDTO, PostSendMessageRequest } from './dto';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { channelService } from './service';

export const channelQueries = {
  getCHMessages: (params: GetChMessageDTO) =>
    infiniteQueryOptions({
      queryKey: QUERY_KEYS.channel.messages(params.channelId),
      queryFn: ({ pageParam = 1 }) =>
        channelService.getAllMessage({ ...params, page: pageParam, size: 20 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.chats.pageInfo?.hasNextPage
          ? lastPage.chats.pageInfo.currentPage + 1
          : undefined;
      },
    }),

  postCHSendMessage: {
    mutationFn: (data: PostSendMessageRequest) => channelService.postSendMessage(data),
  },
  deleteCHMessage: {
    mutationFn: channelService.deleteMessage,
  },
  editCHMessage: {
    mutationFn: channelService.editMessage,
  },
};
