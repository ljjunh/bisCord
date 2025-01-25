import { toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({}),
  mutationCache: new MutationCache({
    onError: (error, _requestData, _context, mutation) => {
      if (!mutation.meta?.ignoreToast) {
        toast.error(error.message);
      }
    },
  }),
});
