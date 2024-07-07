import useEventListener from "@/utils/useEventListener"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine } from "@/utils/easingFns"
import { useScrollEventListener } from "@/utils/scrollEventListeners"

export default function Hint() {
  const hintDisappeared = useRef(false)
  const launchTime = useRef(0)

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

    releaseDate.style.opacity = hintDisappeared.current
      ? opacity.toString()
      : "0"
  })

  return (
    <div className="absolute w-full h-full release-date" style={{ opacity: 0 }}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <p className="text-white text-xs text-zinc-200 tracking-wider">
          WELCOME TO EVE
        </p>
      </div>
      <div
        className={`absolute bottom-0 w-full flex flex-col justify-center sm:pb-[16px] pb-6`}
      >
        <div className="text-sm text-zinc-500 text-center">
          <p>
            Inspired by Interstellar's{" "}
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
