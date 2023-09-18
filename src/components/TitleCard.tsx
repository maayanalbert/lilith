import { accentColor } from "@/constants"
import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useEffect, useRef, useState } from "react"

export default function TitleCard() {
  const [title, setTitle] = useState("")

  useEffect(() => {
    typeCharacter(0, "What's on your mind?", setTitle)
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
    <div className="flex justify-center items-center h-[100%]">
      <div className="w-[300px] sm:w-[695px] flex flex-col items-start justify-start relative scroll-title">
        <p
          className="sm:text-7xl text-3xl"
          style={{ color: "rgb(64, 64, 64)", font: "Helvetica Neueu" }}
        >
          {title}
        </p>
        <div
          className={`animate-pulse absolute rounded-full left-0
            sm:h-[88px] sm:w-[5px] sm:top-[-14px] h-[44px] w-[3px] top-[-6px]`}
          style={{
            backgroundColor: accentColor,
          }}
        />
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

    setTimeout(() => typeCharacter(i + 1, fullText, setText), timeoutLen)
  }
}
