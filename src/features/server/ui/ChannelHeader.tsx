import { useEffect, useState } from 'react';
import { Servers } from '@/entities/server/model/types';
import ArrowDown from '@/shared/icons/ArrowDown';
import CloseIcon from '@/shared/icons/CloseIcon';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import CreateChannelModal from './CreateChannelModal';
import DeleteModal from './DeleteModal';
import ServerDropDownMenu from './ServerDropDownMenu';

const ChannelHeader = ({
  getServerData,
  serverUri,
}: {
  getServerData: Servers | undefined;
  serverUri: string;
}) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  useEffect(() => {
    console.log(serverUri);
    console.log(getServerData);
  }, [serverUri, getServerData]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="w-full"
          onClick={() => setIsToggle(!isToggle)}
        >
          <div className="relative flex h-[50px] cursor-pointer items-center justify-center rounded-tl-[10px] border-b-2 border-black py-2 text-lg font-bold text-white hover:bg-gray">
            <div className="flex w-full items-center justify-between">
              {getServerData ? <div className="px-2">{getServerData.name}</div> : ''}
              <div className="p-2">
                {isToggle ? <CloseIcon size={15} /> : <ArrowDown size={15} />}
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black">
          {/** 드롭 다운 메뉴 */}
          <ServerDropDownMenu />
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteModal
        getServerData={getServerData}
        serverUri={serverUri}
      />
      <CreateChannelModal serverId={serverUri} />
    </>
  );
};

export default ChannelHeader;
