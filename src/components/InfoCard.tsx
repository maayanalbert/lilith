import { useIsMobile } from "@/GlobalsContext"
import { SpaceType, getSpaceColor, useSpacesContext } from "@/SpaceContext"
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
  const { curSpace } = useSpacesContext()

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

      // the buttons
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.18,
        20000000,
        `--scroll-buttons`
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
        <div
          className={`scroll-card-0-body ${
            isMobile ? "font-normal" : "font-light"
          }`}
        >
          <p style={{ color: "gray" }}>
            Eve lets you create thought partners for different facets of your
            life.
          </p>
          <div
            className={`w-full flex flex-col`}
            style={{
              borderRadius: 10,
              // padding: 24,
              marginTop: 24,
              gap: 16,
              height: 100, // hardcoding to keep consistent, bad
            }}
          >
            <ExampleContent />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExampleContent() {
  const isMobile = useIsMobile()
  const { curSpace } = useSpacesContext()
  if (curSpace === "IDEAS") {
    return (
      <>
        <div
          className={isMobile ? "font-bold" : "font-semibold"}
          style={{ color: "white" }}
        >
          <p>{`"This is so important because [_____]"`}</p>
        </div>
        <div style={{ color: "gray" }} className="relative">
          <p>{"Reference Macintosh 1984 ad?"}</p>
          <div
            className="animate-pulse absolute left-0 rounded-full"
            style={{
              height: 24,
              width: 2,
              top: -2,
              backgroundColor: curSpace ? getSpaceColor(curSpace) : "white",
            }}
          />
        </div>
      </>
    )
  } else if (curSpace === "FEELINGS") {
    return (
      <>
        <div
          className={isMobile ? "font-bold" : "font-semibold"}
          style={{ color: "white" }}
        >
          <p>{`"I'm overwhelmed, I want to run away"`}</p>
        </div>
        <div style={{ color: "gray" }} className="relative">
          <p>What are you really afraid of?</p>
          <div
            className="animate-pulse absolute left-0 rounded-full"
            style={{
              height: 24,
              width: 2,
              top: -2,
              backgroundColor: curSpace ? getSpaceColor(curSpace) : "white",
            }}
          />
        </div>
      </>
    )
  } else if (curSpace === "NOTES") {
    return (
      <>
        <div
          className={isMobile ? "font-bold" : "font-semibold"}
          style={{ color: "white" }}
        >
          <p>{`"Groceries: Eggs, Noodles, Broccoli"`}</p>
        </div>
        <div style={{ color: "gray" }} className="relative">
          <p>Chili oil?</p>
          <div
            className="animate-pulse absolute left-0 rounded-full"
            style={{
              height: 24,
              width: 2,
              top: -2,
              backgroundColor: curSpace ? getSpaceColor(curSpace) : "white",
            }}
          />
        </div>
      </>
    )
  } else {
    return null
  }
}
