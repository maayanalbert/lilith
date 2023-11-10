import ExpandingTitle from "@/components/ExpandingTitle"
import { FirstBlurb } from "@/components/FirstBlurb"
import { InnerWombShadow, easeInQuad } from "@/components/InnerWombShadow"
import { SecondBlurb } from "@/components/SecondBlurb"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import {
  getMaxWombSize,
  useScrollAnimations,
} from "@/utils/useScrollAnimations"
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
  const [secondBlurbVisible, setSecondBlurbVisible] = useState(false)
  const scrollOverlayRef = useRef<HTMLDivElement>(null)
  const [exitHovering, setExitHovering] = useState(false)
  const [exited, setExited] = useState(false)

  useScrollAnimations(
    scrollOverlayRef,
    setMainPageScrollable,
    setIsInsideWomb,
    isInsideWomb
  )

  useEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight * 0.4) {
      setSecondBlurbVisible(true)
    }
  })

  return (
    <>
      {isInsideWomb && (
        <div className="absolute h-full w-full">
          <InnerWombShadow exitHovering={exitHovering} exited={exited} />
        </div>
      )}
      <div className="w-full h-full overflow-hidden">
        <div
          className="w-full h-fit"
          style={{
            // hovering tansition
            transform: `scale(${exitHovering || exited ? 0.96 : 1})`,
            transformOrigin: "50% 75%",
            transitionProperty: "all",
            transitionDuration: exitHovering ? "300ms" : "450ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          <div
            className="w-full h-fit"
            style={{
              // exited transition
              transform: `scale(${exited ? 0 : 1})`,
              transformOrigin: "50% 72%",
              transitionProperty: "all",
              transitionDuration: "1000ms",
              transitionTimingFunction: easeInQuad,
              opacity: exited ? 0 : 1,
            }}
          >
            <div
              className="w-full relative"
              style={{
                height: "100svh", //https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
              }}
            >
              {!isInsideWomb && <ExpandingTitle />}
              <div className="h-full w-full absolute top-0">
                <FirstBlurb isVisible={isInsideWomb} exited={exited} />
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
              <SecondBlurb
                isVisible={secondBlurbVisible}
                setExitHovering={setExitHovering}
                setExited={setExited}
              />
              <div
                className="absolute bottom-0 w-full flex items-center justify-center font-light text-sm fading-content"
                style={{ paddingBottom: "8svh" }}
              >
                Copyright Eve Technologies 2024
              </div>
            </div>
          </div>
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
    </>
  )
}
