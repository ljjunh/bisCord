import { Server } from './types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IServerStore {
  servers: Server[];
  addServer: (server: Server) => void;
  removeServer: (serverId: string) => void;
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
          servers: state.servers.filter((server) => server.id !== serverId),
        })),
    }),
    {
      name: 'server-storage', // 로컬스토리지 키
    },
  ),
);
