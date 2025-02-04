import { create } from 'zustand';
import type { ChatMessage, SendMessage, UpdateMessage } from './types';

interface ChatStoreState {
  messages: Record<number, SendMessage[]>;
  addMessage: (otherUserId: number, message: SendMessage) => void;
  updateMessage: (otherUserId: number, message: UpdateMessage) => void;
  deleteMessage: (otherUserId: number, message: ChatMessage) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  messages: {},

  addMessage: (otherUserId, message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [otherUserId]: [...(state.messages[otherUserId] || []), message],
      },
    }));
  },

  updateMessage: (otherUserId, message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [otherUserId]:
          state.messages[otherUserId]?.map((msg) =>
            msg.chatId === message.chatId
              ? { ...msg, content: message.content, updated: true }
              : msg,
          ) || [],
      },
    }));
  },

  deleteMessage: (otherUserId, message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [otherUserId]:
          state.messages[otherUserId]?.filter((msg) => msg.chatId !== message.chatId) || [],
      },
    }));
  },
}));
