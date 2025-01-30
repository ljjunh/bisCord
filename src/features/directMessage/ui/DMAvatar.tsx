import { NavLink } from 'react-router-dom';
import DiscordIcon from '@/shared/icons/DiscordIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface DMAvatar {
  link: string;
}

const DMAvatar = ({ link }: DMAvatar) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <NavLink
            to={link}
            className={'relative flex items-center px-[15px]'}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 h-[40px] w-[6px] rounded-br-md rounded-tr-md bg-white transition-all" />
                )}
                <div
                  className={`flex h-[48px] w-[48px] items-center justify-center transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'rounded-2xl bg-blue'
                      : 'rounded-[50%] bg-gray hover:rounded-2xl hover:bg-blue'
                  } hover:before:absolute hover:before:left-0 hover:before:h-[10px] hover:before:w-[5px] hover:before:rounded-br-md hover:before:rounded-tr-md hover:before:bg-white`}
                >
                  <DiscordIcon
                    size={30}
                    color="#fff"
                  />
                </div>
              </>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          다이렉트 메세지
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DMAvatar;
