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
    document.documentElement.style.setProperty("--womb-percent", `0`)

    document.documentElement.style.setProperty("--womb-eased-expo", `0`)
    document.documentElement.style.setProperty("--womb-eased-sin", `0`)
  })

  useEventListener(
    "wheel",
    (event: WheelEvent) => {
      const maxSize = Math.min(
        window.innerWidth * 2.2,
        window.innerHeight * 2.2
      )

      const minSize = startSize
      const fullDist = maxSize - minSize

      const deltaPercent = (event.deltaY * 1.2) / fullDist

      scrollPercent.current = Math.min(
        Math.max(0, scrollPercent.current + deltaPercent),
        1
      )

      const easeKeyframe = getMappedValue(
        scrollPercent.current,
        0,
        1,
        0,
        1,
        easeInQuad
      )

      let expoEasedKeyframe = getMappedValue(
        scrollPercent.current * 2.5,
        0,
        1,
        0,
        1,
        easeInExpo,
        true,
        0.5
      )

      let sinEasedKeyframe = getMappedValue(
        scrollPercent.current,
        0,
        1,
        0,
        1,
        undefined
      )

      const size = minSize + fullDist * easeKeyframe

      document.documentElement.style.setProperty("--womb-size", `${size}px`)
      document.documentElement.style.setProperty(
        "--womb-percent",
        `${scrollPercent.current * 3}`
      )

      document.documentElement.style.setProperty(
        "--womb-eased-expo",
        `${expoEasedKeyframe}`
      )

      document.documentElement.style.setProperty(
        "--womb-eased-sin",
        `${sinEasedKeyframe}`
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
        <p className="whitespace-nowrap select-none reveal-text text-4xl">
          Welcome to Eve
        </p>
      </div>
      {/* <div className="absolute" style={{ width: 500 }}>
        Ancient rabbinic texts state that as the entire world's population
        sprang from Adam, within each of us lies our own unique world.
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
