import { Channel, Server } from './types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IServerStore {
  servers: Server[];
  addServer: (server: Server) => void;
  removeServer: (serverId: string) => void;
  addChannel: (serverId: string, channel: Channel) => void; // 채널 추가 메서드
}

export const useServerStore = create<IServerStore>()(
  persist(
    (set) => ({
      servers: [],

      // 서버 추가
      addServer: (server) =>
        set((state) => ({
          servers: [...state.servers, server],
        })),

      // 서버 삭제
      removeServer: (serverId) =>
        set((state) => ({
          servers: state.servers.filter((server) => server.serverUri !== serverId),
        })),

      // 채널 생성
      addChannel: (serverId, channel) =>
        set((state) => ({
          servers: state.servers.map((server) =>
            server.serverUri === serverId
              ? { ...server, serverChannelList: [...server.serverChannelList, channel] }
              : server,
          ),
        })),
    }),
    {
      name: 'server-storage', // 로컬스토리지 키
    },
  ),
);
