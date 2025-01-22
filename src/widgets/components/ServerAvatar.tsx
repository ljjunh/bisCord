import { ReactNode } from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { IServers } from '@/entities/server/model/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

interface IServerAvatarProps {
  children?: ReactNode;
  search?: boolean;
  server?: IServers;
}
/** 좌측 서버 아바타 컴포넌트 */
const ServerAvatar = ({ children, search, server }: IServerAvatarProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div
            className={`relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[50%] bg-gray transition-all duration-300 ease-in-out hover:rounded-xl ${search ? `hover:bg-green` : 'hover:bg-blue'} `}
          >
            {server ? (
              <div className="text-md overflow-hidden text-nowrap break-all text-center text-white">
                {server.name}'s server
              </div>
            ) : (
              children
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          <p className="font-semibold">
            {server ? server.name : search ? '서버 추가하기' : '다이렉트 메세지'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServerAvatar;
