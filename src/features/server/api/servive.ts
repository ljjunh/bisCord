import {
  Channel,
  ChannelDTO,
  GetImageUrlDTO,
  GetImageUrlResponseDTO,
  GetmemberDTO,
  InviteServer,
  MemberDTO,
  PostImageDTO,
  PostImageResponseDTO,
  PostInviteServer,
  PutImageToS3DTO,
  Servers,
  ServersDTO,
} from '../model/types';
// import { userService } from '@/features/user/api/service';
import { apiClient } from '@/shared/api/apiClient';

// 여기 엔티티

export const serverService = {
  /** 전체 서버 목록을 가져옵니다 */
  getServers: async (): Promise<ServersDTO> => {
    const response = await apiClient.get<ServersDTO>({ url: '/user/servers?page=1&size=100' });

    return response.data;
  },

  // 서버를 추가할때 이미지가 File인 경우에만 s3업로드 실행
  /** 서버를 추가합니다 */
  createServer: async (serverData: {
    name: string;
    // serverUri: string;
    serverImageURL: string | File;
  }): Promise<Servers> => {
    let profileImageURL = serverData.serverImageURL;

    if (serverData.serverImageURL instanceof File) {
      const imageData = await serverService.postImage({
        fileName: serverData.serverImageURL.name,
        contentType: serverData.serverImageURL.type,
        contentLength: serverData.serverImageURL.size,
      });
      console.log(imageData);
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
      url: '/server',
      data: {
        name: serverData.name,
        serverImageURL: profileImageURL,
      }, // 요청 본문에 데이터를 포함
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
  getServerMembers: async ({
    serverUri,
    roleId,
    keyword,
    page = 1,
    size = 10,
  }: GetmemberDTO): Promise<MemberDTO> => {
    const response = await apiClient.get<MemberDTO>({
      url: `/server/${serverUri}/server-user`,
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
      url: `/server/${serverUri}/invite`,
    });

    return response.data;
  },

  /** ㅇ
   * 이미지 관련
   */
  postImage: async (data: PostImageDTO): Promise<PostImageResponseDTO> => {
    const response = await apiClient.post<PostImageResponseDTO>({ url: '/image', data });

    return response.data;
  },

  putImageToS3: async ({ presignedUrl, file }: PutImageToS3DTO): Promise<void> => {
    await apiClient.putS3(presignedUrl, file);
  },

  getImageUrl: async ({ key }: GetImageUrlDTO): Promise<GetImageUrlResponseDTO> => {
    const response = await apiClient.get<GetImageUrlResponseDTO>({
      url: '/image',
      params: {
        key,
      },
    });

    return response.data;
  },
};
