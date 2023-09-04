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
      className="leading-normal sm:text-6xl text-5xl md:w-full sm:w-[400px] w-[250px] 
    justify-center relative"
      style={{
        paddingBottom: isMobile ? cardSize / 3 : 0,
      }}
    >
      <p
        className={`absolute scroll-space ${
          isMobile ? "font-normal" : "font-light"
        } select-none cursor-default`}
        style={{
          color: "rgb(50, 50, 50)",
          left: `calc(50% - 300px)`,
          top: `calc(50% - 28px)`,
        }}
      >
        {titleText}
      </p>
      <div className="animate-pulse">
        <div
          className="scroll-space rounded-full absolute"
          style={{
            backgroundColor: "royalblue",
            height: 110,
            width: 5,
            left: `calc(50% - 304px)`,
            top: `calc(50% - 65px)`,
          }}
        />
      </div>
    </div>
  )
}
