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
