import type {
  DeleteDMDTO,
  DeleteDMRoomDTO,
  GetDMDTO,
  GetDMResponseDTO,
  GetDMRoomsDTO,
  GetDMRoomsResponseDTO,
  PatchDMDTO,
  PostDMDTO,
} from './dto';
import { apiClient } from '@/shared/api/apiClient';

export const DMService = {
  getDMUsers: async ({ page = 1, size = 10 }: GetDMRoomsDTO) => {
    const response = await apiClient.get<GetDMRoomsResponseDTO>({
      url: '/dm',
      params: {
        page,
        size,
      },
    });

    return response.data;
  },
  getDM: async ({ otherUserId, page = 1, size = 12 }: GetDMDTO) => {
    const response = await apiClient.get<GetDMResponseDTO>({
      url: `/chat/dm/${otherUserId}`,
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  postDM: async ({ recipientId, content }: PostDMDTO): Promise<void> => {
    await apiClient.post<void>({
      url: `/chat/dm/${recipientId}`,
      data: { content },
    });
  },

  deleteDM: async ({ recipientId, chatId }: DeleteDMDTO): Promise<void> => {
    await apiClient.delete<void>({
      url: `chat/dm/${recipientId}`,
      data: { chatId },
    });
  },

  patchDM: async ({ recipientId, chatId, content }: PatchDMDTO): Promise<void> => {
    await apiClient.patch<void>({
      url: `chat/dm/${recipientId}`,
      data: { chatId, content },
    });
  },

  deleteDMRoom: async ({ recipientId }: DeleteDMRoomDTO): Promise<void> => {
    await apiClient.delete<void>({
      url: `/dm/${recipientId}`,
    });
  },
};
