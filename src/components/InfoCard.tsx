import { useIsMobile } from "@/GlobalsContext"
import { SpaceType, getSpaceColor, useSpacesContext } from "@/SpaceContext"
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
      style={{ height: "60vh" }}
    >
      <div
        className="flex flex-col justify-center items-center sm:w-[420px] w-[300px] scroll-info"
        ref={cardRef}
      >
        <div className="flex flex-col gap-2">
          <div>
            <p
              className={`text-white text-2xl font-bold ${
                isMobile ? "font-bold" : "font-semibold"
              }`}
            >
              Notes that talk back
            </p>
          </div>
          <div className={`${isMobile ? "font-normal" : "font-light"}`}>
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
              }}
            >
              <ExampleContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExampleContent() {
  const isMobile = useIsMobile()
  const { curSpace } = useSpacesContext()
  if (curSpace === "IDEAS" || !curSpace) {
    return (
      <>
        <div
          className={isMobile ? "font-bold" : "font-semibold"}
          style={{ color: "white" }}
        >
          <p>{`"Need to end presentation on a high note"`}</p>
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
          <p>{`"I'm overwhelmed, I want to run"`}</p>
        </div>
        <div style={{ color: "gray" }} className="relative">
          <p>Why?</p>
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
          <p>{`"Groceries: eggs, boodles, broccoli"`}</p>
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
