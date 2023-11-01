import { Ref, RefObject, useEffect, useState } from "react"
import useEventListener from "./useEventListener"

/**
 * Called on mouse move
 */
export function useMousePercentToCenterCss() {
  const callback = (event: MouseEvent) => {
    const dist = getDist(
      event.clientX,
      event.clientY,
      window.innerWidth / 2,
      window.innerHeight / 2
    )

    const maxDist = getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2)

    const percentToCenter = 1 - dist / maxDist
    const val = dist < 66 ? 1 : percentToCenter
    document.documentElement.style.setProperty("--mouse-dist", `${val}`)
  }

  useEventListener("mousemove", callback)
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
