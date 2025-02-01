import { ReactNode } from 'react';

interface CHMessageProps {
  children: ReactNode;
  channelId: number;
}

const ChMessage = ({ children }: CHMessageProps) => {
  // const client = useRef<Client | null>(null);
  // const token = useAuthStore((state) => state.accessToken);

  // const stompClient = new Client({
  //   brokerURL: 'wss://kdt-pt-1-pj-1-team06.elicecoding.com/api/ws',
  //   connectHeaders: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   debug: (str) => {
  //     console.log('STOMP Debug:', str);
  //   },
  //   onConnect: (frame) => {
  //     console.log('STOMP CH 연결 성공', frame);

  //     stompClient.subscribe(`/topic/channel/${channelId}`, (message) => {
  //       console.log('메시지 도착', message);
  //       try {
  //         const data = JSON.parse(message.body);
  //         console.log('CH 수신:', data);
  //       } catch (error) {
  //         console.error('CH 메시지 파싱 에러:', error);
  //       }
  //     });

  //     client.current = stompClient;
  //   },
  //   onStompError: (error) => {
  //     console.log('STOMP 에러:', error);
  //   },
  // });
  // stompClient.activate();
  // return () => {
  //   if (client.current?.active) {
  //     client.current.deactivate();
  //   }
  // };

  return (
    <div className="flex w-full flex-col-reverse overflow-y-scroll scrollbar-hide">{children}</div>
  );
};

export default ChMessage;
