import { MutableRefObject, useEffect, useRef } from "react"
import {
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
import { time } from "console"

const startSize = 77

export function useWheelAnimations(
  scrollable: MutableRefObject<boolean>,
  setIsInsideWomb: (isInsideWomb: boolean) => void
) {
  const wombSize = useRef(startSize)
  const startTime = useRef(0)
  const animationInterrupted = useRef(false)

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
      `${startSize * 2}px`
    )
  }, [])

  function animateZoom(timeStamp: number) {
    if (animationInterrupted.current) return

    const timeElapsed = timeStamp - startTime.current
    const easeKeyframe = easeInOutSine(timeElapsed / 2000) // ms animation

    const maxSize =
      (getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) + 10) *
      2 *
      2

    const wombSize = (maxSize - startSize) * easeKeyframe + startSize

    updateWheelAnimations(wombSize, maxSize, setIsInsideWomb, scrollable)

    if (timeElapsed < 2000) {
      requestAnimationFrame(animateZoom)
    }
  }

  useEventListener(
    "wheel",
    (event: WheelEvent) => {
      if (scrollable.current) return

      const maxSize =
        (getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) + 10) *
        2 *
        2

      wombSize.current = Math.min(
        Math.max(startSize, wombSize.current + event.deltaY),
        maxSize
      )

      updateWheelAnimations(
        wombSize.current,
        maxSize,
        setIsInsideWomb,
        scrollable
      )

      if (wombSize.current > (2 * maxSize) / 7) {
        animateZoom(performance.now())
      }
    },
    []
  )
}

function updateWheelAnimations(
  wombSize: number,
  maxSize: number,
  setIsInsideWomb: (isInsideWomb: boolean) => void,
  scrollable: MutableRefObject<boolean>
) {
  document.documentElement.style.setProperty("--womb-size", `${wombSize}px`)

  const wombBlur = getMappedValue(wombSize, startSize, maxSize, 0, 10)
  document.documentElement.style.setProperty("--womb-blur", `${wombBlur}px`)

  const hintScale = getMappedValue(wombSize, startSize, maxSize, 1, 24)
  document.documentElement.style.setProperty("--hint-scale", `${hintScale}`)

  document.documentElement.style.setProperty("--hint-dist", `${wombSize * 2}px`)

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

  if (wombSize === maxSize && !scrollable.current) {
    scrollable.current = true
    setTimeout(() => {
      document.documentElement.style.setProperty("--html-overflow", `auto`)
    }, 750)
  }
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
