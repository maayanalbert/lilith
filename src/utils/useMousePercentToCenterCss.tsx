import { Ref, RefObject, useEffect, useState } from "react"
import useEventListener from "./useEventListener"
import { getMappedValue } from "./getMappedValue"

/**
 * Called on mouse move
 */
export function useMousePercentToCenterCss() {
  const callback = (event: WheelEvent) => {
    const height = window.innerHeight

    console.log(event.deltaY)
    // document.documentElement.style.setProperty("--mouse-scale", `${mouseScale}`)
  }

  useEventListener("wheel", callback)
}
