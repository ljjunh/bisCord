import { GetChMessageDTO, GetChMessageResponse } from './dto';
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
        channelId,
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },
};
