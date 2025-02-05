import type { WebSocketMessage } from '../model/types';
import { useAuthStore } from '../model/authStore';
import { useChatStore } from '../model/chatStore';
import { useUnreadMessagesStore } from '../model/unreadMessagesStore';
import { ROUTES } from '../constants/routes';
import { queryClient } from './queryClient';
import { QUERY_KEYS } from './queryKeys';

export const SocketService = {
  handleDM: (wsMessage: WebSocketMessage) => {
    const { operation, data } = wsMessage;
    const myUserId = useAuthStore.getState().user?.id;

    const otherUserId = data.userId === myUserId ? data.recipientId : data.userId;
    const messages = useChatStore.getState().messages;
    const isNotInCurrentChatRoom = !window.location.pathname.includes(
      ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(otherUserId),
    );

    if (isNotInCurrentChatRoom && operation === 'SEND' && 'profileImageUrl' in data) {
      if (otherUserId in useUnreadMessagesStore.getState().unreadUsers) {
        console.log('안에꺼');
        useUnreadMessagesStore.getState().increaseUnreadCount(otherUserId);
        return;
      }
      console.log('밖에꺼');
      useUnreadMessagesStore.getState().addUnreadUser(otherUserId, data.profileImageUrl);
    }

    if (isNotInCurrentChatRoom) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.members() });
    }

    switch (operation) {
      case 'SEND': {
        if ('content' in data && 'createdAt' in data) {
          useChatStore.getState().addMessage(otherUserId, data);
        }
        break;
      }
      case 'UPDATE': {
        const isInStore = messages[otherUserId]?.some((msg) => msg.chatId === data.chatId);

        if (isInStore && 'content' in data) {
          useChatStore.getState().updateMessage(otherUserId, data);
          break;
        }

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.directMessage.detail({ otherUserId }),
        });
        break;
      }
      case 'DELETE': {
        const isInStore = messages[otherUserId]?.some((msg) => msg.chatId === data.chatId);
        if (isInStore) {
          useChatStore.getState().deleteMessage(otherUserId, data);
          break;
        }
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.directMessage.detail({ otherUserId }),
        });
        break;
      }
      default: {
        console.warn('알수없는 메시지 타입', operation);
        break;
      }
    }
  },
};
