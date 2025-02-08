import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface ChannelAddBtnProps {
  handleModal?: () => void | null;
  text: string;
  icon: React.ReactElement;
  locate: string;
}

export const ChannelAddBtn = ({ handleModal, text, icon }: ChannelAddBtnProps) => {
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
