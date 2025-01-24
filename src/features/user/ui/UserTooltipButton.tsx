import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface UserTooltipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  tooltipText: string;
  delayDuration?: number;
  bgColor?: string;
  hoverColor?: string;
  disabled?: boolean;
}

export const UserTooltipButton = forwardRef<HTMLButtonElement, UserTooltipButtonProps>(
  ({ icon, tooltipText, delayDuration = 100, disabled, onClick, ...buttonAttributes }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={delayDuration}>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              disabled={disabled}
              className={cn('rounded-sm p-2 hover:bg-mid-gray focus:outline-none', {
                'cursor-not-allowed opacity-50': disabled,
              })}
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
              {...buttonAttributes}
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

UserTooltipButton.displayName = 'WithTooltipButton';
