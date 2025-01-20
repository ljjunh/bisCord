import { friendQueries } from '../api/queries';
import { IconButton } from './IconButton';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckIcon } from 'lucide-react';
import { toast } from 'react-toastify';

interface AcceptFriendButtonProps {
  friendId: number;
}

export const AcceptFriendButton = ({ friendId }: AcceptFriendButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.postFriendAccept,
    onSuccess: () => {
      toast.success('친구 요청을 수락했습니다');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
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
