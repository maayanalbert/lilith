import { MutableRefObject, useEffect, useRef, useState } from "react"
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
import { set } from "lodash"

export const startSize = 88

export function useScrollAnimations(
  scrollOverlayRef: MutableRefObject<HTMLDivElement | null>,
  hasEnteredWomb: boolean,
  setHasEnteredWomb: (_: boolean) => void,
  setScrolled: (scrolled: boolean) => void,
  setIsInsideWomb: (_: boolean) => void,
  setHintVisible: (_: boolean) => void
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
  // TODO: handle for mobile
  useEventListener(
    "wheel",
    (event) => {
      if (!scrollOverlayRef.current) return

      const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)
      const mainPageScrollable =
        scrollOverlayRef.current.style.pointerEvents === "none"
      if (mainPageScrollable && window.scrollY <= 0 && event.deltaY < 0) {
        scrollOverlayRef.current.style.pointerEvents = "auto"
      }
      if (wombSize.current === maxSize && event.deltaY > 0) {
        scrollOverlayRef.current.style.pointerEvents = "none"
      }
    },
    [setHasEnteredWomb, scrollOverlayRef.current]
  )

  useEventListener(
    "scroll",
    (event) => {
      setScrolled(true)
      if (!scrollOverlayRef.current) return

      const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)

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
      updateHintStyles(wombSize.current, maxSize)
      setIsInsideWomb(wombSize.current === maxSize)

      if (wombSize.current === startSize && hasEnteredWomb) {
        setHintVisible(true)
      }

      if (wombSize.current === maxSize) {
        if (!hasEnteredWomb) {
          setHintVisible(false)
        }
        setHasEnteredWomb(true)

        document.documentElement.style.setProperty("--html-overflow", `auto`)
        document.documentElement.style.setProperty(
          "--body-height",
          `${100 + 100 - 16 + 100 - 16}svh`
        )
        document.documentElement.style.setProperty("--body-background", `white`)
      } else {
        document.documentElement.style.setProperty("--html-overflow", `hidden`)
        document.documentElement.style.setProperty("--body-height", `100%`)
        document.documentElement.style.setProperty("--body-background", `black`)
      }
    },
    [setHasEnteredWomb, scrollOverlayRef.current, hasEnteredWomb],
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
    0.1,
    1,
    easeInQuad
  )

  title.style.scale = `${titleScale}`

  const titleOpacity = getMappedValue(wombSize, startSize, maxSize, 0, 1)

  title.style.opacity = `${titleOpacity}`
}

/**
 * Hint styles
 */
function updateHintStyles(wombSize: number, maxSize: number) {
  const hintOpacity = getMappedValue(
    wombSize,
    startSize,
    window.innerHeight * 0.5 * 0.65,
    1,
    0,
    easeOutSine
  )
  document.documentElement.style.setProperty("--hint-opacity", `${hintOpacity}`)
}

export function getMaxWombSize(windowWidth: number, windowHeight: number) {
  return (getDist(0, 0, windowWidth / 2, windowHeight / 2) + 10) * 2 * 1.5
}

export function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
