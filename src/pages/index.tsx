import { FirstBlurb } from "@/components/FirstBlurb"
import NavBar from "@/components/NavBar"
import SecondBlurb from "@/components/SecondBlurb"
import { ThirdBlurb } from "@/components/ThirdBlurb"
import Womb from "@/components/Womb"
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

  const [hasEnteredWomb, setHasEnteredWomb] = useState(false)
  const [secondBlurbVisible, setSecondBlurbVisible] = useState(false)
  const [thirdBlurbVisible, setThirdBlurbVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hasClosedWomb, setHasClosedWomb] = useState(false)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    scrollOverlayRef,
    hasEnteredWomb,
    setHasEnteredWomb,
    setScrolled,
    setHasClosedWomb
  )

  useEventListener(
    "scroll",
    () => {
      const maxScrollY = document.body.scrollHeight - window.innerHeight

      if (window.scrollY > maxScrollY * 0.3) {
        setSecondBlurbVisible(true)
      }
      if (window.scrollY > maxScrollY * 0.7) {
        setThirdBlurbVisible(true)
      }
    },
    [setSecondBlurbVisible, setThirdBlurbVisible]
  )

  return (
    <>
      <div className="w-full h-full overflow-hidden relative">
        <Womb
          hasClosedWomb={hasClosedWomb}
          hasEnteredWomb={hasClosedWomb}
          scrolled={scrolled}
        />
        <div
          className="title-trimmings" // should be inside transformed area but then fixed doesn't work
          style={{ opacity: hasEnteredWomb ? 1 : 0 }}
        >
          <div className="womb-innards">
            <NavBar />
          </div>
        </div>
        <div
          className="w-full h-fit title relative"
          style={{
            transformOrigin: "50% calc(16.6666% + 50px)",
          }}
        >
          <div
            className="w-full relative"
            style={{
              height: "100svh",
            }}
          >
            <FirstBlurb hasEnteredWomb={hasEnteredWomb} />
          </div>

          <div
            className="w-full womb-innards"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
            }}
          >
            <SecondBlurb
              isVisible={secondBlurbVisible}
              hasEnteredWomb={hasEnteredWomb}
            />
          </div>

          <div
            className="w-full womb-innards"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
            }}
          >
            <ThirdBlurb isVisible={thirdBlurbVisible} />
          </div>
        </div>
      </div>
      <div // scroll overlay
        className="absolute top-0 w-full scrollbar-hidden"
        style={{
          height: "100svh",
          overflow: "scroll",
        }}
        ref={scrollOverlayRef}
      >
        <div style={{ height: "10000vh" }} />
      </div>
    </>
  )
}
