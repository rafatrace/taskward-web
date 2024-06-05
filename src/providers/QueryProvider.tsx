import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 60 * 1000, // 20 minutes
            retry: false
          }
        }
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
