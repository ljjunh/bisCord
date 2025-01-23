import { LoginStatus } from '../model/types';
import DiscordIcon from '../icons/DiscordIcon';
import { cn } from '../lib/utils';
import UserState from './UserState';

interface UserAvatarProps {
  image?: string | null;
  size: number;
  state?: LoginStatus;
  bg?: string;
}

const UserAvatar = ({ image, size, state = 'OFFLINE', bg }: UserAvatarProps) => {
  return (
    <div
      className={cn(
        'relative flex aspect-[1/1] h-[100%] min-h-[35px] items-center justify-center rounded-[50%]',
        bg ? `bg-${bg}` : 'bg-blue',
      )}
    >
      {image ? (
        <img
          src={image}
          width={size}
          height={size}
          alt="User Avatar"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/discord-icon.svg';
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

export default UserAvatar;
