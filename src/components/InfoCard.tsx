import { useCardSize, useIsMobile, useMidColor } from "@/GlobalsContext"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useRef } from "react"

interface Props {
  title: string
  body: string
  index: number
}

/**
 * A chunk of text providing a bit of information about what the company does
 */
export default function InfoCard({ title, body, index }: Props) {
  const cardSize = useCardSize()
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)
  const midColor = useMidColor()

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        // the title
        setCardScrollClass(0, 200, 200, `--scroll-card-${index}-title`)

        // the subtitle
        setCardScrollClass(0, 200, 200, `--scroll-card-${index}-body`)
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
        `--scroll-card-${index}-title`
      )

      // the subtitle
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.3,
        scrollDurationBase * 0.285,
        `--scroll-card-${index}-body`
      )
    },
    [cardRef]
  )

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        height: cardSize,
        width: 420,
        paddingBottom: isMobile ? cardSize / 3 : 0,
      }}
      ref={cardRef}
    >
      <div className="flex flex-col gap-2">
        <div className={"scroll-card-0-title"}>
          <p
            className={`text-white text-2xl ${
              isMobile ? "font-bold" : "font-semibold"
            }`}
          >
            {title}
          </p>
        </div>
        <div
          className={`${"scroll-card-0-body"} ${
            isMobile ? "font-normal" : "font-light"
          } text-white`}
        >
          <p style={{ color: midColor }}>{body} </p>
        </div>
      </div>
    </div>
  )
}
