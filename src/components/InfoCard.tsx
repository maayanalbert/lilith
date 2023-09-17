import { useIsMobile } from "@/GlobalsContext"
import { accentColor } from "@/constants"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useEffect, useRef, useState } from "react"

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
      className="flex justify-center items-center "
      style={{ height: "60vh" }}
    >
      <div
        className="flex flex-col justify-center items-center scroll-info relative gap-12 p-12 text-left"
        ref={cardRef}
      >
        <p className="text-xl font-light" style={{ color: "white" }}>
          Eve is a seed stage venture building a note taking tool for emotional
          intelligence
        </p>
      </div>
    </div>
  )
}
