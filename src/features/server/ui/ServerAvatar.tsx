import { ReactNode } from 'react';
import { Servers } from '@/entities/server/model/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface IServerAvatar {
  children: ReactNode;
  search?: boolean;
  server?: Servers;
}

const ServerAvatarDiv = ({ children, server, search }: IServerAvatar) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
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

export default ServerAvatarDiv;
