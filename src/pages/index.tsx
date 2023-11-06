import TitleSection from "@/components/TitleSection"
import { easeInQuad, easeInSine } from "@/utils/easingFns"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useWheelAnimations } from "@/utils/useWheelAnimations"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"

const startSize = 77

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  const scrollable = useRef(false) // for timeout, need to set css property seperately
  const [isInsideWomb, setIsInsideWomb] = useState(false)

  useWheelAnimations(scrollable, setIsInsideWomb)

  useEffect(() => {
    // updated by wheel and scrolling
    document.documentElement.style.setProperty("--html-overflow", `hidden`)
  }, [])

  useEffect(() => {
    // updated by scrolling
    document.documentElement.style.setProperty("--chevron-down-opacity", "1")
    document.documentElement.style.setProperty("--chevron-down-blur", "0px")
  }, [])

  useEventListener("scroll", () => {
    const chevronDownOpacity = getMappedValue(window.scrollY, 0, 85, 1, 0)

    document.documentElement.style.setProperty(
      "--chevron-down-opacity",
      `${chevronDownOpacity}`
    )

    const chevronDownBlur = getMappedValue(window.scrollY, 0, 85, 0, 1)
    document.documentElement.style.setProperty(
      "--chevron-down-blur",
      `${chevronDownBlur}px`
    )
  })

  return (
    <div className="w-full h-full">
      <div className="w-full" style={{ height: "50%" }}>
        <TitleSection blurbVisible={isInsideWomb} />
      </div>
      <div
        className="w-full flex items-center justify-center bg-white text-black"
        style={{
          height: "50%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="w-[350px] sm:w-[530px] text-center text-center sm:text-lg font-light">
          <p className="text-lg sm:text-xl font-normal">Take a bite</p>

          <div className="h-6" />
          <p>Eve will launch as a mobile app this summer.</p>
          <p>
            To learn more, contact <u>maayan@eve.space.</u>
          </p>
        </div>
      </div>
    </div>
  )
}
