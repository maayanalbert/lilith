import { MutableRefObject, use, useEffect, useRef, useState } from "react"
import {
  easeInCubic,
  easeInCustom,
  easeInExpo,
  easeInOutSine,
  easeInQuad,
  easeInQuart,
  easeInSine,
  easeOutQuad,
  easeOutSine,
} from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"
import { max, set } from "lodash"

export const startSize = 88

export function useScrollAnimations(
  scrollOverlayRef: MutableRefObject<HTMLDivElement | null>,
  hasEnteredWomb: boolean,
  setHasEnteredWomb: (_: boolean) => void,
  setScrolled: (scrolled: boolean) => void,
  setHasClosedWomb: (_: boolean) => void
) {
  const wombSize = useRef(startSize)
  const lastScrollTop = useRef<number | null>(null)

  useEffect(() => {
    const womb = document.querySelector(".womb") as HTMLDivElement | null
    const title = document.querySelector(
      ".title"
    ) as HTMLParagraphElement | null

    if (!womb || !title) return

    womb.style.height = `${startSize}px`
    womb.style.width = `${startSize}px`
    womb.style.filter = `blur(0px)`

    title.style.opacity = "0"
    title.style.scale = "1"

    document.documentElement.style.setProperty("--html-overflow", `hidden`)
    document.documentElement.style.setProperty("--body-height", `100%`)
    document.documentElement.style.setProperty("--hint-opacity", `1`)
    document.documentElement.style.setProperty("--body-background", `black`)
  }, [])

  // handle alternating between scroll overlay and window scrolling
  // on desktop only
  useEventListener(
    "wheel",
    (event) => {
      const navbar = document.querySelector(".navbar") as HTMLDivElement | null

      if (!scrollOverlayRef.current) return

      const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)
      const mainPageScrollable =
        scrollOverlayRef.current.style.pointerEvents === "none"

      if (mainPageScrollable && window.scrollY <= 0 && event.deltaY < 0) {
        // shrink womb
        scrollOverlayRef.current.style.pointerEvents = "auto"
        if (navbar) navbar.style.pointerEvents = "none" // need to disable navbar to allow scrolling inward when mouse is on it
      } else if (wombSize.current === maxSize && event.deltaY > 0) {
        // scroll within womb
        scrollOverlayRef.current.style.pointerEvents = "none"
        if (navbar) navbar.style.pointerEvents = "auto"
      }
    },
    [setHasEnteredWomb, scrollOverlayRef.current]
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

      if (wombSize.current === startSize) {
        if (hasEnteredWomb) {
          setHasClosedWomb(true)
        }
      }

      if (wombSize.current === maxSize) {
        setHasEnteredWomb(true)
        scrollOverlayRef.current.style.pointerEvents = "none" // for mobile
        document.documentElement.style.setProperty("--html-overflow", `auto`)
        document.documentElement.style.setProperty(
          "--body-height",
          `${100 + 100 - 16 + 100 - 16}svh`
        )
        document.documentElement.style.setProperty("--body-background", `white`)
      } else {
        if (navigator.maxTouchPoints > 0) return
        document.documentElement.style.setProperty("--html-overflow", `hidden`)
        document.documentElement.style.setProperty("--body-height", `100%`)
        document.documentElement.style.setProperty("--body-background", `black`)
      }
    },
    [setHasClosedWomb, setHasEnteredWomb, hasEnteredWomb],
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
