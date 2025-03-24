import { MuteIcon } from '@/shared/ui/icons/MuteIcon';
import { UnMuteIcon } from '@/shared/ui/icons/UnMuteIcon';
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
      aria-label="마이크 토글 버튼"
    />
  );
};
