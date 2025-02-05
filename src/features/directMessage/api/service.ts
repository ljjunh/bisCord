import type {
  DeleteDMDTO,
  DeleteDMRoomDTO,
  GetDMDTO,
  GetDMResponseDTO,
  GetDMRoomsDTO,
  GetDMRoomsResponseDTO,
  PatchDMDTO,
  PostDMDTO,
  PostDMRoomDTO,
} from './dto';
import { apiClient } from '@/shared/api/apiClient';

export const DMService = {
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
      url: `chat/dm/${recipientId}/chat/${chatId}`,
    });
  },

  patchDM: async ({ recipientId, chatId, content }: PatchDMDTO): Promise<void> => {
    await apiClient.patch<void>({
      url: `chat/dm/${recipientId}/chat/${chatId}`,
      data: { content },
    });
  },

  getDMRooms: async ({ page = 1, size = 10 }: GetDMRoomsDTO) => {
    const response = await apiClient.get<GetDMRoomsResponseDTO>({
      url: '/dm',
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  deleteDMRoom: async ({ recipientId }: DeleteDMRoomDTO): Promise<void> => {
    await apiClient.delete<void>({
      url: `/dm/${recipientId}`,
    });
  },

  postDMRoom: async ({ recipientId }: PostDMRoomDTO): Promise<void> => {
    await apiClient.post<void>({
      url: `/dm/${recipientId}`,
    });
  },
};
