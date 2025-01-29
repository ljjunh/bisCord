import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuthStore } from '../model/authStore';

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
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: (frame) => {
        console.log('STOMP 연결 성공', frame);

        stompClient.subscribe(`/queue/user/${userId}`, (message) => {
          console.log('메시지 도착', message);
          try {
            const data = JSON.parse(message.body);
            console.log('DM 수신:', data);
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
