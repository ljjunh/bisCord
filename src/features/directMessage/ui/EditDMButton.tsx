import { EditIcon } from '@/shared/ui/icons/EditIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface EditDMButtonProps {
  onEdit: () => void;
}

export const EditDMButton = ({ onEdit }: EditDMButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <TooltipTrigger asChild>
          <button onClick={handleClick}>
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
