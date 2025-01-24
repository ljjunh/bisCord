import { Channel, ChannelDTO, ChannelMemberDTO, Servers, ServersDTO } from '../model/types';
import { apiClient } from '@/shared/api/apiClient';

// 여기 엔티티

export const serverService = {
  /** 전체 서버 목록을 가져옵니다 */
  getServers: async (): Promise<ServersDTO> => {
    const response = await apiClient.get<ServersDTO>({ url: '/user/servers?page=1&size=100' });

    return response.data;
  },
  /** 서버를 추가합니다 */
  createServer: async (serverData: {
    name: string;
    // serverUri: string;
    serverImageURL?: string;
  }): Promise<Servers> => {
    const response = await apiClient.post<Servers>({
      url: '/server',
      data: serverData, // 요청 본문에 데이터를 포함
    });

    return response.data;
  },

  // params에 맞는 해당 서버 정보를 불러옵니다
  thisServer: async ({ serverUri }: { serverUri: string }): Promise<Servers> => {
    const response = await apiClient.get<Servers>({ url: `/server/${serverUri}` });

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

  // 해당 서버를 삭제합니다
  deleteServer: async (serverUri: string): Promise<Servers> => {
    const response = await apiClient.delete<Servers>({ url: `/server/${serverUri}` });

    return response.data;
  },

  // 유저 관련
  getChannelMembers: async ({
    serverUri,
    channelId,
  }: {
    serverUri: string;
    channelId: string;
  }): Promise<ChannelMemberDTO[]> => {
    const response = await apiClient.get<ChannelMemberDTO[]>({
      url: `/server/${serverUri}/channel/${channelId}/channel-user`,
    });

    return response.data;
  },
};
