import TitleSection from "@/components/TitleSection"
import { easeInQuad, easeInSine } from "@/utils/easingFns"
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
  const [blurbVisible, setBlurbVisible] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty("--womb-size", `${startSize}px`)
    document.documentElement.style.setProperty("--womb-blur", `0px`)
    document.documentElement.style.setProperty("--text-scale", `1px`)
    document.documentElement.style.setProperty("--text-opacity", `0`)
    document.documentElement.style.setProperty("--text-blur", `2px`)
    document.documentElement.style.setProperty("--footer-margin-top", `-32px`)
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
      console.log(wombSize)

      const footerMarginTop = Math.min(Math.max(-32, wombSize - 77 - 32), 0)

      console.log(footerMarginTop)
      document.documentElement.style.setProperty(
        "--footer-margin-top",
        `${footerMarginTop}px`
      )
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
              easeInSine
            )
          : wombSize > (6 * maxSize) / 7
          ? getMappedValue(
              wombSize,
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
        wombSize < (3 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              startSize,
              (3 * maxSize) / 7,
              2,
              0,
              easeInSine
            )
          : wombSize > (6 * maxSize) / 7
          ? getMappedValue(
              wombSize,
              (6 * maxSize) / 7,
              maxSize,
              0,
              2,
              easeInSine
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
      <div className="w-full" style={{ height: "50%" }}>
        <TitleSection blurbVisible={blurbVisible} />
        <div
          className="absolute w-full footer-descend"
          style={{ height: 56, top: "100%" }}
        >
          <div
            className="w-full flex justify-center items-center font-light"
            style={{
              color: "gray",
              borderTopWidth: 1,
              borderColor: "gray",
              padding: 16,
            }}
          >
            Genesis - 3:13
          </div>
        </div>
      </div>
      <div
        className="w-full flex items-center justify-center text-black"
        style={{
          height: "50%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="w-[350px] sm:w-[530px] text-center sm:text-lg">
          <p>Eve will launch as a mobile app this summer.</p>
          <div className="h-2" />

          <p className="font-light">
            To learn more, contact <u>maayan@eve.space.</u>
          </p>
        </div>
      </div>
    </div>
  )
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
