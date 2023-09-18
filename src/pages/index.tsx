import MainPage from "@/components/MainPage"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/router"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  return <MainPage />
}
