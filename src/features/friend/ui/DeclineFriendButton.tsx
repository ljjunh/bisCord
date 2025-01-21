import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import CloseIcon from '@/shared/icons/CloseIcon';
import { friendQueries } from '../api/queries';
import { IconButton } from './IconButton';

interface DeclineFriendButtonProps {
  friendId: number;
}

export const DeclineFriendButton = ({ friendId }: DeclineFriendButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.PostFriendDecline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
      toast.success('친구 요청을 거절했습니다');
    },
  });

  return (
    <IconButton
      icon={<CloseIcon size={16} />}
      tooltipText="거절"
      delayDuration={100}
      hoverColor="red"
      onClick={() => mutate({ userId: friendId })}
      disabled={isPending}
    />
  );
};
