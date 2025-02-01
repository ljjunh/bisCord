import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Message } from '../model/types';
import { useInfiniteScroll } from '@/shared/lib/useInfiniteScroll';
import { DMQueries } from '../api/queries';
import { groupMessages } from '../lib/utils';
import { MessageGroup } from './MessageGroup';

export const DMView = () => {
  const { id } = useParams<{ id: string }>();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    ...DMQueries.getDM({ otherUserId: Number(id) }),
  });

  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const allMessages = data?.pages.flatMap((page) => page.chats.content) ?? [];

  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([]);

  const messages = useMemo(() => {
    return [...allMessages, ...realtimeMessages].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [allMessages, realtimeMessages]);

  const messageGroups = useMemo(() => groupMessages(messages), [messages]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      chatId: Date.now().toString(),
      content: newMessage,
      userId: 1, // 현재 사용자 ID
      name: 'currentUser', // 현재 사용자 이름
      profileImageUrl: null,
      createdAt: new Date().toISOString(),
      updated: false,
    };

    setRealtimeMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
  };

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
        {messageGroups.map((group, index) => (
          <MessageGroup
            key={`${group.user.id}-${index}`}
            group={group}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="placeholder-gray-400 flex-1 rounded bg-gray-700 px-4 py-3 text-white focus:outline-none"
            placeholder="메시지를 입력하세요"
          />
        </div>
      </form>
    </div>
  );
};
