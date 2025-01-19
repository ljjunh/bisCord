import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { forwardRef } from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltipText: string;
  delayDuration?: number;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, tooltipText, delayDuration, onClick, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={delayDuration}>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              className="rounded-full bg-dark-gray p-2 focus:outline-none group-hover:bg-black [&>svg>path]:fill-[#C7C8CE] hover:[&>svg>path]:fill-white"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
              {...props}
            >
              {icon}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

IconButton.displayName = 'IconButton';
