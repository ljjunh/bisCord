import { Suspense, lazy, useState } from 'react';
import type { Servers } from '../model/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { ArrowDown } from '@/shared/ui/icons/ArrowDown';
import { CloseIcon } from '@/shared/ui/icons/CloseIcon';
import { ModalSkeleton } from '@/shared/ui/skeleton/ModalSkeleton';
import { ServerDropDownMenu } from './ServerDropDownMenu';

const CreateChannelModal = lazy(() => import('./modals/CreateChannelModal'));
const DeleteModal = lazy(() => import('./modals/DeleteModal'));

interface ChannelHeaderProps {
  getServerData: Servers | undefined;
  serverUri: string;
}

export const ChannelHeader = ({ getServerData, serverUri }: ChannelHeaderProps) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

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
          <ServerDropDownMenu />
        </DropdownMenuContent>
      </DropdownMenu>
      <Suspense fallback={<ModalSkeleton />}>
        <DeleteModal
          getServerData={getServerData}
          serverUri={serverUri}
        />
        <CreateChannelModal serverId={serverUri} />
      </Suspense>
    </>
  );
};
