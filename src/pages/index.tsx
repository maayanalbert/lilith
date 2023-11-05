import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useMousePercentToCenterCss } from "@/utils/useMousePercentToCenterCss"
import { get, min } from "lodash"
import { useEffect, useRef, useState } from "react"

const startSize = 77

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  const scrollValue = useRef(startSize)

  useEffect(() => {
    document.documentElement.style.setProperty("--womb-size", `${startSize}px`)
    document.documentElement.style.setProperty("--womb-blur", `0px`)
    document.documentElement.style.setProperty("--text-scale", `1px`)
    document.documentElement.style.setProperty("--text-opacity", `0`)
    document.documentElement.style.setProperty("--text-blur", `2px`)
    document.documentElement.style.setProperty("--blurb-opacity", `0`)
  })

  useEventListener(
    "wheel",
    (event: WheelEvent) => {
      const maxSize =
        (getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) + 10) * 2

      scrollValue.current = Math.min(
        Math.max(startSize, scrollValue.current + event.deltaY),
        maxSize
      )

      const wombSize = scrollValue.current
      document.documentElement.style.setProperty("--womb-size", `${wombSize}px`)

      const wombBlur = getMappedValue(wombSize, startSize, maxSize, 0, 10)
      document.documentElement.style.setProperty("--womb-blur", `${wombBlur}px`)

      const textScale = getMappedValue(wombSize, startSize, maxSize, 1, 2)
      document.documentElement.style.setProperty("--text-scale", `${textScale}`)

      const textOpacity =
        wombSize < (2 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              startSize,
              (2 * maxSize) / 7,
              0,
              1,
              easeInCubic
            )
          : wombSize > (3.75 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              (3.75 * maxSize) / 7,
              maxSize,
              1,
              1,
              easeInCubic
            )
          : 1

      document.documentElement.style.setProperty(
        "--text-opacity",
        `${textOpacity}`
      )

      const textBlur =
        wombSize < (2 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              startSize,
              (2 * maxSize) / 7,
              2,
              0,
              easeInCubic
            )
          : wombSize > (3.75 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              (3.75 * maxSize) / 7,
              maxSize,
              0,
              0,
              easeInCubic
            )
          : 0

      document.documentElement.style.setProperty("--text-blur", `${textBlur}px`)

      const blurbOpacity = wombSize === maxSize ? 1 : 0
      document.documentElement.style.setProperty(
        "--blurb-opacity",
        `${blurbOpacity}`
      )
    },
    []
  )

  return (
    <div
      className="h-full flex justify-center items-center"
      style={{ width: "300%", marginLeft: "-100%" }}
    >
      <div className="rounded-full expand-womb bg-white fade-in-womb" />
      <div className="absolute flex h-full w-full justify-center items-center top-0">
        <p className="whitespace-nowrap select-none reveal-text sm:text-4xl text-xl pointer-none">
          Welcome to Eve
        </p>
      </div>
      {/* <div className="absolute reveal-blurb" style={{ width: 500 }}>
        Eve is a space for you.
        <br />
        <br />
        Ancient rabbinic texts state that since the world's population sprang
        from Adam, within each of us lies an entire world.
        <br />
        <br />
        Join the waitlist to discover yours.
      </div> */}
    </div>
  )
}

function easeInQuad(x: number): number {
  return x * x
}

function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function easeInQuart(x: number): number {
  return x * x * x * x
}

function easeInCubic(x: number): number {
  return x * x * x
}
