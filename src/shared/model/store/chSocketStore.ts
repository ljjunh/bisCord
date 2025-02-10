import { create } from 'zustand';
import { Client } from '@stomp/stompjs';

interface Message {
  chatId: string;
  channelId: number;
  content: string;
  userId: number;
  name: string;
  profileImageUrl: string;
  createdAt: string;
  updated: boolean;
}

interface SocketStore {
  stompClient: Client | null;
  setStompClient: (client: Client | null) => void;
  connectSocket: (
    token: string | null,
    channelId: number,
    setMessages: (messages: Message[]) => void,
  ) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  stompClient: null,
  setStompClient: (client) => set({ stompClient: client }),
  connectSocket: (token, channelId) => {
    const channelClient = new Client({
      brokerURL: import.meta.env.VITE_WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: (frame) => {
        console.log('채널 연결 성공', frame);
        channelClient.subscribe(`/topic/channel/${channelId}`, (message) => {
          const msg = JSON.parse(message.body);
          console.log('새로운 메시지:', msg.data);

          // 여기서 setMessages 호출
          // setMessages((prevMessages) => {
          //   if (!prevMessages.some((m) => m.chatId === msg.data.chatId)) {
          //     return [msg.data, ...prevMessages];
          //   }
          //   return prevMessages;
          // });
        });
      },
    });

    channelClient.activate();
    set({ stompClient: channelClient });
  },
  disconnectSocket: () => {
    set((state) => {
      state.stompClient?.deactivate();
      return { stompClient: null };
    });
  },
}));
