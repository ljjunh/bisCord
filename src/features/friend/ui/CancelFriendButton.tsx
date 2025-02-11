import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { TooltipButton } from '@/shared/ui/TooltipButton';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { friendQueries } from '../api/queries';

interface CancelFriendButtonProps {
  userId: number;
}

export const CancelFriendButton = ({ userId }: CancelFriendButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.PostFriendDecline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
      toast.info('친구 요청을 취소했습니다');
    },
  });

  return (
    <TooltipButton
      icon={<CloseIcon size={16} />}
      tooltipText="취소"
      delayDuration={100}
      hoverColor="red"
      onClick={() => mutate({ userId })}
      disabled={isPending}
    />
  );
};
