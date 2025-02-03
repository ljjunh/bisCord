import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useChatStore } from '@/shared/model/chatStore';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { DMQueries } from '../api/queries';
import { groupMessages } from '../lib/utils';
import { MessageGroup } from './MessageGroup';
import { MessageInput } from './MessageInput';

export const DMView = () => {
  const otherUserId = Number(useParams().id);
  const [editingId, setEditingId] = useState<string | null>(null);

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

    return [...apiMessages, ...storeMessages].sort(
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
