import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
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
  const [blurbVisible, setBlurbVisible] = useState(true)

  useEffect(() => {
    document.documentElement.style.setProperty("--womb-size", `${50000000}px`)
    document.documentElement.style.setProperty("--womb-blur", `0px`)
    document.documentElement.style.setProperty("--text-scale", `1px`)
    document.documentElement.style.setProperty("--text-opacity", `0`)
    document.documentElement.style.setProperty("--text-blur", `2px`)
  }, [])

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
        wombSize < (3.75 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              startSize,
              (3.75 * maxSize) / 7,
              0,
              1,
              easeInQuad
            )
          : wombSize > (6 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              (5 * maxSize) / 7,
              maxSize,
              1,
              0,
              easeInQuad
            )
          : 1

      document.documentElement.style.setProperty(
        "--text-opacity",
        `${textOpacity}`
      )

      const textBlur =
        wombSize < (3 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              startSize,
              (3 * maxSize) / 7,
              2,
              0,
              easeInQuad
            )
          : wombSize > (6 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              (6 * maxSize) / 7,
              maxSize,
              0,
              2,
              easeInQuad
            )
          : 0

      document.documentElement.style.setProperty("--text-blur", `${textBlur}px`)

      const blurbOpacity = wombSize === maxSize ? 1 : 0
      document.documentElement.style.setProperty(
        "--blurb-opacity",
        `${blurbOpacity}`
      )

      setBlurbVisible(wombSize === maxSize)
    },
    []
  )

  return (
    <div className="w-full" style={{ height: "200%" }}>
      <div
        className="flex justify-center items-center"
        style={{ width: "300%", marginLeft: "-100%", height: "50%" }}
      >
        <div className="rounded-full expand-womb bg-white fade-in-womb" />
        <div className="absolute flex h-full w-full justify-center items-center top-0">
          <p className="whitespace-nowrap select-none reveal-text sm:text-4xl text-xl cursor-default">
            Welcome to Eve
          </p>
        </div>

        <div
          className={`absolute flex flex-col w-[350px] sm:w-[520px] text-center sm:text-lg ${
            blurbVisible ? "" : "cursor-default"
          }`}
          style={{
            transitionProperty: "opacity",
            transitionDuration: blurbVisible ? "500ms" : "0ms",
            transitionDelay: blurbVisible ? "300ms" : "0ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: blurbVisible ? 1 : 0,
            color: "rgb(100, 100, 100)",
          }}
        >
          <p className="sm:text-[19px]" style={{ color: "black" }}>
            Eve is a space for your thoughts
          </p>
          <div className="h-6" />
          <p>
            Ancient rabbinic texts state that, as the earth's population sprang
            from Adam, each human soul contains its own unique world.
          </p>
          <div className="h-6" />
          <p>Within Eve, you'll uncover yours.</p>
        </div>
      </div>
      {/* <div
        className="h-full w-full flex items-center justify-center"
        style={{ marginTop: -500 }}
      >
        <div
          className={`absolute flex flex-col w-[350px] sm:w-[520px] text-center sm:text-lg ${
            blurbVisible ? "" : "cursor-default"
          }`}
          style={{
            transitionProperty: "opacity",
            transitionDuration: blurbVisible ? "500ms" : "0ms",
            transitionDelay: blurbVisible ? "300ms" : "0ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: blurbVisible ? 1 : 0,
            color: "rgb(88, 88, 88)",
          }}
        >
          <p>Eve is a space for your thoughts.</p>
          <div className="h-6" />
          <p>
            Ancient rabbinic texts state that, as the earth's population sprang
            from Adam, each human soul contains its own unique world.
          </p>
          <div className="h-6" />
          <p>Within Eve, you'll uncover yours.</p>
        </div>
      </div> */}
    </div>
  )
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

function easeInQuad(x: number): number {
  return x * x
}

function easeInCubic(x: number): number {
  return x * x * x
}

function easeInQuart(x: number): number {
  return x * x * x * x
}

function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
