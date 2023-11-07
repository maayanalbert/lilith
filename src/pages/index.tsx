import ExpandingTitle from "@/components/ExpandingTitle"
import { FirstBlurb } from "@/components/FirstBlurb"
import { SecondBlurb } from "@/components/SecondBlurb"
import { easeInQuad, easeInSine } from "@/utils/easingFns"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useScrollAnimations } from "@/utils/useScrollAnimations"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  const [mainPageScrollable, setMainPageScrollable] = useState(false)
  const [isInsideWomb, setIsInsideWomb] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(scrollOverlayRef, setMainPageScrollable, setIsInsideWomb)

  // useEffect(() => {
  //   window.scrollTo(0, 0) // sometimes the page loads scrolled down
  // }, [])

  // useEventListener("scroll", () => {
  //   if (window.scrollY > window.innerHeight / 4) {
  //     setHasScrolled(true)
  //   }
  // })

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full relative" style={{ height: "100vh" }}>
        <ExpandingTitle />
        <div className="h-full w-full absolute top-0">
          <FirstBlurb isVisible={isInsideWomb} />
        </div>
      </div>
      <div
        className="w-full"
        style={{
          height: "100vh",
          position: "relative",
          zIndex: 1,
          marginTop: "-20vh",
        }}
      >
        <SecondBlurb isVisible={hasScrolled} />
        <div
          className="absolute bottom-0 w-full flex items-center justify-center font-light text-sm"
          style={{ paddingBottom: "8vh" }}
        >
          Copyright Eve Technologies 2024
        </div>
      </div>
      <div // scroll overlay
        className="absolute top-0 w-full scrollbar-hidden"
        style={{
          height: "100vh",
          overflow: "scroll",
          pointerEvents: mainPageScrollable ? "none" : undefined,
        }}
        ref={scrollOverlayRef}
      >
        <div style={{ height: "10000vh" }} />
      </div>
    </div>
  )
}
