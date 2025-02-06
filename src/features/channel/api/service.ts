import {
  DeleteCHMessage,
  EditMessage,
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

  deleteMessage: async ({ channelId, chatId }: DeleteCHMessage) => {
    await apiClient.delete<void>({
      url: `/chat/channel/${channelId}`,
      data: { chatId },
    });
  },
  editMessage: async ({ channelId, chatId, content }: EditMessage): Promise<void> => {
    await apiClient.patch<void>({
      url: `/chat/channel/${channelId}`,
      data: {
        chatId,
        content,
      },
    });
  },
};
