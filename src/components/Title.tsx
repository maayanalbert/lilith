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
  const [spaceName, setSpaceName] = useState("Your")
  const [spaceNameWidth, setSpaceNameWidth] = useState(0)
  const [spaceNameEdited, setSpaceNameEdited] = useState(false)
  const spaceNameRef = useRef<HTMLDivElement>(null)
  const [spaceNameIsFocused, setSpaceNameIsFocused] = useState(false)

  // set the width of the input to concide with what we're drawing
  useEffect(() => {
    const width = spaceNameRef.current?.getBoundingClientRect().width
    if (width) {
      setSpaceNameWidth(width)
    }
    if (spaceName !== "Your") {
      setSpaceNameEdited(true)
    }
  }, [spaceName])

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
        <input
          className={`${
            isMobile ? "font-extralight" : "font-thin "
          } italic relative bg-black ${
            fadeInTitle ? "animate-your" : ""
          } rounded-none`}
          value={spaceName}
          onChange={(event) => setSpaceName(event.target.value)}
          style={{
            width: spaceNameWidth + 2,
            zIndex: 1,
            marginTop: -20,
            marginLeft: isMobile ? -11 : -16,
          }}
          onFocus={() => setSpaceNameIsFocused(true)}
          onBlur={() => setSpaceNameIsFocused(false)}
        />

        <i
          ref={spaceNameRef}
          className={`${
            isMobile ? "font-extralight" : "font-thin "
          } absolute top-0 left-0 opacity-0 whitespace-nowrap`}
        >
          {spaceName}
        </i>
      </div>
      <div
        className={`scroll-space ${
          isMobile ? "font-bold" : "font-medium"
        } select-none cursor-default`}
      >
        <p className={fadeInTitle ? "animate-space" : ""}>space</p>
      </div>
    </div>
  )
}
