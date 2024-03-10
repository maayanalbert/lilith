import "@/styles/globals.css"
import "@/styles/animations.css"

import type { AppProps } from "next/app"
import { useEffect, useMemo } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
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

    // append p5 tag
    // Create a script element
    const scriptElement = document.createElement("script")

    // Set the type attribute
    scriptElement.type = "text/javascript"

    // Set the source attribute
    scriptElement.src = "https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.min.js"

    // Append the script element to the head of the document
    document.head.appendChild(scriptElement)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
