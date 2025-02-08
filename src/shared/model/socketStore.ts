import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import type { WebSocketMessage } from '../model/types';
import { SocketService } from '../api/socketService';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface SocketState {
  socketClient: Client | null;
  status: ConnectionStatus;
  error: Error | null;
  connect: (token: string, userId: number) => void;
  disconnect: () => void;
  getClient: () => Client | null;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socketClient: null,
  status: 'disconnected',
  error: null,

  connect: (token: string, userId: number) => {
    if (['connecting', 'connected'].includes(get().status)) {
      return;
    }

    set({ status: 'connecting', error: null });

    const socketClient = new Client({
      brokerURL: import.meta.env.WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        set({
          socketClient,
          status: 'connected',
          error: null,
        });

        socketClient.subscribe(`/queue/user/${userId}`, (message) => {
          try {
            const wsMessage = JSON.parse(message.body) as WebSocketMessage;
            console.log('수신', wsMessage);

            if (['CALL_OFFER', 'CALL_ANSWER', 'CALL_ICE', 'CALL_END'].includes(wsMessage.type)) {
              SocketService.handleWebRTC(wsMessage);
            }

            if (wsMessage.type === 'DM') {
              SocketService.handleDM(wsMessage);
            }
          } catch (error) {
            console.error('메시지 파싱 에러:', error);
            set({ error: error as Error });
          }
        });
      },

      onDisconnect: () => {
        console.log('소켓 연결 종료');
        set({
          status: 'disconnected',
          error: null,
        });
      },

      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
        set({
          status: 'disconnected',
          error: new Error(frame.headers.message || 'WebSocket connection failed'),
        });
      },
    });

    try {
      socketClient.activate();
      set({ socketClient });
    } catch (error) {
      console.error('Failed to activate WebSocket:', error);
      set({
        status: 'disconnected',
        error: error as Error,
      });
    }
  },

  disconnect: () => {
    const { socketClient } = get();

    if (socketClient?.active) {
      socketClient.deactivate();
    }

    set({
      socketClient: null,
      status: 'disconnected',
      error: null,
    });
  },

  getClient: () => get().socketClient,
}));
