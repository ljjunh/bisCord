import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { WebSocketMessage } from '../model/types';
import { useAuthStore } from '../model/authStore';
import { useChatStore } from '../model/chatStore';
import { queryClient } from '../api/queryClient';
import { QUERY_KEYS } from '../api/queryKeys';

export const useWebSocket = () => {
  const client = useRef<Client | null>(null);

  const token = useAuthStore((state) => state.accessToken);

  const userId = useAuthStore((state) => state.user?.id);

  const handleMessage = useChatStore.getState().handleMessage;

  const handleWebSocketMessage = (wsMessage: WebSocketMessage) => {
    const { operation, data } = wsMessage;
    const otherUserId = data.userId === userId ? data.recipientId : data.userId;

    switch (operation) {
      case 'SEND': {
        handleMessage(wsMessage);
        return;
      }

      case 'UPDATE':
      case 'DELETE': {
        const messages = useChatStore.getState().messages;
        const isInStore = messages[otherUserId]?.some((msg) => msg.chatId === data.chatId);

        if (isInStore) {
          useChatStore.getState().handleMessage(wsMessage);
          return;
        }

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.directMessage.detail({ otherUserId }),
        });
        return;
      }

      default: {
        console.warn('Unknown operation type:', operation);
        return;
      }
    }
  };

  useEffect(() => {
    if (!token || !userId) return;

    if (client.current?.activate) return;

    const stompClient = new Client({
      brokerURL: 'wss://kdt-pt-1-pj-1-team06.elicecoding.com/api/ws',
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        stompClient.subscribe(`/queue/user/${userId}`, (message) => {
          try {
            const wsMessage = JSON.parse(message.body) as WebSocketMessage;
            console.log('메시지임', wsMessage);
            if (wsMessage.type === 'DM') {
              handleWebSocketMessage(wsMessage);
            }
          } catch (error) {
            console.error('DM 메시지 파싱 에러:', error);
          }
        });

        client.current = stompClient;
      },

      onStompError: (error) => {
        console.log('STOMP 에러:', error);
      },
    });

    stompClient.activate();

    return () => {
      if (client.current?.active) {
        client.current.deactivate();
      }
    };
  }, [token, userId, handleMessage]);

  return client.current;
};
