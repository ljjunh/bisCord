import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { MessageIcon } from '@/shared/icons/MessageIcon';
import { TooltipButton } from '@/shared/ui/TooltipButton';

interface SendMessageButtonProps {
  friendId: number;
}

export const SendMessageButton = ({ friendId }: SendMessageButtonProps) => {
  const navigate = useNavigate();

  return (
    <TooltipButton
      icon={<MessageIcon />}
      tooltipText="메시지 보내기"
      delayDuration={100}
      onClick={() => navigate(ROUTES.CHAT.DIRECT_MESSAGE.DETAIL(friendId))}
    />
  );
};
