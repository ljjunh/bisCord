import { MuteIcon } from '@/shared/icons/MuteIcon';
import { UnMuteIcon } from '@/shared/icons/UnMuteIcon';
import { UserTooltipButton } from './UserTooltipButton';

interface MicToggleButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const MicToggleButton = ({ isMuted, onToggle }: MicToggleButtonProps) => {
  return (
    <UserTooltipButton
      icon={isMuted ? <UnMuteIcon size={20} /> : <MuteIcon size={20} />}
      tooltipText={isMuted ? '마이크 켜기' : '마이크 끄기'}
      onClick={onToggle}
    />
  );
};
