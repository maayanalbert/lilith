import "@/styles/globals.css"
import "@/styles/animations.css"

import type { AppProps } from "next/app"
import { useEffect, useMemo } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { StateContextProvider } from "@/StateContext"
import Womb from "@/components/Womb"
import NavBar from "@/components/NavBar"
import ScrollOverlay from "@/components/ScrollOverlay"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

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
      <StateContextProvider startOpened={pathname !== "/"}>
        <>
          <div className="w-full h-full overflow-hidden relative">
            <Womb />
            <NavBar />
            <Component {...pageProps} />
          </div>
          <ScrollOverlay />
        </>
      </StateContextProvider>
    </QueryClientProvider>
  )
}
