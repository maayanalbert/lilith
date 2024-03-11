import useEventListener from "@/utils/useEventListener"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine } from "@/utils/easingFns"
import {
  getMaxScrollY,
  useScrollEventListener,
} from "@/utils/scrollEventListeners"

export default function Hint() {
  const hintDisappeared = useRef(false)
  const launchTime = useRef(0)

  useEffect(() => {
    launchTime.current = Date.now()
  }, [])

  useScrollEventListener(() => {
    const releaseDate = document.querySelector(
      ".release-date"
    ) as HTMLDivElement | null
    if (!releaseDate) return

    const opacity =
      navigator.maxTouchPoints > 1
        ? window.scrollY > 0
          ? 0
          : 1
        : getMappedValue(window.scrollY, 0, 200, 1, 0)

    if (window.scrollY > 200) {
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
