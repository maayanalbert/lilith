import { FirstBlurb } from "@/components/FirstBlurb"
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
  const [consoleLog, setConsoleLog] = useState("")
  const [hasClosedWomb, setHasClosedWomb] = useState(false)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    scrollOverlayRef,
    hasEnteredWomb,
    setHasEnteredWomb,
    setScrolled,
    setHasClosedWomb,
    setConsoleLog
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
          className="w-full h-fit title"
          style={{
            transformOrigin: "50% calc(16.6666% + 50px)",
          }}
        >
          <div className="fixed">{consoleLog}</div>
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
