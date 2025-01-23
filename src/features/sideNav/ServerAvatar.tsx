import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import { IServers } from '@/entities/server/model/types';
import { ROUTES } from '@/shared/constants/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface IServerAvatarProps {
  children?: ReactNode;
  search?: boolean;
  server?: IServers;
  link?: string;
}
/** 좌측 서버 아바타 컴포넌트 */
const ServerAvatar = ({ server }: IServerAvatarProps) => {
  const newLink = ROUTES.CHAT.SERVER.DETAIL(server?.serverUri);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <NavLink
            to={newLink}
            className={'relative flex items-center px-[10px]'}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 h-[40px] w-[6px] rounded-br-md rounded-tr-md bg-white transition-all" />
                )}
                <div
                  className={`flex h-[48px] w-[48px] items-center justify-center rounded-[50%] transition-all duration-300 ease-in-out ${
                    isActive ? 'rounded-2xl bg-blue' : 'bg-gray hover:rounded-2xl hover:bg-blue'
                  } hover:before:absolute hover:before:left-0 hover:before:h-[10px] hover:before:w-[6px] hover:before:rounded-br-md hover:before:rounded-tr-md hover:before:bg-white`}
                >
                  {/* 여기 이제 이미지 */}
                  <div className="overflow-hidden text-nowrap break-all text-center text-sm text-white">
                    {server?.name}'s server
                  </div>
                </div>
              </>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          {server?.name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServerAvatar;
