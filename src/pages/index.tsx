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

  const scrollPercent = useRef(0)

  useEffect(() => {
    document.documentElement.style.setProperty("--womb-size", `${startSize}px`)
    document.documentElement.style.setProperty("--overflow-status", "hidden")
  })

  useEventListener(
    "wheel",
    (event: WheelEvent) => {
      const maxSize = Math.min(
        window.innerWidth * 0.77,
        window.innerHeight * 0.77
      )

      const minSize = startSize
      const dist = maxSize - minSize

      const deltaPercent = event.deltaY / dist

      ;(scrollPercent.current = Math.max(
        0,
        scrollPercent.current + deltaPercent
      )),
        1

      const easeKeyframe = getMappedValue(
        scrollPercent.current,
        0,
        1,
        0,
        1,
        easeInQuad
      )

      const size = minSize + dist * easeKeyframe

      document.documentElement.style.setProperty("--womb-size", `${size}px`)
      document.documentElement.style.setProperty(
        "--womb-percent",
        `${scrollPercent.current}`
      )
      document.documentElement.style.setProperty(
        "--overflow-status",
        scrollPercent.current === 1 ? "auto" : "hidden"
      )
    },
    []
  )

  return (
    <div style={{ width: "100%", height: "200%" }}>
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "50%" }}
      >
        <div className="rounded-full expand-womb bg-white fade-in-womb flex h-full w-full justify-center items-center">
          {/* <p className="whitespace-nowrap select-none">Welcome to Eve</p> */}
        </div>
      </div>
      <div style={{ width: "100%", height: "50%" }}>
        Rabbinic texts something something
      </div>
    </div>
  )
}

function easeInQuad(x: number): number {
  return x * x
}

// Ancient rabbinic texts state that, as Adam was one person, from whom the population of an entire world came forth
// Ancient rabbinic texts state that
