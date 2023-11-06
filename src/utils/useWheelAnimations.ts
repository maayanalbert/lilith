import { MutableRefObject, useEffect, useRef } from "react"
import { easeInSine } from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"

const startSize = 77

export function useWheelAnimations(
  scrollable: MutableRefObject<boolean>,
  setIsInsideWomb: (isInsideWomb: boolean) => void
) {
  const wombSize = useRef(startSize)

  useEffect(() => {
    document.documentElement.style.setProperty("--womb-size", `${startSize}px`)
    document.documentElement.style.setProperty("--womb-blur", `0px`)
    document.documentElement.style.setProperty("--text-scale", `1px`)
    document.documentElement.style.setProperty("--text-opacity", `0`)
    document.documentElement.style.setProperty("--text-blur", `2px`)
  }, [])

  useEventListener(
    "wheel",
    (event: WheelEvent) => {
      if (scrollable.current) return

      const maxSize =
        (getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) + 10) * 2

      wombSize.current = Math.min(
        Math.max(startSize, wombSize.current + event.deltaY),
        maxSize
      )

      document.documentElement.style.setProperty(
        "--womb-size",
        `${wombSize.current}px`
      )

      const wombBlur = getMappedValue(
        wombSize.current,
        startSize,
        maxSize,
        0,
        10
      )
      document.documentElement.style.setProperty("--womb-blur", `${wombBlur}px`)

      const textScale = getMappedValue(
        wombSize.current,
        startSize,
        maxSize,
        1,
        2
      )
      document.documentElement.style.setProperty("--text-scale", `${textScale}`)

      const textOpacity =
        wombSize.current < (3.75 * maxSize) / 7
          ? getMappedValue(
              wombSize.current,
              startSize,
              (3.75 * maxSize) / 7,
              0,
              1,
              easeInSine
            )
          : wombSize.current > (6 * maxSize) / 7
          ? getMappedValue(
              wombSize.current,
              (5 * maxSize) / 7,
              maxSize,
              1,
              0,
              easeInSine
            )
          : 1

      document.documentElement.style.setProperty(
        "--text-opacity",
        `${textOpacity}`
      )

      const textBlur =
        wombSize.current < (3 * maxSize) / 7
          ? getMappedValue(
              wombSize.current,
              startSize,
              (3 * maxSize) / 7,
              2,
              0,
              easeInSine
            )
          : wombSize.current > (6 * maxSize) / 7
          ? getMappedValue(
              wombSize.current,
              (6 * maxSize) / 7,
              maxSize,
              0,
              2,
              easeInSine
            )
          : 0

      document.documentElement.style.setProperty("--text-blur", `${textBlur}px`)

      const blurbOpacity = wombSize.current === maxSize ? 1 : 0
      document.documentElement.style.setProperty(
        "--blurb-opacity",
        `${blurbOpacity}`
      )

      setIsInsideWomb(wombSize.current === maxSize)

      if (wombSize.current === maxSize && !scrollable.current) {
        scrollable.current = true
        setTimeout(() => {
          document.documentElement.style.setProperty("--html-overflow", `auto`)
        }, 750)
      }
    },
    []
  )
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
