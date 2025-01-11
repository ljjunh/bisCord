import { ChannelData } from '../../../shared/mockData';
import ChannelCategories from './ChannelCategories';

/** 친구 및 서버 목록 리스트 UI */
const ChannelList = () => {
  const channels = ChannelData;

  return (
    <div className="flex w-[250px] flex-col gap-4 rounded-tl-[10px] bg-mid-gray p-2">
      {/* channel header */}
      <div></div>

      {/* channel list */}
      {channels.map((channel) => (
        <ChannelCategories
          key={channel.id}
          channel={channel}
        />
      ))}
    </div>
  );
};

export default ChannelList;
