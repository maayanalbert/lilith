import useEventListener from "@/utils/useEventListener"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine } from "@/utils/easingFns"
import {
  getMaxScrollY,
  useScrollEventListener,
} from "@/utils/scrollEventListeners"

export default function ReleaseDate() {
  const hasDisappeared = useRef(false)

  useScrollEventListener((_, absoluteScroll) => {
    const hint = document.querySelector(".hint") as HTMLDivElement | null
    if (!hint) return

    const opacity = getMappedValue(absoluteScroll, 0, 200, 1, 0)

    if (absoluteScroll > 200) {
      hasDisappeared.current = true
    }

    hint.style.opacity = hasDisappeared.current ? "0" : opacity.toString()
  })

  return (
    <div className="w-full relative" style={{ height: "100svh" }}>
      <div
        className="absolute"
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <div
          className={`hint-enter tracking-wider w-full flex flex-row justify-center text-[16px] text-zinc-600 `}
          style={{
            marginTop: 350,
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          <p className={`hint cursor-default select-none`}>{"(SCROLL)"}</p>
        </div>
      </div>
    </div>
  )
}
