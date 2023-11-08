import ExpandingTitle from "@/components/ExpandingTitle"
import { FirstBlurb } from "@/components/FirstBlurb"
import { SecondBlurb } from "@/components/SecondBlurb"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useScrollAnimations } from "@/utils/useScrollAnimations"
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
  const [windowScrolled, setWindowScrolled] = useState(false)
  const scrollOverlayRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)

  useScrollAnimations(scrollOverlayRef, setMainPageScrollable, setIsInsideWomb)

  // fix 3/4 of  screen being white when you first refresh
  useEffect(() => setIsRendered(true), [])

  useEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.4) {
      setWindowScrolled(true)
    }
  })

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ opacity: isRendered ? 1 : 0 }}
    >
      <div
        className="w-full relative"
        style={{
          height: "100svh", //https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
        }}
      >
        <ExpandingTitle />
        <div className="h-full w-full absolute top-0">
          <FirstBlurb isVisible={isInsideWomb} />
        </div>
      </div>
      <div
        className="w-full"
        style={{
          height: "100svh",
          position: "relative",
          zIndex: 1,
          marginTop: "-20vh",
        }}
      >
        <SecondBlurb isVisible={windowScrolled} />
        <div
          className="absolute bottom-0 w-full flex items-center justify-center font-light text-sm"
          style={{ paddingBottom: "8svh" }}
        >
          Copyright Eve Technologies 2024
        </div>
      </div>
      <div // scroll overlay
        className="absolute top-0 w-full scrollbar-hidden"
        style={{
          height: "100svh",
          overflow: "scroll",
          zIndex: mainPageScrollable ? -1 : 1,
        }}
        ref={scrollOverlayRef}
      >
        <div style={{ height: "10000vh" }} />
      </div>
    </div>
  )
}
