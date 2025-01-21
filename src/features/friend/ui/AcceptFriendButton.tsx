import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { CheckIcon } from '@/shared/icons/CheckIcon';
import { friendQueries } from '../api/queries';
import { IconButton } from './IconButton';

interface AcceptFriendButtonProps {
  friendId: number;
}

export const AcceptFriendButton = ({ friendId }: AcceptFriendButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.postFriendAccept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
      toast.success('친구 요청을 수락했습니다');
    },
  });

  return (
    <IconButton
      icon={<CheckIcon />}
      tooltipText="수락"
      delayDuration={100}
      hoverColor="green"
      onClick={() => mutate({ invitingUserId: friendId })}
      disabled={isPending}
    />
  );
};
