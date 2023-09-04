import MainPage from "@/components/MainPage"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  useCardSize,
  useIsMobile,
  useLowColor,
  useMidColor,
} from "@/GlobalsContext"

/**
 * A wrapper for the main page
 */
export default function Home() {
  const cardSize = useCardSize()
  const isMobile = useIsMobile()
  const midColor = useMidColor()
  const fadeInTitle = useMidColor()
  const lowColor = useLowColor()

  useEffect(() => {
    document.title = "Eve"
  }, [])

  // don't draw anything until we have a tile size
  if (
    !cardSize ||
    isMobile === undefined ||
    !midColor ||
    fadeInTitle === undefined ||
    !lowColor
  )
    return null

  return <MainPage />
}
