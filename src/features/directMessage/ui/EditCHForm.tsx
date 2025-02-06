import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { DMQueries } from '../api/queries';

interface EditDMFormProps {
  content: string;
  chatId: string;
  recipientId: number;
  onCancel: () => void;
}

export const EditCHForm = ({ content, chatId, recipientId, onCancel }: EditDMFormProps) => {
  const otherUserId = Number(useParams().id);
  const [editedContent, setEditedContent] = useState(content);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...DMQueries.patchDM,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.directMessage.detail({ otherUserId }),
      });
      toast.success('메시지를 수정했습니다');
      onCancel();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedContent.trim() === '') return;

    mutate({ chatId, recipientId, content: editedContent });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1"
    >
      <div>
        <input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full rounded-xl bg-gray px-4 py-3 focus:outline-none"
          autoFocus
          disabled={isPending}
        />
        <p className="mt-2 text-xs">
          ESC 키로{' '}
          <button
            type="button"
            onClick={onCancel}
            className="text-blue hover:underline"
          >
            취소
          </button>
          • Enter 키로{' '}
          <button
            type="submit"
            disabled={isPending}
            className="text-blue hover:underline disabled:opacity-50"
          >
            저장
          </button>
        </p>
      </div>
    </form>
  );
};
