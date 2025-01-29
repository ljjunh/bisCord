import { NavLink } from 'react-router-dom';
import { Channel } from '../model/types';
import { useModalStore } from '@/shared/model/modalStore';
import { ROUTES } from '@/shared/constants/routes';
import AddUserIcon from '@/shared/icons/AddUserIcon';
import ChannelUnlockedIcon from '@/shared/icons/ChannelUnlockedIcon';
import ChannelAddBtn from './ChannelAddBtn';

interface ChannelItem {
  channel: Channel;
  link: string;
}

const ChannelItem = ({ channel, link }: ChannelItem) => {
  const { id, name } = channel;
  const { onOpenModal } = useModalStore((state) => state);

  const openInviteModal = () => {
    onOpenModal('INVIDE_MEMBER');
  };

  return (
    <>
      <NavLink
        to={ROUTES.CHAT.SERVER.CHANNEL(link, id)}
        className={({ isActive }) =>
          `rounded-md text-light-gray hover:bg-gray ${isActive ? 'bg-gray text-white' : ''}`
        }
      >
        <div className="flex flex-row items-center gap-2 px-2 py-1">
          <ChannelUnlockedIcon size={15} />
          <div className="text-md flex-grow font-normal">{name}</div>
          <div onClick={openInviteModal}>
            <ChannelAddBtn
              locate="top"
              text="친구 초대하기"
              icon={<AddUserIcon size={15} />}
            />
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ChannelItem;
