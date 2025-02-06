import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DMQueries } from '../api/queries';

interface MessageInputProps {
  otherUserId: number;
}

export const MessageInput = ({ otherUserId }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState('');

  const { mutate } = useMutation({
    ...DMQueries.postDM,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    mutate({ recipientId: otherUserId, content: newMessage.trim() });

    setNewMessage('');
  };

  return (
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
  );
};
