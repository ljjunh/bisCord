import { IServers } from '../model/types';
import { apiClient } from '@/shared/api/apiClient';

// 여기 엔티티

interface ServersDTO {
  name: string;
  serverUri: string;
  serverImageURL: string;
}

export const serverService = {
  getServer: async (): Promise<IServers[]> => {
    const response = await apiClient.get<ServersDTO[]>({ url: '/user/servers' });

    return response.data;
  },
  addServer: async (serverData: {
    name: string;
    serverUri: string;
    serverImageURL?: string;
  }): Promise<IServers> => {
    const response = await apiClient.post<ServersDTO>({
      url: '/server',
      data: serverData, // 요청 본문에 데이터를 포함
    });

    return response.data;
  },
};
