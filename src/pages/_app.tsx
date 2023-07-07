import "@/styles/globals.css"
import "@/styles/animations.css"
import "@/styles/scroll.css"
import type { AppProps } from "next/app"
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"
import { GlobalsContextProvider } from "@/GlobalsContext"
import NavBar from "@/components/NavBar"
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
    <>
      <GoogleAnalyticsTracker />
      <QueryClientProvider client={queryClient}>
        <GlobalsContextProvider>
          <Component {...pageProps} />
        </GlobalsContextProvider>
      </QueryClientProvider>
    </>
  )
}
