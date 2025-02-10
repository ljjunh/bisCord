import { invariant } from 'es-toolkit/compat';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useChatStore } from '@/shared/model/store/chatStore';
import { useDetectorStore } from '@/shared/model/store/detectorStore';
import { useSocketStore } from '@/shared/model/store/socketStore';
import { useUnreadMessagesStore } from '@/shared/model/store/unreadMessagesStore';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { DMQueries } from '../api/queries';
import { groupMessages } from '../lib/utils';
import { MessageGroup } from './MessageGroup';
import { MessageInput } from './MessageInput';

export const DMView = () => {
  const id = useParams().id;
  invariant(id, 'User ID is missing in URL parameters');
  const otherUserId = Number(id);
  const socketClient = useSocketStore((state) => state.socketClient);
  const [editingId, setEditingId] = useState<string | null>(null);
  const detector = useDetectorStore((state) => state.detector);
  const unreadUsers = useUnreadMessagesStore((state) => state.unreadUsers);
  const { removeUnreadUser } = useUnreadMessagesStore();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...DMQueries.getDM({ otherUserId }),
  });

  // store에서 실시간 메시지 가져오기
  const realtimeMessages = useChatStore((state) => state.messages[otherUserId]);

  // API 메시지랑 실시간 메시지 병합
  const allMessages = useMemo(() => {
    const apiMessages = data?.pages.flatMap((page) => page.chats.content) ?? [];
    const storeMessages = realtimeMessages || [];

    // 중복 제거
    const messagesMap = new Map();
    [...apiMessages, ...storeMessages].forEach((message) => {
      messagesMap.set(message.chatId, message);
    });

    return Array.from(messagesMap.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [data, realtimeMessages]);

  const messageGroups = useMemo(() => groupMessages(allMessages), [allMessages]);

  useEffect(() => {
    if (!messageGroups?.length) return;

    messageContainerRef.current?.scrollTo({
      top: messageContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messageGroups]);

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const lastSentReadIdRef = useRef<string>('');

  const latestChatId = useMemo(() => {
    if (!allMessages.length) return null;
    return allMessages[allMessages.length - 1].chatId;
  }, [allMessages]);

  useEffect(() => {
    if (!latestChatId || !lastSentReadIdRef || !detector) return;

    const cleanup = detector.on('active', () => {
      if (latestChatId !== lastSentReadIdRef.current) {
        console.log('디텍터 실행');
        socketClient?.publish({
          destination: `/app/dm/${otherUserId}/chat/${latestChatId}`,
        });
        lastSentReadIdRef.current = latestChatId;
      }
    });

    return cleanup;
  }, [detector, latestChatId]);

  useEffect(() => {
    if (!otherUserId) return;

    const userId = Number(otherUserId);
    if (unreadUsers[userId]) {
      removeUnreadUser(userId);
    }
  }, [otherUserId, unreadUsers, removeUnreadUser]);

  return (
    <div className="flex h-full flex-col px-4 py-2 text-white">
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {hasNextPage && (
          <div
            ref={observerRef}
            className="py-2 text-center text-sm text-white"
          />
        )}
        {messageGroups.map((group) => (
          <MessageGroup
            key={group.messages[0].chatId}
            group={group}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        ))}
      </div>
      <MessageInput otherUserId={otherUserId} />
    </div>
  );
};
