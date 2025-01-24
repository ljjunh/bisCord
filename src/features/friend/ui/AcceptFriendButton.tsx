import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { CheckIcon } from '@/shared/icons/CheckIcon';
import { TooltipButton } from '@/shared/ui/TooltipButton';
import { friendQueries } from '../api/queries';

interface AcceptFriendButtonProps {
  invitingUserId: number;
}

export const AcceptFriendButton = ({ invitingUserId }: AcceptFriendButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.postFriendAccept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
      toast.success('친구 요청을 수락했습니다');
    },
  });

  return (
    <TooltipButton
      icon={<CheckIcon />}
      tooltipText="수락"
      delayDuration={100}
      hoverColor="green"
      onClick={() => mutate({ invitingUserId })}
      disabled={isPending}
    />
  );
};
