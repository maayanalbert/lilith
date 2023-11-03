import { Ref, RefObject, useEffect, useState } from "react"
import useEventListener from "./useEventListener"
import { getMappedValue } from "./getMappedValue"

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
    const adjustedDist = dist <= 130 / 2 ? 0 : dist - 130 / 2 // perhaps make a bit smaller than radius
    const percentToCenter = 1 - adjustedDist / maxDist
    const val = percentToCenter
    document.documentElement.style.setProperty("--mouse-dist", `${val}`)

    const mouseScale = getMappedValue(val, 0, 1, 0.5, 1)

    document.documentElement.style.setProperty("--mouse-scale", `${mouseScale}`)
  }

  useEventListener("mousemove", callback)
}

function getDist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
