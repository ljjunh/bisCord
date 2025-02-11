import { NavLink } from 'react-router-dom';
import type { Servers } from '../model/types';
import { ROUTES } from '@/shared/model/constants/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface ServerAvatarProps {
  server?: Servers;
}
/** 좌측 서버 아바타 컴포넌트 */
export const ServerAvatar = ({ server }: ServerAvatarProps) => {
  const newLink = ROUTES.CHAT.SERVER.DETAIL(server?.serverUri);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <NavLink
            to={newLink}
            className={'relative flex items-center px-[15px]'}
          >
            {({ isActive }) => (
              <>
                {/* 서버 프로필 이미지가 있는 경우 */}

                <>
                  {isActive && (
                    <div className="absolute left-0 h-[40px] w-[6px] rounded-br-md rounded-tr-md bg-white transition-all" />
                  )}
                  <div
                    className={`flex h-[48px] w-[48px] items-center justify-center overflow-hidden transition-all duration-300 ease-in-out ${
                      isActive
                        ? 'rounded-2xl bg-blue'
                        : 'rounded-[50%] bg-gray hover:rounded-2xl hover:bg-blue'
                    } hover:before:absolute hover:before:left-0 hover:before:h-[10px] hover:before:w-[5px] hover:before:rounded-br-md hover:before:rounded-tr-md hover:before:bg-white`}
                  >
                    {/* 여기 이제 이미지 */}

                    {server?.serverImageURL ? (
                      <>
                        <img
                          src={server?.serverImageURL}
                          className="h-full w-full"
                        ></img>
                      </>
                    ) : (
                      <div className="overflow-hidden text-nowrap break-all text-center text-sm text-white">
                        {server?.name}'s server
                      </div>
                    )}
                  </div>
                </>
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
