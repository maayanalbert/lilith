import { useCardSize, useIsMobile, useMidColor } from "@/GlobalsContext"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"

/**
 * A chunk of text providing an overview of the company
 */
export default function AboutCard() {
  const midColor = useMidColor()
  const cardSize = useCardSize()
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        // the title
        setCardScrollClass(0, 200, 200, `--scroll-card-about-title`)

        // the subtitle
        setCardScrollClass(0, 200, 200, `--scroll-card-about-body`)
        return
      }

      // get the current center of the card
      const cardTopPosition = cardRef.current?.getBoundingClientRect().top
      if (!cardTopPosition) return
      const cardCenter = cardTopPosition + cardSize / 2

      const screenCenter = window.innerHeight / 2

      const cardDistFromCenter = cardCenter - screenCenter
      const scrollDurationBase = (window.innerHeight * 4.25) / 5

      // the title
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.285,
        scrollDurationBase * 0.3,
        `--scroll-card-about-title`
      )

      // the subtitle
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.3,
        scrollDurationBase * 0.285,
        `--scroll-card-about-body`
      )
    },
    [cardRef]
  )

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        height: cardSize,
        width: 270,
      }}
      ref={cardRef}
    >
      <div className="flex flex-col gap-2">
        <div className="">
          <p
            className={`text-white text-2xl ${
              isMobile ? "font-bold" : "font-semibold"
            } scroll-card-about-title`}
          >
            About us
          </p>
        </div>
        <div
          className={` ${isMobile ? "font-normal" : "font-light"} text-white`}
          style={{ color: midColor }}
        >
          <div className="scroll-card-about-body">
            <p>We're a small team based in New York.</p>

            <br />
            <p>
              If you’d like to learn more, please reach out to{" "}
              <Link href="mailto:maayan@eve.space" target="_blank">
                <u style={{ color: "rgb(255, 255, 255)" }}>maayan@eve.space</u>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
