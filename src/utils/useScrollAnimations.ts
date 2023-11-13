import { MutableRefObject, useEffect, useRef } from "react"
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

export const startSize = 88

export function useScrollAnimations(
  scrollOverlayRef: MutableRefObject<HTMLDivElement | null>,
  setMainPageScrollable: (mainPageScrollable: boolean) => void,
  setIsInsideWomb: (isInsideWomb: boolean) => void,
  isInsideWomb: boolean
) {
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
  }, [])

  useEventListener(
    "scroll",
    () => {
      if (!scrollOverlayRef.current || isInsideWomb) return

      const maxSize = getMaxWombSize(window.innerWidth, window.innerHeight)

      const wombSize = Math.min(
        scrollOverlayRef.current.scrollTop + startSize,
        maxSize
      )

      updateWombStyles(wombSize, maxSize)
      updateTitleStyle(wombSize, maxSize)
      updateHintStyles(wombSize, maxSize)

      setIsInsideWomb(wombSize === maxSize)

      if (wombSize === maxSize) {
        setTimeout(() => {
          document.documentElement.style.setProperty("--html-overflow", `auto`)
          document.documentElement.style.setProperty(
            "--body-height",
            `${100 + 100 - 16 + 100 - 16}svh`
          )
          setMainPageScrollable(true)
        }, 750)
      }
    },
    [setIsInsideWomb, setMainPageScrollable, scrollOverlayRef.current],
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
