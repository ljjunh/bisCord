import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { cn } from '@/shared/lib/utils/utils';
import { friendQueries } from '../api/queries';

interface AddFriendButtonProps {
  invitedUserId: number;
  className?: string;
}

export const AddFriendButton = ({ invitedUserId, className }: AddFriendButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.postFriendRequest,
    onSuccess: () => {
      toast.success('친구 요청을 보냈습니다');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.base });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
    },
  });

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        mutate({ invitedUserId });
      }}
      className={cn(
        'cursor-pointer rounded bg-blue-purple px-2.5 py-2 font-semibold text-white hover:bg-blue',
        className,
      )}
      disabled={isPending}
    >
      {isPending ? '요청 중' : '친구 요청 보내기'}
    </button>
  );
};
