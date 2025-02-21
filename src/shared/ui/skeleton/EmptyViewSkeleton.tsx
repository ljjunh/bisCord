import { Skeleton } from './skeleton';

export const EmptyViewSkeleton = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="space-y-12 text-center">
        <Skeleton className="h-[200px] w-[400px]" />
        <Skeleton className="mx-auto h-6 w-full" />
      </div>
    </div>
  );
};
