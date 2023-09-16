import { useIsMobile, useLowColor } from "@/GlobalsContext"
import { getSpaceColor, getSpacePrompt, useSpacesContext } from "@/SpaceContext"
import useEventListener from "@/hooks/useEventListener"
import { get } from "lodash"
import { useEffect, useState } from "react"

/**
 * The title text (your space)
 */
export default function Title() {
  const isMobile = useIsMobile()
  const { curSpace } = useSpacesContext()

  const [titleText, setTitleText] = useState<string>("")

  const defaultPromptText = "What's on your mind?"

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      const scrollHeight = window.scrollY / (window.innerHeight + 1)

      // flashes when it hits 1 so bound at .99
      const boundedScrollHeight = Math.max(Math.min(scrollHeight, 0.99), 0)

      document.documentElement.style.setProperty(
        "--scroll-title",
        `${boundedScrollHeight}` // the % of the way you have scrolled to the second page
      )
    },
    []
  )

  useEffect(() => {
    typeCharacter(0, defaultPromptText)
  }, [])

  const typeCharacter = (i: number, fullText: string) => {
    setTitleText(fullText.substring(0, i))
    if (i < fullText.length) {
      const timeoutLen =
        fullText[i] === "?" ? 500 : fullText[i] === " " ? 300 : 100

      const iInc = fullText[i + 1] === " " || fullText[i + 1] === "?" ? 1 : 2

      setTimeout(() => typeCharacter(i + iInc, fullText), timeoutLen)
    }
  }

  return (
    <div
      className="leading-normal flex
    justify-center items-center  w-full"
      style={{ height: "100vh" }}
    >
      <div
        className={`lg:w-[490px] w-[305px] relative`}
        style={{ width: curSpace ? "fit-content" : undefined }}
      >
        <p
          className={` ${
            isMobile ? "font-normal" : "font-light"
          } select-none cursor-default scroll-title lg:text-5xl text-3xl`}
          style={{
            color: "rgb(100, 100, 100)",
          }}
        >
          {!curSpace ? titleText : getSpacePrompt(curSpace)}
        </p>
        <div className="animate-pulse">
          <div
            className={`scroll-cursor rounded-full absolute
            lg:h-[80px] lg:w-[4px] lg:top-[-20px] lg:left-[0px]
            h-[45px] w-[3px] top-[-7px] left-[0px]`}
            style={{
              backgroundColor: curSpace ? getSpaceColor(curSpace) : "white",
            }}
          />
        </div>
      </div>
    </div>
  )
}
