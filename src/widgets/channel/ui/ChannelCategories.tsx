import ArrowDown from '../../../shared/icons/ArrowDown';
import ArrowRight from '../../../shared/icons/ArrowRight';
import ChannelItem from './ChannelItem';
import { Channel } from '@/shared/model/server/types';
import { useState } from 'react';

interface IChannelCategoriesProps {
  channel?: Channel[]; // 각 카테고리의 데이터를 받아올 타입
}

const ChannelCategories = ({ channel }: IChannelCategoriesProps) => {
  const [open, isOpen] = useState<boolean>(true);

  /** 채널 목록 토글 핸들러 */
  const handleToggle = () => {
    isOpen(!open);
  };

  return (
    <div className="flex flex-col px-2">
      <div
        onClick={handleToggle}
        className="flex items-center gap-2 py-1 text-light-gray hover:text-white"
      >
        <div className="flex w-[15px] items-center justify-center">
          {open ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
        </div>
        {/* channel 카테고리 */}
        <div className="flex-grow text-xs">
          {/* {channel?.name} */}
          채팅 채널
        </div>
        <div>+</div>
      </div>
      {/* map으로 채널 리스트 작성 */}
      {open && (
        <>
          {channel?.map((name) => (
            // <Link to={path.channel_id(nowServerId.pathname, name.id)}>
            <ChannelItem
              name={name.name}
              key={name.id}
            />
            // </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default ChannelCategories;
