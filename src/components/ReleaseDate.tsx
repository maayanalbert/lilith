import useEventListener from "@/utils/useEventListener"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { getMaxScrollY } from "./WombContents"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine } from "@/utils/easingFns"

export default function Hint() {
  const scrollY = useRef(0)
  const hintDisappeared = useRef(false)
  const launchTime = useRef(0)

  useEffect(() => {
    launchTime.current = Date.now()
  }, [])

  useEventListener("wheel", (event) => {
    const maxScrollY = getMaxScrollY()

    scrollY.current = Math.min(
      Math.max(0, scrollY.current + event.deltaY),
      maxScrollY
    )

    const releaseDate = document.querySelector(
      ".release-date"
    ) as HTMLDivElement | null
    if (!releaseDate) return

    const opacity = getMappedValue(scrollY.current, 0, 200, 1, 0)

    if (scrollY.current > 200) {
      hintDisappeared.current = true
    }

    releaseDate.style.opacity = hintDisappeared.current
      ? opacity.toString()
      : "0"
  })

  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <p
        className="text-white text-xs text-zinc-200 tracking-wider release-date"
        style={{ opacity: 0 }}
      >
        SUMMER 2024
      </p>
    </div>
  )
}
