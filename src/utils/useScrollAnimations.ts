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
  easeInQuint,
  easeInSine,
  easeOutCubic,
  easeOutExpo,
  easeOutQuad,
  easeOutQuart,
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

    // title styles
    const title = document.querySelector(".title") as HTMLDivElement | null
    if (!title) return

    const titleMarginTop = parseInt(title.style.marginTop.replace("px", ""))
    const titleFontSize = parseInt(title.style.fontSize.replace("px", ""))

    const shrinkCutoff = titleMarginTop + titleFontSize / 2

    const titleOpacity =
      window.scrollY < shrinkCutoff
        ? getMappedValue(window.scrollY, 0, shrinkCutoff, 0, 1, easeInQuart)
        : getMappedValue(
            window.scrollY,
            innerHeight * 0.25,
            innerHeight * 0.5,
            1,
            0,
            easeOutSine
          )

    title.style.opacity = titleOpacity.toString()

    // womb styles
    const womb = document.querySelector(".womb") as HTMLDivElement | null
    if (!womb) return

    if (window.scrollY > shrinkCutoff) {
      hasPassedShrinkCutoff.current = true
    }

    const wombAppearCutoff = shrinkCutoff + titleFontSize / 2

    const maxScrollY = document.body.scrollHeight - innerHeight

    const width =
      window.scrollY < shrinkCutoff
        ? getMappedValue(window.scrollY, 0, shrinkCutoff, startSize, 0)
        : window.scrollY < wombAppearCutoff
        ? 0
        : 1

    const height =
      window.scrollY < shrinkCutoff
        ? getMappedValue(window.scrollY, 0, shrinkCutoff, startSize, 0)
        : getMappedValue(
            window.scrollY,
            wombAppearCutoff,
            maxScrollY,
            1,
            document.body.scrollHeight -
              innerHeight -
              (window.innerWidth < 640 ? 400 : 325)
          )

    womb.style.width = width.toString() + "px"
    womb.style.height = height.toString() + "px"

    const marginTop =
      window.scrollY < wombAppearCutoff
        ? window.scrollY / 2
        : wombAppearCutoff + height / 2 + 30

    womb.style.marginTop = marginTop.toString() + "px"

    const wombOpacity =
      window.scrollY < shrinkCutoff
        ? getMappedValue(window.scrollY, 0, shrinkCutoff, 1, 0, easeInSine)
        : getMappedValue(
            window.scrollY,
            shrinkCutoff,
            maxScrollY,
            1,
            0,
            easeInSine
          )

    womb.style.opacity = wombOpacity.toString()

    // hint styles
    const hint = document.querySelector(".hint") as HTMLDivElement | null
    if (!hint) return

    const hintOpacity =
      scrolledEarly.current && !hasPassedShrinkCutoff.current
        ? 0
        : getMappedValue(window.scrollY, 0, shrinkCutoff, 1, 0, easeOutExpo)

    hint.style.opacity = hintOpacity.toString()

    // blurb styles
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
