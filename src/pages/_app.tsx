import "@/styles/globals.css"
import "@/styles/animations.css"

import type { AppProps } from "next/app"
import { useEffect, useMemo } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { StateContextProvider } from "@/StateContext"

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

  useEffect(() => {
    document.title = "Eve"
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </QueryClientProvider>
  )
}
