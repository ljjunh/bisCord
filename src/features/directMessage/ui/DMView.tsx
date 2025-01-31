import { useMemo, useState } from 'react';
import type { Message } from '../model/types';
import { groupMessages } from '../lib/utils';
import { MessageGroup } from './MessageGroup';

export const DMView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      chatId: '1',
      content: '안녕하세요!',
      userId: 1,
      name: '임준희',
      createdAt: '2024-01-30T10:00:00Z',
      updated: false,
    },
    {
      chatId: '2',
      content: '네 안녕하세요~',
      userId: 2,
      name: 'User 2',
      createdAt: '2025-01-29T10:01:00Z',
      updated: false,
    },
    {
      chatId: '3',
      content: '오늘 날씨가 좋네요',
      userId: 2,
      name: 'User 2',
      createdAt: '2025-01-30T10:01:30Z',
      updated: false,
    },
    {
      chatId: '4',
      content: '네 정말 그러네요!',
      userId: 1,
      name: 'User 1',
      createdAt: '2025-01-30T10:02:00Z',
      updated: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messageGroups = useMemo(() => groupMessages(messages), [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      chatId: Date.now().toString(),
      content: newMessage,
      userId: 1, // 현재 사용자 ID
      name: 'currentUser', // 현재 사용자 이름
      createdAt: new Date().toISOString(),
      updated: false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="flex h-full flex-col px-4 py-2 text-white">
      <div className="flex-1 overflow-y-auto">
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
