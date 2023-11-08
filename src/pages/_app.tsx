import "@/styles/globals.css"
import "@/styles/animations.css"

import type { AppProps } from "next/app"
import { useMemo } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: true,
          },
        },
      }),
    []
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
