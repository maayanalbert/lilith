import { FirstBlurb } from "@/components/FirstBlurb"
import SecondBlurb from "@/components/SecondBlurb"
import { ThirdBlurb } from "@/components/ThirdBlurb"
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

  const [isInsideWomb, setIsInsideWomb] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const [hasEnteredWomb, setHasEnteredWomb] = useState(false)
  const [secondBlurbVisible, setSecondBlurbVisible] = useState(false)
  const [thirdBlurbVisible, setThirdBlurbVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    scrollOverlayRef,
    hasEnteredWomb,
    setHasEnteredWomb,
    setScrolled,
    setIsInsideWomb,
    setHintVisible
  )

  useEventListener(
    "scroll",
    () => {
      const maxScrollY = document.body.scrollHeight - window.innerHeight

      if (window.scrollY > maxScrollY * 0.33 * 0.5) {
        setSecondBlurbVisible(true)
      }
      if (window.scrollY > maxScrollY * 0.66) {
        setThirdBlurbVisible(true)
      }
    },
    [setSecondBlurbVisible, setThirdBlurbVisible]
  )

  return (
    <>
      <div className="w-full h-full overflow-hidden relative">
        <div className="absolute w-full bg-black" style={{ height: "100svh" }}>
          <div className="relative h-full w-full">
            <div
              className="absolute"
              style={{
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
                opacity: hintVisible ? 1 : 0,
                transitionProperty: "opacity",
                transitionDuration: "500ms",
                transitionTimingFunction: "ease-in",
                transitionDelay: "150ms",
              }}
            >
              <p
                className={`hint-enter expand-hint font-light text-3xl text-zinc-500`}
                style={{
                  paddingTop: 88 * 2 + 20,
                }}
              >
                {hasEnteredWomb ? "Summer 2024" : "(scroll)"}
              </p>
            </div>
            <div
              className={`rounded-full womb bg-white absolute ${
                !scrolled && "womb-enter"
              }`}
              style={{
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            />
          </div>
        </div>

        <div
          className="w-full h-fit title"
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
            className="w-full"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
              opacity: isInsideWomb ? 1 : 0,
            }}
          >
            <SecondBlurb
              isVisible={secondBlurbVisible}
              hasEnteredWomb={hasEnteredWomb}
            />
          </div>

          <div
            className="w-full"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
              opacity: isInsideWomb ? 1 : 0,
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
