import { useState } from 'react';
import ArrowDown from '@/shared/icons/ArrowDown';
import CloseIcon from '@/shared/icons/CloseIcon';

const ChannelHeader = ({ getServerData }: { getServerData: string | undefined }) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <div className="relative flex h-[50px] cursor-pointer items-center justify-center rounded-tl-[10px] border-b-2 border-black py-2 text-lg font-bold text-white hover:bg-gray">
      <div className="flex w-full items-center justify-between">
        {getServerData ? <div className="px-2">{getServerData}</div> : ''}
        <div
          className="p-2"
          onClick={() => setIsToggle(!isToggle)}
        >
          {isToggle ? <CloseIcon size={15} /> : <ArrowDown size={15} />}
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
