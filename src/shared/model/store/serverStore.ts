import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Channel {
  channelId: number;
}

interface Server {
  serverUri: string;
  channels: Channel[];
}

interface ServerState {
  servers: Server[];
  addServer: (uri: string) => void;
  addChannel: (uri: string, channelId: number) => void;
}

export const serverStore = create<ServerState>()(
  persist(
    (set) => ({
      servers: [],

      addServer: (uri) =>
        set((state) => {
          // 서버가 이미 있는지 확인
          const existingServer = state.servers.find((server) => server.serverUri === uri);
          if (existingServer) return state; // 중복 추가 방지

          return {
            servers: [...state.servers, { serverUri: uri, channels: [] }],
          };
        }),

      addChannel: (uri, channelId) =>
        set((state) => {
          return {
            servers: state.servers.map((server) =>
              server.serverUri === uri
                ? { ...server, channels: [...server.channels, { channelId }] }
                : server,
            ),
          };
        }),
    }),
    { name: 'server-storage' },
  ),
);
