import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltipText: string;
  delayDuration?: number;
  hoverColor?: string;
  disabled?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, tooltipText, delayDuration, disabled, hoverColor = 'white', onClick, ...props },
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
