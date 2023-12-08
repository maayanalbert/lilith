import {
  MutableRefObject,
  RefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  easeInCubic,
  easeInExpo,
  easeInQuad,
  easeInQuart,
  easeInSine,
  easeOutQuad,
  easeOutSine,
} from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"

export const startSize = 84

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

    const innerHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight

    const womb = document.querySelector(".womb") as HTMLDivElement | null
    if (!womb) return

    const shrinkCutoff = startSize * 1.6

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
            document.body.scrollHeight - innerHeight - 250
          )

    womb.style.width = width.toString() + "px"
    womb.style.height = height.toString() + "px"

    const marginTop =
      scrolledEarly.current && !hasPassedShrinkCutoff.current
        ? Math.max(startSize / 2, window.scrollY / 2)
        : window.scrollY / 2
    womb.style.marginTop = marginTop.toString() + "px"

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
