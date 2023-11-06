import ExpandingTitle from "@/components/ExpandingTitle"
import { FirstBlurb } from "@/components/FirstBlurb"
import { SecondBlurb } from "@/components/SecondBlurb"
import { easeInQuad, easeInSine } from "@/utils/easingFns"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useWheelAnimations } from "@/utils/useWheelAnimations"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  const scrollable = useRef(false) // for timeout, need to set css property seperately
  const [isInsideWomb, setIsInsideWomb] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useWheelAnimations(scrollable, setIsInsideWomb)

  useEventListener(
    "scroll",
    () => {
      if (window.scrollY > window.innerHeight / 2) {
        setHasScrolled(true)
      }
    },

    []
  )

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full relative" style={{ height: "50%" }}>
        <ExpandingTitle />
        <div className="h-full w-full absolute top-0">
          <FirstBlurb isVisible={isInsideWomb} />
        </div>
      </div>
      <div
        className="w-full"
        style={{
          height: "50%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SecondBlurb isVisible={hasScrolled} />
        <div className="absolute bottom-0 w-full p-4 flex items-center justify-center font-light text-sm">
          Copyright Eve Technologies 2024
        </div>
      </div>
    </div>
  )
}
