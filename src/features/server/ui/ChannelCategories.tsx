import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { serverQueries } from '@/entities/server/api/queries';
import PlusIcon from '@/shared/icons/PlusIcon';
import EmptyList from '@/shared/ui/EmptyList';
import ArrowDown from '../../../shared/icons/ArrowDown';
import ArrowRight from '../../../shared/icons/ArrowRight';
import ChannelAddBtn from './ChannelAddBtn';
import ChannelItem from './ChannelItem';
import Modal from './Modal';

interface IChannelCategoriesProps {
  serverId: string;
}

const ChannelCategories = ({ serverId }: IChannelCategoriesProps) => {
  const [listOpen, setListOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: getChannels } = useQuery({ ...serverQueries.getChannels(serverId) });

  /** 모달 토글 */
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  /** 채널리스트 토글 */
  const handleChannelList = () => {
    setListOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col px-2">
      <Modal
        serverId={serverId}
        handleModal={handleModal}
        isModalOpen={isModalOpen}
      />
      <div className="flex cursor-pointer items-center py-1 text-light-gray hover:text-white">
        <div
          className="flex flex-grow gap-2"
          onClick={handleChannelList}
        >
          <div className="flex w-[15px] items-center justify-center">
            {listOpen ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
          </div>
          {/* channel 카테고리 */}
          <div className={`flex-grow text-xs ${listOpen ? 'text-white' : ''}`}>
            {/* {channel?.name} */}
            채팅 채널
          </div>
        </div>
        <ChannelAddBtn
          locate="right"
          text="채널 추가하기"
          handleModal={handleModal}
          icon={<PlusIcon size={10} />}
        />
      </div>
      {/* map으로 채널 리스트 작성 */}
      {listOpen ? (
        getChannels ? (
          <div className="flex flex-col gap-1 py-2">
            {getChannels.content.map((channel) => (
              <ChannelItem
                key={channel.id}
                link={serverId}
                channel={channel}
              />
            ))}
          </div>
        ) : (
          <EmptyList />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChannelCategories;
