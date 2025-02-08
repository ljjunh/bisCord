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
import { DIRECT_MESSAGE_ENDPOINT } from '@/shared/constants/apiEndpoints';

export const DMService = {
  getDM: async ({ otherUserId, page = 1, size = 12 }: GetDMDTO) => {
    const response = await apiClient.get<GetDMResponseDTO>({
      url: DIRECT_MESSAGE_ENDPOINT.GET_DM(otherUserId),
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  postDM: async ({ recipientId, content }: PostDMDTO): Promise<void> => {
    await apiClient.post<void>({
      url: DIRECT_MESSAGE_ENDPOINT.POST_DM(recipientId),
      data: { content },
    });
  },

  deleteDM: async ({ recipientId, chatId }: DeleteDMDTO): Promise<void> => {
    await apiClient.delete<void>({
      url: DIRECT_MESSAGE_ENDPOINT.DELETE_DM(recipientId, chatId),
    });
  },

  patchDM: async ({ recipientId, chatId, content }: PatchDMDTO): Promise<void> => {
    await apiClient.patch<void>({
      url: DIRECT_MESSAGE_ENDPOINT.PATCH_DM(recipientId, chatId),
      data: { content },
    });
  },

  getDMRooms: async ({ page = 1, size = 10 }: GetDMRoomsDTO) => {
    const response = await apiClient.get<GetDMRoomsResponseDTO>({
      url: DIRECT_MESSAGE_ENDPOINT.GET_DM_ROOMS,
      params: {
        page,
        size,
      },
    });

    return response.data;
  },

  deleteDMRoom: async ({ recipientId }: DeleteDMRoomDTO): Promise<void> => {
    await apiClient.delete<void>({
      url: DIRECT_MESSAGE_ENDPOINT.DELETE_DM_ROOM(recipientId),
    });
  },

  postDMRoom: async ({ recipientId }: PostDMRoomDTO): Promise<void> => {
    await apiClient.post<void>({
      url: DIRECT_MESSAGE_ENDPOINT.POST_DM_ROOM(recipientId),
    });
  },
};
