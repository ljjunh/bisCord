import { Skeleton } from './skeleton';

export const ModalSkeleton = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-60">
      <div className="relative flex w-full max-w-md flex-col items-center gap-4 overflow-hidden rounded-lg bg-mid-gray px-8 py-12 text-center shadow-lg">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
