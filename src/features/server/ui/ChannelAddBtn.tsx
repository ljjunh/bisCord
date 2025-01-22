import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface ChannelAddBtn {
  handleModal?: () => void | null;
  text: string;
  icon: ReactNode;
  locate: string;
}

const ChannelAddBtn = ({ handleModal, text, icon }: ChannelAddBtn) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div
            className="p-1"
            onClick={handleModal}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
        >
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChannelAddBtn;
