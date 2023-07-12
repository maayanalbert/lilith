import { useCardSize, useFadeInTitle, useIsMobile } from "@/GlobalsContext"
import getBrowserType from "@/helpers/getBrowserType"
import getOnIpad from "@/helpers/getOnIpad"
import { useEffect, useRef, useState } from "react"

/**
 * The title text (your space)
 */
export default function Title() {
  const isMobile = useIsMobile()
  const cardSize = useCardSize()
  const fadeInTitle = useFadeInTitle()
  const [spaceNameEdited, setSpaceNameEdited] = useState(false)
  const spaceNameRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="leading-normal sm:text-6xl text-5xl md:w-full sm:w-[400px] w-[250px] 
    text-center text-white flex flew-row justify-center"
      style={{
        paddingBottom: isMobile ? cardSize / 3 : 0,
        gap: isMobile ? (spaceNameEdited ? 7 : 15) : spaceNameEdited ? 9 : 18,
      }}
    >
      <div
        className="scroll-your relative"
        style={{ paddingLeft: isMobile ? 10 : 16 }}
      >
        <i
          ref={spaceNameRef}
          className={`${isMobile ? "font-extralight" : "font-thin "} ${
            fadeInTitle ? "animate-your" : ""
          } whitespace-nowrap cursor-default select-none`}
        >
          Your
        </i>
      </div>
      <div
        className={`scroll-space ${
          isMobile ? "font-bold" : "font-medium"
        } select-none cursor-default`}
      >
        <p className={fadeInTitle ? "animate-space" : ""}>Space</p>
      </div>
    </div>
  )
}
