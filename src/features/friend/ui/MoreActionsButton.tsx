import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { OverflowMenuIcon } from '@/shared/icons/OverflowMenuIcon';
import { TooltipButton } from '@/shared/ui/TooltipButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
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
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuItem onClick={() => console.log('영상 통화 시작하기')}>
          영상 통화 시작하기
        </DropdownMenuItem>
        <DropdownMenuItem>음성 통화 시작하기</DropdownMenuItem> */}

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
