import { Skeleton } from './skeleton';

export const MainLayoutSkeleton = () => {
  return (
    <div className="relative flex h-full w-full flex-row bg-mid-gray">
      <div className="flex h-[100vh] flex-col rounded-tl-lg bg-dark-gray pt-3">
        <div className="flex-1 overflow-y-auto">
          <div className="mx-2 flex items-center gap-3 rounded py-3">
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="px-2">
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="flex min-w-64 flex-col">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="mx-2 flex items-center gap-3 rounded px-4 py-2"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black p-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>

      <div className="bg-darker-gray flex-1">
        <div className="flex items-center gap-4 border-b border-black px-4 py-3">
          <Skeleton className="h-6 w-12" />

          <div className="h-6 w-[1px] bg-gray" />

          <div className="flex gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton
                key={i}
                className="h-6 w-16"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
