import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface TooltipButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  tooltipText: string;
  delayDuration?: number;
  hoverColor?: string;
  disabled?: boolean;
}

export const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  (
    {
      icon,
      tooltipText,
      delayDuration,
      disabled,
      hoverColor = 'white',
      onClick,
      ...buttonAttributes
    },
    ref,
  ) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={delayDuration}>
          <TooltipTrigger asChild>
            <button
              ref={ref}
              disabled={disabled}
              className={cn(
                'rounded-full bg-dark-gray p-2 focus:outline-none group-hover:bg-black [&>svg>path]:fill-[#C7C8CE]',
                {
                  'hover:[&>svg>path]:fill-white': hoverColor === 'white',
                  'hover:[&>svg>path]:fill-green': hoverColor === 'green',
                  'hover:[&>svg>path]:fill-red': hoverColor === 'red',
                  'cursor-not-allowed opacity-50': disabled,
                },
              )}
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

TooltipButton.displayName = 'WithTooltipButton';
