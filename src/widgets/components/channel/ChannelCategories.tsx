import { IChannelTypes } from '../../../entities/types/ChannelType';
import ArrowDown from '../../../shared/icons/ArrowDown';
import ArrowRight from '../../../shared/icons/ArrowRight';
import { path } from '../../../shared/path';
import ChannelItem from './ChannelItem';
import { useState } from 'react';

interface IChannelCategoriesProps {
  channel: IChannelTypes; // 각 카테고리의 데이터를 받아올 타입
}

const ChannelCategories = ({ channel }: IChannelCategoriesProps) => {
  const [open, isOpen] = useState<boolean>(true);

  /** 채널 목록 토글 핸들러 */
  const handleToggle = () => {
    isOpen(!open);
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleToggle}
        className="flex items-center gap-2 py-1 text-light-gray hover:text-white"
      >
        <div className="flex w-[15px] items-center justify-center">
          {open ? <ArrowDown size={12} /> : <ArrowRight size={12} />}
        </div>
        {/* channel 카테고리 */}
        <div className="text-xs">{channel.name}</div>
      </div>
      {/* map으로 채널 리스트 작성 */}
      {open && (
        <>
          {channel.list.map((name) => (
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
