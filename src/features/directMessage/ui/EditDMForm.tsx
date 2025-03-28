import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DMQueries } from '../api/queries';

interface EditDMFormProps {
  content: string;
  chatId: string;
  recipientId: number;
  onCancel: () => void;
}

export const EditDMForm = ({ content, chatId, recipientId, onCancel }: EditDMFormProps) => {
  const [editedContent, setEditedContent] = useState(content);

  const { mutate, isPending } = useMutation({
    ...DMQueries.patchDM,
    onSuccess: () => {
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
      aria-label="메시지 수정 폼"
    >
      <fieldset>
        <legend className="sr-only">메시지 편집</legend>
        <label
          htmlFor="edit-message"
          className="sr-only"
        >
          메시지 수정
        </label>
        <input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full rounded-xl bg-gray px-4 py-3 focus:outline-none"
          autoFocus
          disabled={isPending}
          aria-required="true"
        />
        <footer className="mt-2 text-xs">
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
        </footer>
      </fieldset>
    </form>
  );
};
