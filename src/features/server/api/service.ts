import type {
  Channel,
  ChannelDTO,
  DeleteChannel,
  GetImageUrlDTO,
  GetImageUrlResponseDTO,
  GetmemberDTO,
  InviteServer,
  JoinServer,
  MemberDTO,
  PostDMDTO,
  PostDMRoomDTO,
  PostImageDTO,
  PostImageResponseDTO,
  PostInviteServer,
  PutImageToS3DTO,
  Servers,
  ServersDTO,
} from '../model/types';
import { apiClient } from '@/shared/api/apiClient';
import { SERVER_ENDPOINT } from '@/shared/model/constants/apiEndpoints';

export const serverService = {
  getServers: async (): Promise<ServersDTO> => {
    const response = await apiClient.get<ServersDTO>({ url: SERVER_ENDPOINT.GET_SERVERS });

    return response.data;
  },

  createServer: async (serverData: {
    name: string;
    serverImageURL: string | File;
  }): Promise<Servers> => {
    let profileImageURL = serverData.serverImageURL;

    if (serverData.serverImageURL instanceof File) {
      const imageData = await serverService.postImage({
        fileName: serverData.serverImageURL.name,
        contentType: serverData.serverImageURL.type,
        contentLength: serverData.serverImageURL.size,
      });
      await serverService.putImageToS3({
        presignedUrl: imageData.presignedUrl,
        file: serverData.serverImageURL,
      });
      const { imageUrl } = await serverService.getImageUrl({
        key: imageData.key,
      });
      profileImageURL = imageUrl;
    }

    const response = await apiClient.post<Servers>({
      url: SERVER_ENDPOINT.CREATE_SERVER,
      data: {
        name: serverData.name,
        serverImageURL: profileImageURL,
      },
    });

    return response.data;
  },

  // params에 맞는 해당 서버 정보를 불러옵니다
  thisServer: async ({ serverUri }: { serverUri: string }): Promise<Servers> => {
    const response = await apiClient.get<Servers>({ url: SERVER_ENDPOINT.GET_SERVER(serverUri) });

    return response.data;
  },

  // 해당 서버의 채널을 불러옵니다
  thisChannel: async ({ serverUri }: { serverUri: string }): Promise<ChannelDTO> => {
    const response = await apiClient.get<ChannelDTO>({
      url: SERVER_ENDPOINT.GET_CHANNELS(serverUri),
    });

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
      url: SERVER_ENDPOINT.CREATE_CHANNEL(data.serverUri),
      data: {
        name: data.name,
        type: data.type,
        roleId: data.roleId,
      },
    });

    return response.data;
  },

  // 서버 정보를 수정합니다
  putServerProfile: async (serverData: {
    name: string;
    serverUri: string;
    serverImageURL: string | File;
  }): Promise<Servers> => {
    let profileImageURL = serverData.serverImageURL;

    // 이미지 파일이 있을 경우
    if (serverData.serverImageURL instanceof File) {
      // 이미지 데이터 업로드
      const imageData = await serverService.postImage({
        fileName: serverData.serverImageURL.name,
        contentType: serverData.serverImageURL.type,
        contentLength: serverData.serverImageURL.size,
      });

      // 이미지 S3 업로드
      await serverService.putImageToS3({
        presignedUrl: imageData.presignedUrl,
        file: serverData.serverImageURL,
      });

      // 업로드된 이미지 URL 가져오기
      const { imageUrl } = await serverService.getImageUrl({
        key: imageData.key,
      });

      profileImageURL = imageUrl; // 업데이트된 이미지 URL을 사용
    }

    // 서버 프로필 정보 수정
    const updatedServer = await apiClient.put<Servers>({
      url: SERVER_ENDPOINT.UPDATE_SERVER(serverData.serverUri), // serverUri를 URL에 포함
      data: {
        name: serverData.name,
        serverImageURL: typeof profileImageURL === 'string' ? profileImageURL : '', // 문자열로 변환
      },
    });

    return updatedServer.data;
  },

  // 해당 서버를 삭제합니다
  deleteServer: async (serverUri: string): Promise<Servers> => {
    const response = await apiClient.delete<Servers>({
      url: SERVER_ENDPOINT.DELETE_SERVER(serverUri),
    });

    return response.data;
  },
  deleteChannel: async (channelId: number): Promise<DeleteChannel> => {
    const response = await apiClient.delete<DeleteChannel>({
      url: SERVER_ENDPOINT.DELETE_CHANNEL(channelId),
    });

    return response.data;
  },

  // 유저 관련
  getServerMembers: async ({
    serverUri,
    roleId,
    keyword,
    page = 1,
    size = 10,
  }: GetmemberDTO): Promise<MemberDTO> => {
    const response = await apiClient.get<MemberDTO>({
      url: SERVER_ENDPOINT.GET_SERVER_MEMBERS(serverUri),
      params: {
        serverUri,
        roleId,
        keyword,
        page,
        size,
      },
    });

    return response.data;
  },

  //  해당 서버 초대코드 생성
  postInviteServer: async ({ serverUri }: PostInviteServer): Promise<InviteServer> => {
    const response = await apiClient.post<InviteServer>({
      url: SERVER_ENDPOINT.POST_INVITE_SERVER(serverUri),
    });

    return response.data;
  },
  // 초대 코드로 서버 가입
  postJoinServer: async ({ inviteKey }: JoinServer) => {
    const response = await apiClient.post<JoinServer>({
      url: SERVER_ENDPOINT.POST_JOIN_SERVER(inviteKey),
    });

    return response.data;
  },

  postImage: async (data: PostImageDTO): Promise<PostImageResponseDTO> => {
    const response = await apiClient.post<PostImageResponseDTO>({
      url: SERVER_ENDPOINT.POST_IMAGE,
      data,
    });

    return response.data;
  },

  putImageToS3: async ({ presignedUrl, file }: PutImageToS3DTO): Promise<void> => {
    await apiClient.putS3(presignedUrl, file);
  },

  getImageUrl: async ({ key }: GetImageUrlDTO): Promise<GetImageUrlResponseDTO> => {
    const response = await apiClient.get<GetImageUrlResponseDTO>({
      url: SERVER_ENDPOINT.GET_IMAGE_URL,
      params: {
        key,
      },
    });

    return response.data;
  },
  postDM: async ({ recipientId, content }: PostDMDTO): Promise<void> => {
    await apiClient.post<void>({
      url: SERVER_ENDPOINT.POST_DM(recipientId),
      data: { content },
    });
  },
  postDMRoom: async ({ recipientId }: PostDMRoomDTO): Promise<void> => {
    await apiClient.post<void>({
      url: SERVER_ENDPOINT.POST_DM_ROOM(recipientId),
    });
  },
};
