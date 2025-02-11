import type {
  DeleteCHMessage,
  EditMessage,
  GetChMessageDTO,
  GetChMessageResponse,
  PostSendMessageRequest,
  PostSendMessageResponse,
} from './dto';
import { apiClient } from '@/shared/api/apiClient';
import { CHANNEL_ENDPOINT } from '@/shared/model/constants/apiEndpoints';

export const channelService = {
  getAllMessage: async ({
    channelId,
    keyword,
    page,
    size,
  }: GetChMessageDTO): Promise<GetChMessageResponse> => {
    const response = await apiClient.get<GetChMessageResponse>({
      url: CHANNEL_ENDPOINT.GET_ALL_MESSAGE(channelId),
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
      url: CHANNEL_ENDPOINT.POST_SEND_MESSAGE(channelId),
      data: {
        content,
      },
    });

    return response.data;
  },

  deleteMessage: async ({ channelId, chatId }: DeleteCHMessage) => {
    await apiClient.delete<void>({
      url: CHANNEL_ENDPOINT.DELETE_MESSAGE(channelId),
      data: { chatId },
    });
  },
  editMessage: async ({ channelId, chatId, content }: EditMessage): Promise<void> => {
    await apiClient.patch<void>({
      url: CHANNEL_ENDPOINT.EDIT_MESSAGE(channelId),
      data: {
        chatId,
        content,
      },
    });
  },
};
