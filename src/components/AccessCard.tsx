import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import { useEffect, useRef, useState } from "react"
import getOnIpad from "@/helpers/getOnIpad"
import useEventListener from "@/hooks/useEventListener"

/**
 * The card where we offer a signup for the alpha
 */
export default function AccessCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        setCardScrollClass(0, 200, 200, `--scroll-access`)
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
        `--scroll-access`
      )
    },
    [cardRef]
  )

  return (
    <div className="flex justify-center items-center text-xl font-light h-[100%]">
      <div
        className={`text-white flex sm:flex-row flex-col items-center sm:gap-1.5 leading-normal scroll-access`}
        ref={cardRef}
      >
        <p>Contact</p>
        <a className="underline" href="mailto:maaayan@eve.space">
          maayan@eve.space
        </a>
        <p>to learn more</p>
      </div>
    </div>
  )
}
