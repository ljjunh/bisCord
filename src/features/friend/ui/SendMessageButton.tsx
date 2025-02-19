import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { ROUTES } from '@/shared/model/constants/routes';
import { TooltipButton } from '@/shared/ui/TooltipButton';
import { MessageIcon } from '@/shared/ui/icons/MessageIcon';
import { DMQueries } from '../../directMessage/api/queries';

interface SendMessageButtonProps {
  friendId: number;
}

export const SendMessageButton = ({ friendId }: SendMessageButtonProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    ...DMQueries.postDMRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.directMessage.members() });
      navigate(ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(friendId));
    },
  });

  const handleButtonClick = () => {
    mutate({ recipientId: friendId });
  };

  return (
    <TooltipButton
      icon={<MessageIcon />}
      tooltipText="메시지 보내기"
      delayDuration={100}
      onClick={handleButtonClick}
      disabled={isPending}
    />
  );
};
