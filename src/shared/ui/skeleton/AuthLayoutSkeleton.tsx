import { Skeleton } from './skeleton';

export const AuthLayoutSkeleton = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-blue">
      <header className="absolute left-10 top-10">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-32" />
        </div>
      </header>

      <section className="w-full max-w-md rounded-md bg-mid-gray p-8">
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto h-8 w-64" />
        </div>

        <div className="space-y-8">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </section>
    </main>
  );
};
