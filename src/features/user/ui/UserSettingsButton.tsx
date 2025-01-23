import { SettingIcon } from '@/shared/icons/SettingIcon';
import { UserTooltipButton } from './UserTooltipButton';

export const UserSettingsButton = () => {
  return (
    <UserTooltipButton
      icon={<SettingIcon size={20} />}
      tooltipText="설정"
    />
  );
};
