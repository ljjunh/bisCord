import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

type QueryProviderProps = {
  children: ReactNode;
  client: QueryClient;
};

export const QueryProvider = ({ client, children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
