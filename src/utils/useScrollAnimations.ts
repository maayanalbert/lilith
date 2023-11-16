import { MutableRefObject, use, useEffect, useRef, useState } from "react"
import { easeInSine, easeOutQuad } from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"
import { useRouter } from "next/router"

export const startSize = 88

export function useScrollAnimations(
  scrollOverlayRef: MutableRefObject<HTMLDivElement | null>,
  hasEnteredWomb: boolean,
  setHasEnteredWomb: (_: boolean) => void,
  setScrolled: (scrolled: boolean) => void,
  setWombIsClosed: (_: boolean) => void,
  setIsInsideWomb: (_: boolean) => void,
  setSecondBlurbVisible: (_: boolean) => void,
  setThirdBlurbVisible: (_: boolean) => void,
  startOpened: boolean
) {
  const wombSize = useRef(startSize)
  const lastScrollTop = useRef<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)
    const womb = document.querySelector(".womb") as HTMLDivElement | null
    const title = document.querySelector(
      ".title"
    ) as HTMLParagraphElement | null

    if (!womb || !title) return

    womb.style.height = `${startOpened ? maxSize : startSize}px`
    womb.style.width = `${startOpened ? maxSize : startSize}px`

    title.style.opacity = startOpened ? "1" : "0"
    title.style.scale = "1"

    document.documentElement.style.setProperty("--hint-opacity", `1`)

    if (startOpened) {
      scrollOverlayRef.current?.scrollTo(0, maxSize)
      wombSize.current = maxSize
    }

    if (startOpened) {
      document.documentElement.style.setProperty("--html-overflow", `auto`)
      document.documentElement.style.setProperty(
        "--body-height",
        `${100 + 100 - 16 + 100 - 16}svh`
      )
      document.documentElement.style.setProperty("--body-background", `white`)
      document.documentElement.style.setProperty("--womb-innards-opacity", "1")
    } else {
      document.documentElement.style.setProperty("--html-overflow", `hidden`)
      document.documentElement.style.setProperty("--body-height", `100%`)
      document.documentElement.style.setProperty("--body-background", `black`)
      document.documentElement.style.setProperty("--womb-innards-opacity", "0")
    }
  }, [])

  // handle alternating between scroll overlay and window scrolling
  // on desktop only
  useEventListener(
    "wheel",
    (event) => {
      if (!scrollOverlayRef.current) return

      const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)
      const mainPageScrollable =
        scrollOverlayRef.current.style.pointerEvents === "none"

      if (mainPageScrollable && window.scrollY <= 0 && event.deltaY < 0) {
        // shrink womb
        scrollOverlayRef.current.style.pointerEvents = "auto"
      } else if (
        wombSize.current === maxSize &&
        event.deltaY > 0 &&
        router.pathname === "/"
      ) {
        // scroll within womb
        scrollOverlayRef.current.style.pointerEvents = "none"
      }
    },
    [setHasEnteredWomb, scrollOverlayRef.current, router.pathname]
  )

  // overlay scroll listener
  useEventListener(
    "scroll",
    (event) => {
      setScrolled(true)
      if (!scrollOverlayRef.current) return

      const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)

      if (
        scrollOverlayRef.current.scrollTop > maxSize &&
        navigator.maxTouchPoints > 0
      ) {
        return
      }

      if (lastScrollTop.current === null) {
        lastScrollTop.current = scrollOverlayRef.current.scrollTop
        return
      } else {
        const scrollDiff =
          scrollOverlayRef.current.scrollTop - lastScrollTop.current
        lastScrollTop.current = scrollOverlayRef.current.scrollTop
        wombSize.current = Math.max(
          Math.min(wombSize.current + scrollDiff, maxSize),
          startSize
        )
      }

      updateWombStyles(wombSize.current, maxSize)
      updateTitleStyle(wombSize.current, maxSize)

      const wombInnardsOpacity = getMappedValue(
        wombSize.current,
        maxSize - 50,
        maxSize,
        0,
        1,
        easeInSine
      )

      document.documentElement.style.setProperty(
        "--womb-innards-opacity",
        `${wombInnardsOpacity}`
      )

      setWombIsClosed(wombSize.current === startSize)
      setIsInsideWomb(wombSize.current === maxSize)

      if (wombSize.current === startSize) {
        router.push("/")
      }

      if (wombSize.current === maxSize && router.pathname === "/") {
        setHasEnteredWomb(true)
        scrollOverlayRef.current.style.pointerEvents = "none" // for mobile
        document.documentElement.style.setProperty("--html-overflow", `auto`)
        document.documentElement.style.setProperty(
          "--body-height",
          `${100 + 100 - 16 + 100 - 16}svh`
        )
        document.documentElement.style.setProperty("--body-background", `white`)
      } else {
        setSecondBlurbVisible(false)
        setThirdBlurbVisible(false)
        if (navigator.maxTouchPoints > 0) return
        document.documentElement.style.setProperty("--html-overflow", `hidden`)
        document.documentElement.style.setProperty("--body-height", `100%`)
        document.documentElement.style.setProperty("--body-background", `black`)
      }
    },
    [
      setWombIsClosed,
      setHasEnteredWomb,
      hasEnteredWomb,
      setIsInsideWomb,
      router.pathname,
      router,
    ],
    scrollOverlayRef
  )
}

/**
 * Womb styles
 */
function updateWombStyles(wombSize: number, maxSize: number) {
  const womb = document.querySelector(".womb") as HTMLDivElement | null
  if (!womb) return

  womb.style.height = `${wombSize}px`
  womb.style.width = `${wombSize}px`
}

/**
 * Title inside womb styles
 */
function updateTitleStyle(wombSize: number, maxSize: number) {
  const title = document.querySelector(".title") as HTMLDivElement | null
  if (!title) return

  const titleScale = getMappedValue(
    wombSize,
    startSize,
    maxSize,
    0.01,
    1,
    easeInSine
  )

  title.style.scale = `${titleScale}`

  const titleOpacity = getMappedValue(
    wombSize,
    startSize,
    maxSize / 2,
    0,
    1,
    easeOutQuad
  )

  title.style.opacity = `${titleOpacity}`
}

export function getMaxWombSize(windowWidth: number, windowHeight: number) {
  return (getDist(0, 0, windowWidth / 2, windowHeight / 2) + 10) * 2 * 1.5
}

export function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
