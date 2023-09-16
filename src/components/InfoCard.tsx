import { useIsMobile } from "@/GlobalsContext"
import { accentColor } from "@/constants"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useRef } from "react"

/**
 * A chunk of text providing a bit of information about what the company does
 */
export default function InfoCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        // the title
        setCardScrollClass(0, 200, 200, `--scroll-info`)
        return
      }

      // get the current center of the card
      const cardTopPosition = cardRef.current?.getBoundingClientRect().top
      const cardHeight = cardRef.current?.getBoundingClientRect().height

      if (!cardTopPosition || !cardHeight) return
      const cardCenter = cardTopPosition + cardHeight / 2

      const screenCenter = window.innerHeight / 2

      const cardDistFromCenter = cardCenter - screenCenter
      const scrollDurationBase = (window.innerHeight * 4.25) / 5

      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.3,
        scrollDurationBase * 0.3,
        `--scroll-info`
      )
    },
    [cardRef]
  )

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="flex flex-col justify-center items-center scroll-info w-[300px] sm:w-[540px]"
        ref={cardRef}
      >
        <div className="flex flex-col gap-12">
          <p
            className="text-5xl"
            style={{ color: "rgb(64, 64, 64)", font: "Helvetica Neueu" }}
          >
            What's on your mind?
          </p>
          <p className="text-2xl" style={{ color: "white" }}>
            Eve is a guided note taking tool for emotional intelligence
          </p>
        </div>
        <div
          className="animate-pulse absolute rounded-full"
          style={{
            height: 56,
            width: 4,
            top: -8,
            left: -3,
            backgroundColor: accentColor,
          }}
        />
      </div>
    </div>
  )
}
