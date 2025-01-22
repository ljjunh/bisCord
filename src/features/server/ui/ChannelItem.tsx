import { NavLink } from 'react-router-dom';
import { Channel } from '@/entities/server/model/types';
import { ROUTES } from '@/shared/constants/routes';
import AddUserIcon from '@/shared/icons/AddUserIcon';
import ChannelUnlockedIcon from '@/shared/icons/ChannelUnlockedIcon';
import ChannelAddBtn from './ChannelAddBtn';

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
          <div className="text-md flex-grow font-normal">{name}</div>
          <ChannelAddBtn
            locate="top"
            text="친구 초대하기"
            icon={<AddUserIcon size={15} />}
          />
        </div>
      </NavLink>
    </>
  );
};

export default ChannelItem;
