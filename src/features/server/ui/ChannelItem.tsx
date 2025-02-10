import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import type { Channel } from '../model/types';
import { useModalStore } from '@/shared/model/store/modalStore';
import { queryClient } from '@/shared/api/queryClient';
import { QUERY_KEYS } from '@/shared/api/queryKeys';
import { MODAL } from '@/shared/constants/modal';
import { ROUTES } from '@/shared/constants/routes';
import { AddUserIcon } from '@/shared/icons/AddUserIcon';
import { ChannelUnlockedIcon } from '@/shared/icons/ChannelUnlockedIcon';
import { VoiceIcon } from '@/shared/icons/VoiceIcon';
import { WasteBasketIcon } from '@/shared/icons/WasteBasketIcon';
import { serverQueries } from '../api/queries';
import { ChannelAddBtn } from './ChannelAddBtn';

interface ChannelItemProps {
  channel: Channel;
  link: string;
  type: 'voice' | 'chat';
}

export const ChannelItem = ({ channel, link, type }: ChannelItemProps) => {
  const { id, name } = channel;
  const { onOpenModal } = useModalStore((state) => state);
  const { mutate } = useMutation({
    ...serverQueries.deleteChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.channel.list(),
      });
      toast.success('채널을 삭제했습니다');
    },
  });

  const handleDeleteChannel = () => {
    mutate(Number(id));
  };

  return (
    <>
      <NavLink
        to={ROUTES.CHAT.SERVER.CHANNEL(link, id)}
        className={({ isActive }) =>
          `rounded-md text-light-gray hover:bg-gray ${isActive ? 'bg-gray text-white' : ''}`
        }
      >
        <div className="group flex flex-row items-center gap-2 px-2 py-1">
          {type === 'chat' ? <ChannelUnlockedIcon size={15} /> : <VoiceIcon size={15} />}
          <div className="text-md flex-grow font-normal">{name}</div>
          <div
            className="flex hidden group-hover:flex"
            onClick={handleDeleteChannel}
          >
            <WasteBasketIcon size={15} />
          </div>
          <div onClick={() => onOpenModal(MODAL.INVIDE_MEMBER)}>
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
