import { NavLink } from 'react-router-dom';
import { Channel } from '@/entities/server/model/types';
import { ROUTES } from '@/shared/constants/routes';
import ChannelUnlockedIcon from '@/shared/icons/ChannelUnlockedIcon';

interface IChannelItemProps {
  channel: Channel;
  link: string;
}

const ChannelItem = ({ channel, link }: IChannelItemProps) => {
  const { id, name } = channel;

  return (
    <>
      <NavLink
        to={ROUTES.CHAT.SERVER.CHANNEL(link, id)}
        className={({ isActive }) =>
          `rounded-md text-light-gray hover:bg-gray ${isActive ? 'bg-gray text-white' : ''}`
        }
      >
        <div className="flex flex-row items-center gap-2 p-2">
          <ChannelUnlockedIcon size={15} />
          <div className="text-md font-normal">{name}</div>
        </div>
      </NavLink>
    </>
  );
};

export default ChannelItem;
