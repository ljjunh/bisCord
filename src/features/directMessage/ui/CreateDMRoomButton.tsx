import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { SelectDMFriend } from './SelectDMFriend';

export const CreateDMRoomButton = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <button className="disabled:cursor-not-allowed disabled:opacity-50">
                <PlusIcon size={15} />
              </button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent
            className="z-50 w-[440px] rounded-md border-none bg-[#313338] p-4 shadow-md"
            align="start"
            sideOffset={10}
          >
            <SelectDMFriend />
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>DM 생성</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
