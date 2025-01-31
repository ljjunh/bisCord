import {
  GetChMessageDTO,
  GetChMessageResponse,
  PostSendMessageRequest,
  PostSendMessageResponse,
} from './dto';
import { apiClient } from '@/shared/api/apiClient';

export const channelService = {
  getAllMessage: async ({
    channelId,
    keyword,
    page,
    size,
  }: GetChMessageDTO): Promise<GetChMessageResponse> => {
    const response = await apiClient.get<GetChMessageResponse>({
      url: `/chat/channel/${channelId}`,
      params: {
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },

  postSendMessage: async ({
    channelId,
    content,
  }: PostSendMessageRequest): Promise<PostSendMessageResponse> => {
    const response = await apiClient.post<PostSendMessageResponse>({
      url: `/chat/channel/${channelId}`,
      data: {
        content,
      },
    });

    return response.data;
  },
};
