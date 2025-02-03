import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { WasteBasketIcon } from '@/shared/icons/WasteBasketIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { DMQueries } from '../api/queries';

interface DeleteDMButtonProps {
  chatId: string;
  recipientId: number;
}

export const DeleteDMButton = ({ recipientId, chatId }: DeleteDMButtonProps) => {
  const otherUserId = Number(useParams().id);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...DMQueries.deleteDM,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.detail({ otherUserId }) });
      toast.success('메시지를 삭제했습니다');
    },
  });

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate({ recipientId, chatId });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <TooltipTrigger asChild>
          <button
            onClick={handleDeleteButton}
            disabled={isPending}
            className="disabled:cursor-not-allowed disabled:opacity-50"
          >
            <WasteBasketIcon size={20} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>삭제</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
