import { EditIcon } from '@/shared/icons/EditIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

export const EditDMButton = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <TooltipTrigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EditIcon size={19} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>수정</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
