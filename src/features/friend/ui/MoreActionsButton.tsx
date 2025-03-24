import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { TooltipButton } from '@/shared/ui/TooltipButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { OverflowMenuIcon } from '@/shared/ui/icons/OverflowMenuIcon';
import { friendQueries } from '../api/queries';

interface MoreActionsButtonProps {
  userId: number;
}

export const MoreActionsButton = ({ userId }: MoreActionsButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    ...friendQueries.PostFriendDecline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.friend.base });
      toast.info('친구 목록에서 삭제되었습니다');
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton
          icon={<OverflowMenuIcon />}
          tooltipText="기타"
          delayDuration={100}
          aria-label="기타 기능 버튼"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black">
        {/* TODO : 기능이 추가되면 친구삭제 버튼도 분리 */}
        <DropdownMenuItem
          onClick={() => mutate({ userId })}
          className="text-red focus:bg-red"
          disabled={isPending}
        >
          {isPending ? '친구 삭제 중' : '친구 삭제하기'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
