'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

type ApiErrorResponse = {
  message?: string;
};
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            onError: (error: unknown) => {
              let errorMessage = 'An error occurred. Please try again.';

              if (isAxiosError<ApiErrorResponse>(error)) {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
              } else if (error instanceof Error) {
                errorMessage = error.message;
              }

              toast.error(errorMessage);
            },
          },
        },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
