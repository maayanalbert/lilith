import {
  MutableRefObject,
  RefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react"
import { easeInSine, easeOutQuad, easeOutSine } from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"

export const startSize = 88
export const shrinkCutoff = startSize * 1.6

export function useScrollAnimations() {
  const renderTime = useRef(0)
  const scrolledEarly = useRef(false)
  const hasPassedShrinkCutoff = useRef(false)
  useEffect(() => {
    renderTime.current = Date.now()
  }, [])

  useEventListener("scroll", () => {
    if (Date.now() - renderTime.current < 3800) {
      scrolledEarly.current = true
    }

    const isMobile = window.innerWidth < 640

    const innerHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight

    const womb = document.querySelector(".womb") as HTMLDivElement | null
    if (!womb) return

    if (window.scrollY > shrinkCutoff) {
      hasPassedShrinkCutoff.current = true
    }

    const width =
      scrolledEarly.current && !hasPassedShrinkCutoff.current
        ? 1
        : getMappedValue(window.scrollY, 0, shrinkCutoff, startSize, 1)

    const maxScrollY = document.body.scrollHeight - innerHeight
    const height =
      scrolledEarly.current && !hasPassedShrinkCutoff.current
        ? 1
        : window.scrollY < shrinkCutoff
        ? getMappedValue(window.scrollY, 0, shrinkCutoff, startSize, 1)
        : getMappedValue(
            window.scrollY,
            shrinkCutoff,
            maxScrollY,
            1,
            document.body.scrollHeight - innerHeight - (isMobile ? 150 : 250)
          ) * (isMobile ? 2 : 1)

    womb.style.width = width.toString() + "px"
    womb.style.height = height.toString() + "px"

    // remove marginTop on mobile because animation is jumpy anyways
    const marginTop =
      scrolledEarly.current && !hasPassedShrinkCutoff.current
        ? Math.max(startSize / 2, window.scrollY / 2)
        : window.scrollY / 2
    womb.style.marginTop = isMobile ? "0px" : marginTop.toString() + "px"

    const wombOpacity = getMappedValue(
      window.scrollY,
      shrinkCutoff,
      maxScrollY,
      1,
      0,
      easeInSine
    )

    womb.style.opacity = wombOpacity.toString()

    const hint = document.querySelector(".hint") as HTMLDivElement | null
    if (!hint) return

    const hintOpacity =
      scrolledEarly.current && !hasPassedShrinkCutoff.current
        ? 0
        : getMappedValue(window.scrollY, 0, shrinkCutoff, 1, 0, easeOutSine)

    hint.style.opacity = hintOpacity.toString()
    hint.style.marginTop = marginTop.toString() + "px"

    const blurb = document.querySelector(".blurb") as HTMLDivElement | null
    if (!blurb) return

    const blurbOpacity = getMappedValue(
      window.scrollY,
      innerHeight * 0.75,
      maxScrollY,
      0,
      1,
      easeInSine
    )

    blurb.style.opacity = blurbOpacity.toString()
  })
}
