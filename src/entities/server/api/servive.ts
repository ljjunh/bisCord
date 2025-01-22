import { Channel, ChannelDTO, IServers, ServersDTO } from '../model/types';
import { apiClient } from '@/shared/api/apiClient';

// 여기 엔티티

export const serverService = {
  /** 전체 서버 목록을 가져옵니다 */
  getServers: async (): Promise<ServersDTO> => {
    const response = await apiClient.get<ServersDTO>({ url: '/user/servers?page=1&size=100' });

    return response.data;
  },
  /** 서버를 추가합니다 */
  addServer: async (serverData: {
    name: string;
    serverUri: string;
    serverImageURL?: string;
  }): Promise<ServersDTO> => {
    const response = await apiClient.post<ServersDTO>({
      url: '/server',
      data: serverData, // 요청 본문에 데이터를 포함
    });

    return response.data;
  },
  // params에 맞는 해당 서버 정보를 불러옵니다
  thisServer: async ({ serverUri }: { serverUri: string }): Promise<IServers> => {
    const response = await apiClient.get<IServers>({ url: `/server/${serverUri}` });

    return response.data;
  },

  // 해당 서버의 채널을 불러옵니다
  thisChannel: async ({ serverUri }: { serverUri: string }): Promise<ChannelDTO> => {
    const response = await apiClient.get<ChannelDTO>({ url: `/server/${serverUri}/channel` });

    return response.data;
  },

  // 해당 서버에 채널을 추가합니다
  createChannel: async (data: {
    serverUri: string;
    name: string;
    type: 'TEXT' | 'VOICE';
    roleId: number;
  }): Promise<Channel> => {
    const response = await apiClient.post<Channel>({
      url: `/server/${data.serverUri}/channel`,
      data: {
        name: data.name,
        type: data.type,
        roleId: data.roleId,
      },
    });

    return response.data;
  },
};
