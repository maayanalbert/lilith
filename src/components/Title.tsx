import {
  useCardSize,
  useFadeInTitle,
  useIsMobile,
  useLowColor,
} from "@/GlobalsContext"
import getBrowserType from "@/helpers/getBrowserType"
import getOnIpad from "@/helpers/getOnIpad"
import { useEffect, useRef, useState } from "react"

/**
 * The title text (your space)
 */
export default function Title() {
  const isMobile = useIsMobile()
  const cardSize = useCardSize()
  const lowColor = useLowColor()

  const [titleText, setTitleText] = useState<string>("")

  const fullTitleText = "What's on your mind?"

  useEffect(() => {
    typeCharacter(0)
  }, [])

  const typeCharacter = (i: number) => {
    setTitleText(fullTitleText.substring(0, i))
    if (i < fullTitleText.length) {
      const timeoutLen =
        fullTitleText[i] === "?" ? 500 : fullTitleText[i] === " " ? 300 : 100

      const iInc =
        fullTitleText[i + 1] === " " || fullTitleText[i + 1] === "?" ? 1 : 2

      setTimeout(() => typeCharacter(i + iInc), timeoutLen)
    }
  }

  return (
    <div
      className="leading-normal lg:text-6xl text-4xl flex
    justify-center items-center h-full w-full"
      style={{
        paddingBottom: isMobile ? cardSize / 3 : 0,
      }}
    >
      <div className="lg:w-[601px] lg:h-[60px] w-[366px] h-[30px] relative">
        <p
          className={` ${
            isMobile ? "font-normal" : "font-light"
          } select-none cursor-default scroll-your`}
          style={{
            color: "rgb(50, 50, 50)",
          }}
        >
          {titleText}
        </p>
        <div className="animate-pulse">
          <div
            className={`scroll-space rounded-full absolute
            lg:h-[105px] lg:w-[5px] lg:top-[-31px] lg:left-[-5px]
            h-[60px] w-[3px] top-[-7px] left-[-3px]`}
            style={{
              backgroundColor: "white",
            }}
          />
        </div>
      </div>
    </div>
  )
}
