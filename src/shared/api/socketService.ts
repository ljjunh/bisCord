import type {
  ChatMessage,
  SendMessage,
  UpdateMessage,
  WebRTCSignalData,
  WebSocketMessage,
} from '../model/types';
import { useRTCStore } from '../model/store/RTCStore';
import { useAuthStore } from '../model/store/authStore';
import { useChatStore } from '../model/store/chatStore';
import { useModalStore } from '../model/store/modalStore';
import { useUnreadMessagesStore } from '../model/store/unreadMessagesStore';
import { ROUTES } from '../model/constants/routes';
import { queryClient } from './queryClient';
import { QUERY_KEYS } from './queryKeys';

const isDMMessage = (data: WebSocketMessage['data']): data is ChatMessage | SendMessage => {
  return 'userId' in data && 'recipientId' in data;
};

const isSendMessage = (data: WebSocketMessage['data']): data is SendMessage => {
  return 'content' in data && 'createdAt' in data && 'name' in data;
};

const isUpdateMessage = (data: WebSocketMessage['data']): data is UpdateMessage => {
  return 'chatId' in data && 'content' in data && !('createdAt' in data);
};

const isWebRTCSignalData = (data: WebSocketMessage['data']): data is WebRTCSignalData => {
  return 'fromUserId' in data && 'toUserId' in data;
};

export const SocketService = {
  handleDM: (wsMessage: WebSocketMessage) => {
    const { operation, data } = wsMessage;
    const myUserId = useAuthStore.getState().user?.id;
    // WebRTC 시그널링 메시지는 다른 핸들러로 처리
    if (isWebRTCSignalData(data)) return;

    // DM 메시지가 아니면 처리하지 않음
    if (!isDMMessage(data)) return;

    const otherUserId = data.userId === myUserId ? data.recipientId : data.userId;
    const messages = useChatStore.getState().messages;
    const isNotInCurrentChatRoom = !window.location.pathname.includes(
      ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(otherUserId),
    );

    if (isNotInCurrentChatRoom && operation === 'SEND' && isSendMessage(data)) {
      if (otherUserId in useUnreadMessagesStore.getState().unreadUsers) {
        const audio = new Audio('/sounds/notification.mp3');
        audio.play().catch((error) => console.error('Audio play 실패:', error));
        useUnreadMessagesStore.getState().increaseUnreadCount(otherUserId);
        return;
      }
      useUnreadMessagesStore.getState().addUnreadUser(otherUserId, data.profileImageUrl);
    }

    if (isNotInCurrentChatRoom) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.members() });
    }

    switch (operation) {
      case 'SEND': {
        if (isSendMessage(data)) {
          useChatStore.getState().addMessage(otherUserId, data);
        }
        break;
      }
      case 'UPDATE': {
        if (isUpdateMessage(data)) {
          const isInStore = messages[otherUserId]?.some((msg) => msg.chatId === data.chatId);
          if (isInStore) {
            useChatStore.getState().updateMessage(otherUserId, data);
            break;
          }
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.directMessage.detail({ otherUserId }),
          });
        }
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
  handleWebRTC: (wsMessage: WebSocketMessage) => {
    const { type, data } = wsMessage;

    if (!isWebRTCSignalData(data)) return;

    const rtcStore = useRTCStore.getState();

    switch (type) {
      case 'CALL_OFFER': {
        // 상대방이 통화를 요청한 경우
        if (data.description) {
          const isInChatRoom = window.location.pathname.includes(
            ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(data.fromUserId),
          );
          if (!isInChatRoom) {
            const audio = new Audio('/sounds/callstart.wav');
            audio.play().catch((error) => console.error('Audio play 실패:', error));

            const onOpenModal = useModalStore.getState().onOpenModal;
            onOpenModal('CALL_NOTIFICATION');
          }

          rtcStore.setIncomingCall(data.fromUserId, data.fromUserName, data);
        }
        break;
      }

      case 'CALL_ANSWER': {
        // 상대방이 통화 요청을 수락한 경우
        if (data.description) {
          rtcStore.handleCallAccepted(data);
          console.log('CALL_ANSWER 받음:', data);
        }
        break;
      }

      case 'CALL_ICE': {
        // ICE candidate를 받은 경우
        if (data.candidate) {
          rtcStore.handleNewICECandidate(data.candidate);
        }
        break;
      }

      case 'CALL_END': {
        // 통화가 종료된 경우
        rtcStore.endCall();
        rtcStore.clearIncomingCall();
        break;
      }

      default: {
        console.warn('알수없는 WebRTC 시그널링 메시지 타입', type);
        break;
      }
    }
  },
};
