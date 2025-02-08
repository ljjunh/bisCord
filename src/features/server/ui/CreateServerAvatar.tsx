import { PlusIcon } from '@/shared/icons/PlusIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

export const CreateServerAvatar = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[50%] bg-gray transition-all ease-in-out hover:rounded-2xl hover:bg-green">
            <div>
              <PlusIcon
                size={20}
                color="#fff"
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          서버 추가하기
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
