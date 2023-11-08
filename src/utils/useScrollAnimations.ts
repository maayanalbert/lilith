import { MutableRefObject, useEffect, useRef } from "react"
import {
  easeInCustom,
  easeInExpo,
  easeInQuad,
  easeInQuart,
  easeInSine,
  easeOutQuad,
  easeOutSine,
} from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"

const startSize = 77

export function useScrollAnimations(
  scrollOverlayRef: MutableRefObject<HTMLDivElement | null>,
  setMainPageScrollable: (mainPageScrollable: boolean) => void,
  setIsInsideWomb: (isInsideWomb: boolean) => void
) {
  useEffect(() => {
    document.documentElement.style.setProperty("--html-overflow", `hidden`)
    document.documentElement.style.setProperty("--womb-size", `${startSize}px`)
    document.documentElement.style.setProperty("--womb-blur", `0px`)
    document.documentElement.style.setProperty("--text-scale", `1px`)
    document.documentElement.style.setProperty("--text-opacity", `0`)
    document.documentElement.style.setProperty("--text-blur", `2px`)
    document.documentElement.style.setProperty("--hint-scale", `1`)
    document.documentElement.style.setProperty(
      "--hint-dist",
      `${startSize * 2 + 25}px`
    )
    document.documentElement.style.setProperty(
      "--hint-letter-spacing",
      `0.1rem`
    )
  }, [])

  useEventListener(
    "scroll",
    () => {
      if (!scrollOverlayRef.current) return

      const maxSize =
        (getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) + 10) *
        2 *
        2

      const wombSize = Math.min(
        scrollOverlayRef.current.scrollTop + startSize,
        maxSize
      )

      updateWheelAnimations(
        wombSize,
        maxSize,
        setIsInsideWomb,
        setMainPageScrollable
      )
    },
    [updateWheelAnimations, scrollOverlayRef.current],
    scrollOverlayRef
  )
}

function updateWheelAnimations(
  wombSize: number,
  maxSize: number,
  setIsInsideWomb: (isInsideWomb: boolean) => void,
  setMainPageScrollable: (mainPageScrollable: boolean) => void
) {
  document.documentElement.style.setProperty("--womb-size", `${wombSize}px`)

  const wombBlur = getMappedValue(wombSize, startSize, maxSize, 0, 10)
  document.documentElement.style.setProperty("--womb-blur", `${wombBlur}px`)

  const hintScale = getMappedValue(wombSize, startSize, maxSize, 1, 24)
  document.documentElement.style.setProperty("--hint-scale", `${hintScale}`)

  const hintDist = getMappedValue(
    wombSize,
    startSize,
    maxSize,
    startSize * 2 + 25,
    maxSize * 2.25
  )

  document.documentElement.style.setProperty("--hint-dist", `${hintDist}px`)

  const hintLetterSpacing = getMappedValue(
    wombSize,
    startSize,
    maxSize,
    0.1,
    1.5
  )

  document.documentElement.style.setProperty(
    "--hint-letter-spacing",
    `${hintLetterSpacing}rem`
  )

  const textScale = getMappedValue(
    wombSize,
    startSize,
    maxSize,
    1,
    12,
    easeInQuad
  )
  document.documentElement.style.setProperty("--text-scale", `${textScale}`)

  const textOpacity =
    wombSize < (2 * maxSize) / 7
      ? getMappedValue(wombSize, startSize, (2 * maxSize) / 7, 0, 1, easeInSine)
      : wombSize > (3 * maxSize) / 7
      ? getMappedValue(wombSize, (3 * maxSize) / 7, maxSize, 1, 0)
      : 1

  document.documentElement.style.setProperty("--text-opacity", `${textOpacity}`)

  const textBlur =
    wombSize < (2 * maxSize) / 7
      ? getMappedValue(wombSize, startSize, (2 * maxSize) / 7, 2, 0, easeInSine)
      : wombSize > (3 * maxSize) / 7
      ? getMappedValue(wombSize, (3 * maxSize) / 7, maxSize, 0, 2)
      : 0

  document.documentElement.style.setProperty("--text-blur", `${textBlur}px`)

  const blurbOpacity = wombSize === maxSize ? 1 : 0
  document.documentElement.style.setProperty(
    "--blurb-opacity",
    `${blurbOpacity}`
  )

  setIsInsideWomb(wombSize === maxSize)

  if (wombSize === maxSize) {
    setTimeout(() => {
      document.documentElement.style.setProperty("--html-overflow", `auto`)
      setMainPageScrollable(true)
    }, 750)
  }
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
