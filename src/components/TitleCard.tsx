import { useIsMobile } from "@/GlobalsContext"
import { accentColor } from "@/constants"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useEffect, useRef, useState } from "react"

export default function TitleCard() {
  const [title, setTitle] = useState("W")

  useEffect(() => {
    typeCharacter(1, "What's on your mind?", setTitle)
  }, [])

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

  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "60vh", paddingTop: "40vh" }}
    >
      <div className="flex flex-col justify-center items-center scroll-title relative gap-12">
        <div className="w-[300px] sm:w-[700px] flex flex-col items-start justify-start relative">
          <p
            className="text-7xl"
            style={{ color: "rgb(64, 64, 64)", font: "Helvetica Neueu" }}
          >
            {title}
          </p>
          <div
            className="animate-pulse absolute rounded-full"
            style={{
              height: 56,
              width: 4,
              top: -8,
              left: 0,
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>
    </div>
  )
}

function typeCharacter(
  i: number,
  fullText: string,
  setText: (_: string) => void
) {
  setText(fullText.substring(0, i))
  if (i < fullText.length) {
    const timeoutLen =
      fullText[i] === "?" ? 500 : fullText[i] === " " ? 200 : 100

    const iInc = fullText[i + 1] === " " || fullText[i + 1] === "?" ? 1 : 2

    setTimeout(() => typeCharacter(i + iInc, fullText, setText), timeoutLen)
  }
}
