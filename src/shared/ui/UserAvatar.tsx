import DiscordIcon from '../icons/DiscordIcon';
import UserState from './UserState';

interface IUserAvatarProps {
  image?: string | null;
  size: number;
  state?: boolean;
  bg?: string;
}

const UserAvatar = ({ image, size, state = false, bg }: IUserAvatarProps) => {
  return (
    <div
      className={`relative flex aspect-[1/1] h-[100%] min-h-[35px] items-center justify-center rounded-[50%] bg-${bg ? bg : 'blue'}`}
    >
      {/* 이미지가 있으면 렌더링, 없으면 DiscordIcon 렌더링 */}
      {image ? (
        <></>
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
