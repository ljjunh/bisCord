import { DeafenIcon } from '@/shared/ui/icons/DeafenIcon';
import { UnDeafenIcon } from '@/shared/ui/icons/UnDeafenIcon';
import { UserTooltipButton } from './UserTooltipButton';

interface AudioToggleButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const AudioToggleButton = ({ isMuted, onToggle }: AudioToggleButtonProps) => {
  return (
    <UserTooltipButton
      icon={isMuted ? <UnDeafenIcon size={19} /> : <DeafenIcon size={19} />}
      tooltipText={isMuted ? '오디오 켜기' : '오디오 끄기'}
      onClick={onToggle}
    />
  );
};
