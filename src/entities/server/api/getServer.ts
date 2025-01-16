import { IServer } from '../model/types';
import { IServerResponse } from './serverResponse';
import { apiClient } from '@/shared/api/apiClient';

export const serverService = {
  getServer: async (): Promise<IServer> => {
    const response = await apiClient.get<IServerResponse>({ url: '/server' });

    return response.data;
  },
};
