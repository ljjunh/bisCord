import { MessageIcon } from '@/shared/icons/MessageIcon';
import { TooltipButton } from '@/shared/ui/TooltipButton';

interface SendMessageButtonProps {
  friendId: number;
}

export const SendMessageButton = ({ friendId }: SendMessageButtonProps) => {
  return (
    <TooltipButton
      icon={<MessageIcon />}
      tooltipText="메시지 보내기"
      delayDuration={100}
      onClick={() => console.log(friendId, 'DM페이지로 이동')}
    />
  );
};
