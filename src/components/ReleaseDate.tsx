import useEventListener from "@/utils/useEventListener"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine } from "@/utils/easingFns"
import { useScrollEventListener } from "@/utils/scrollEventListeners"

export default function Hint() {
  const hintDisappeared = useRef(false)
  const launchTime = useRef(0)
  const [noScroll, setNoScroll] = useState(false) // doesn't show up initially because set to false

  useEffect(() => {
    launchTime.current = Date.now()
  }, [])

  useScrollEventListener((_, absoluteScroll) => {
    const releaseDate = document.querySelector(
      ".release-date"
    ) as HTMLDivElement | null
    if (!releaseDate) return

    const opacity =
      navigator.maxTouchPoints > 1
        ? absoluteScroll > 0
          ? 0
          : 1
        : getMappedValue(absoluteScroll, 0, 200, 1, 0)

    if (absoluteScroll > 200) {
      hintDisappeared.current = true
    }

    releaseDate.style.opacity = opacity.toString()
    setNoScroll(absoluteScroll === 0)
  })

  return (
    <div className="absolute w-full h-full">
      <div className="absolute w-full h-full flex items-center justify-center welcome-enter">
        <p
          className="text-white text-[15px] text-white tracking-wider release-date font-bold"
          style={{ fontWeight: 500 }}
        >
          WELCOME TO EVE
        </p>
      </div>
      <div
        className={`absolute bottom-0 w-full flex flex-col justify-center sm:pb-[16px] pb-6`}
      >
        <div
          className="text-sm text-zinc-500 text-center"
          style={{
            opacity: noScroll ? 1 : 0,
            transitionDuration: noScroll ? "2000ms" : "0ms",
          }}
        >
          <p>
            Inspired by the Interstellar's{" "}
            <a
              href="https://cerncourier.com/a/building-gargantua/"
              target="_blank"
              className="underline cursor-pointer"
            >
              black hole
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
