import type { LoginStatus } from '../model/types';
import { DiscordIcon } from '../icons/DiscordIcon';
import { cn } from '../lib/utils/utils';
import { UserState } from './UserState';

interface UserAvatarProps {
  image?: string | null;
  size: number;
  state?: LoginStatus;
  bg?: string;
}

export const UserAvatar = ({ image, size, state = 'OFFLINE', bg }: UserAvatarProps) => {
  return (
    <div
      className={cn(
        'relative flex aspect-[1/1] h-full min-h-[35px] items-center justify-center rounded-[50%]',
        bg ? `bg-${bg}` : 'bg-blue',
      )}
    >
      {image ? (
        <img
          src={image}
          width={size}
          height={size}
          alt="User Avatar"
          className="h-full w-full rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/discord-icon.svg';
          }}
        />
      ) : (
        <DiscordIcon
          color={'#ffffff'}
          size={size}
        />
      )}
      <UserState state={state} />
    </div>
  );
};
