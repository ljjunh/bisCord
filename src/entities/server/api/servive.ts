import { IServers } from '../model/types';
import { apiClient } from '@/shared/api/apiClient';

// 여기 엔티티

interface ServersDTO {
  name: string;
  serverUri: string;
  serverImageURL: string;
}

export const serverService = {
  getServer: async (): Promise<IServers> => {
    const response = await apiClient.get<ServersDTO>({ url: '/servers' });

    return response.data;
  },
};
