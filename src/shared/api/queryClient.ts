import { AxiosError } from 'axios';
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
      if (mutation.meta?.ignoreToast) return;
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? '에러가 발생했습니다');
        return;
      }
      toast.error(error.message);
    },
  }),
});
