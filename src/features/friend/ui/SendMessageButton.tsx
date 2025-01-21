import { MessageIcon } from '@/shared/icons/MessageIcon';
import { IconButton } from './IconButton';

interface SendMessageButtonProps {
  friendId: number;
}

export const SendMessageButton = ({ friendId }: SendMessageButtonProps) => {
  return (
    <IconButton
      icon={<MessageIcon />}
      tooltipText="메시지 보내기"
      delayDuration={100}
      onClick={() => console.log(friendId, 'DM페이지로 이동')}
    />
  );
};
