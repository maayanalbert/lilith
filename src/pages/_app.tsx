import "@/styles/globals.css"
import "@/styles/animations.css"
import "@/styles/scroll.css"
import type { AppProps } from "next/app"
import { GlobalsContextProvider } from "@/GlobalsContext"
import { useMemo } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { SpaceContextProvider } from "@/SpaceContext"

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
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalsContextProvider>
          <SpaceContextProvider>
            <Component {...pageProps} />
          </SpaceContextProvider>
        </GlobalsContextProvider>
      </QueryClientProvider>
    </>
  )
}
