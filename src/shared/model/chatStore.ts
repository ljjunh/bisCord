import { create } from 'zustand';
import { SendMessage, WebSocketMessage } from './types';
import { useAuthStore } from './authStore';

interface ChatStoreState {
  messages: Record<number, SendMessage[]>;
  handleMessage: (message: WebSocketMessage) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  messages: {},

  handleMessage: (message: WebSocketMessage) => {
    const { operation, data } = message;
    const myUserId = useAuthStore.getState().user?.id;
    if (!myUserId) return;

    const otherUserId = data.userId === myUserId ? data.recipientId : data.userId;

    switch (operation) {
      case 'SEND': {
        if ('content' in data && 'createdAt' in data) {
          set((state: ChatStoreState) => ({
            messages: {
              ...state.messages,
              [otherUserId]: [...(state.messages[otherUserId] || []), data],
            },
          }));
        }
        break;
      }

      case 'UPDATE': {
        if ('content' in data) {
          set((state: ChatStoreState) => ({
            messages: {
              ...state.messages,
              [otherUserId]:
                state.messages[otherUserId]?.map((msg) =>
                  msg.chatId === data.chatId
                    ? { ...msg, content: data.content, updated: true }
                    : msg,
                ) || [],
            },
          }));
        }
        break;
      }

      case 'DELETE': {
        set((state: ChatStoreState) => ({
          messages: {
            ...state.messages,
            [otherUserId]:
              state.messages[otherUserId]?.filter((msg) => msg.chatId !== data.chatId) || [],
          },
        }));
        break;
      }
    }
  },
}));
