import { cn } from '@/shared/lib/utils/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray', className)}
      {...props}
    />
  );
}

export { Skeleton };
