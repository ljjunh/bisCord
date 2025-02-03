import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '../model/authStore';
import { queryClient } from '../api/queryClient';
import { QUERY_KEYS } from '../api/queryKeys';

export const useWebSocket = () => {
  const client = useRef<Client | null>(null);

  const token = useAuthStore((state) => state.accessToken);

  const userId = useAuthStore((state) => state.user?.id);

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
            const { type, data } = JSON.parse(message.body);
            const temp = JSON.parse(message.body);
            console.log('메시지', temp);
            // console.log('DM 타입', type);
            // console.log('DM 수신:', data);
            if (type === 'DM') {
              queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.directMessage.detail({ otherUserId: data.userId }),
              });
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
  }, [token, userId]);

  return client.current;
};
