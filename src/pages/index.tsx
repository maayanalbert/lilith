import { FirstBlurb } from "@/components/FirstBlurb"
import SecondBlurb from "@/components/SecondBlurb"
import { ThirdBlurb } from "@/components/ThirdBlurb"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import {
  getMaxWombSize,
  useScrollAnimations,
} from "@/utils/useScrollAnimations"
import { ArrowDownIcon } from "@heroicons/react/24/solid"
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
  const [thirdBlurbVisible, setThirdBlurbVisible] = useState(false)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    scrollOverlayRef,
    setMainPageScrollable,
    setIsInsideWomb,
    isInsideWomb
  )

  useEventListener("scroll", () => {
    const maxScrollY = document.body.scrollHeight - window.innerHeight

    if (window.scrollY > maxScrollY * .33 * 0.5) {
      setSecondBlurbVisible(true)
    }
    if (window.scrollY > maxScrollY * .66) {
      setThirdBlurbVisible(true)
    }
  })

  const [windowWidth, setWindowWidth] = useState(640)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

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
              }}
            >
              <p
                className={`${
                  windowWidth >= 640 && "hint-enter"
                } expand-hint font-light text-3xl text-zinc-500`}
                style={{ paddingTop: 88 * 2 + 20 }}
              >
                {"(scroll)"}
              </p>
            </div>
            <div
              className={`rounded-full womb bg-white absolute ${
                windowWidth >= 640 && "womb-enter"
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
            <FirstBlurb isInsideWomb={isInsideWomb} />
          </div>

          <div
            className="w-full"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
            }}
          >
            <SecondBlurb
              isVisible={secondBlurbVisible}
              isInsideWomb={isInsideWomb}
            />
          </div>

          <div
            className="w-full"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
            }}
          >
            <ThirdBlurb
              isVisible={thirdBlurbVisible}
              isInsideWomb={isInsideWomb}
            />
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
