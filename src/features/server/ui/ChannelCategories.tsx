import ArrowDown from '../../../shared/icons/ArrowDown';
import ArrowRight from '../../../shared/icons/ArrowRight';
import ChannelItem from './ChannelItem';
import Modal from './Modal';
import PlusIcon from '@/shared/icons/PlusIcon';
import { Channel } from '@/shared/model/server/types';
import EmptyList from '@/shared/ui/EmptyList';
import { useState } from 'react';

interface IChannelCategoriesProps {
  channel?: Channel[]; // 각 카테고리의 데이터를 받아올 타입
  serverId: string;
}

const ChannelCategories = ({ channel, serverId }: IChannelCategoriesProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log(channel);

  /** 모달 토글 */
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col px-2">
      <Modal
        serverId={serverId}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
      />
      <div
        onClick={handleModal}
        className="flex cursor-pointer items-center gap-2 py-1 text-light-gray hover:text-white"
      >
        <div className="flex w-[15px] items-center justify-center">
          {isModalOpen ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
        </div>
        {/* channel 카테고리 */}
        <div className="flex-grow text-xs">
          {/* {channel?.name} */}
          채팅 채널
        </div>
        <div
          className="p-1"
          onClick={handleModal}
        >
          <PlusIcon size={10} />
        </div>
      </div>
      {/* map으로 채널 리스트 작성 */}
      <>
        {channel ? (
          channel.map((name) => (
            // <Link to={path.channel_id(nowServerId.pathname, name.id)}>
            <ChannelItem
              // name={name.name}
              name={name.name}
              key={name.id}
            />
            // </Link>
          ))
        ) : (
          <EmptyList />
        )}
      </>
    </div>
  );
};

export default ChannelCategories;
