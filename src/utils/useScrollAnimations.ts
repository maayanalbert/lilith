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

const startSize = 88

export function useScrollAnimations(
  scrollOverlayRef: MutableRefObject<HTMLDivElement | null>,
  setMainPageScrollable: (mainPageScrollable: boolean) => void,
  setIsInsideWomb: (isInsideWomb: boolean) => void
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
    title.style.filter = `blur(2px)`

    document.documentElement.style.setProperty("--html-overflow", `hidden`)
    document.documentElement.style.setProperty("--hint-scale", `1`)
    document.documentElement.style.setProperty(
      "--hint-dist",
      `${startSize * 2 + 25}px`
    )
    document.documentElement.style.setProperty(
      "--hint-letter-spacing",
      `0.1rem`
    )
    document.documentElement.style.setProperty("--womb-blur", `0px`)
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

      updateWombStyles(wombSize, maxSize)
      updateTitleStyle(wombSize, maxSize)
      updateHintStyles(wombSize, maxSize)

      setIsInsideWomb(wombSize === maxSize)

      if (wombSize === maxSize) {
        setTimeout(() => {
          document.documentElement.style.setProperty("--html-overflow", `auto`)
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

  // update womb values
  const wombBlur = getMappedValue(wombSize, startSize, maxSize, 0, 10)

  womb.style.height = `${wombSize}px`
  womb.style.width = `${wombSize}px`
  womb.style.filter = `blur(${wombBlur}px)`
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
    0.5,
    15,
    easeInQuad
  )

  title.style.scale = `${titleScale}`

  const titleOpacity =
    wombSize < (2.75 * maxSize) / 7
      ? getMappedValue(
          wombSize,
          startSize,
          (2.75 * maxSize) / 7,
          0,
          1,
          easeInSine
        )
      : wombSize > (3 * maxSize) / 7
      ? getMappedValue(wombSize, (3 * maxSize) / 7, maxSize, 1, 0)
      : 1

  title.style.opacity = `${titleOpacity}`

  const titleBlur =
    wombSize < (2.75 * maxSize) / 7
      ? getMappedValue(
          wombSize,
          startSize,
          (2.75 * maxSize) / 7,
          2,
          0,
          easeInSine
        )
      : wombSize > (3 * maxSize) / 7
      ? getMappedValue(wombSize, (3 * maxSize) / 7, maxSize, 0, 2)
      : 0

  title.style.filter = `blur(${titleBlur}px)`
}

/**
 * Hint styles
 */
function updateHintStyles(wombSize: number, maxSize: number) {
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

  const wombBlur = getMappedValue(wombSize, startSize, maxSize, 0, 10)
  document.documentElement.style.setProperty("--womb-blur", `${wombBlur}px`)
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
