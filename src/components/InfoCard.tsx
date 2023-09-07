import { useIsMobile } from "@/GlobalsContext"
import { CARD_HEIGHT } from "@/constants"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useRef } from "react"

/**
 * A chunk of text providing a bit of information about what the company does
 */
export default function InfoCard() {
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        // the title
        setCardScrollClass(0, 200, 200, `--scroll-card-0-title`)

        // the subtitle
        setCardScrollClass(0, 200, 200, `--scroll-card-0-body`)
        return
      }

      // get the current center of the card
      const cardTopPosition = cardRef.current?.getBoundingClientRect().top
      if (!cardTopPosition) return
      const cardCenter = cardTopPosition + CARD_HEIGHT / 2

      const screenCenter = window.innerHeight / 2

      const cardDistFromCenter = cardCenter - screenCenter
      const scrollDurationBase = (window.innerHeight * 4.25) / 5

      // the title
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.285,
        scrollDurationBase * 0.3,
        `--scroll-card-0-title`
      )

      // the subtitle
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.3,
        scrollDurationBase * 0.285,
        `--scroll-card-0-body`
      )
    },
    [cardRef]
  )

  return (
    <div
      className="flex flex-col justify-center items-center sm:w-[420px] w-[300px]"
      style={{
        height: CARD_HEIGHT,
      }}
      ref={cardRef}
    >
      <div className="flex flex-col gap-2">
        <div className={"scroll-card-0-title"}>
          <p
            className={`text-white text-2xl font-bold ${
              isMobile ? "font-bold" : "font-semibold"
            }`}
          >
            Notes that talk back
          </p>
        </div>
        <div className={`scroll-card-0-body flex flex-col gap-[20px]`}>
          <div style={{ color: "gray" }}>
            Eve lets you create thought partners for different facets of your
            life.
          </div>
          {/* <div style={{ color: "white" }}>
            <p>{"Programming -> Forest"}</p>
            <p>{"GUI -> Manicured Gardens"}</p>
            <p>{"Conversational UI ->"}</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
