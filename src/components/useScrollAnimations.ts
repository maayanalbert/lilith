import {
  MutableRefObject,
  RefObject,
  use,
  useEffect,
  useRef,
  useState,
} from "react"
import { easeInOutSine, easeInSine, easeOutSine } from "../utils/easingFns"
import { getMappedValue } from "../utils/getMappedValue"
import useEventListener from "../utils/useEventListener"
import useKeyboardIsOpen from "../utils/useKeyboardHeight"

export const startSize = 96
export const shrinkCutoff = startSize * 1.6

export function useScrollAnimations() {
  useEventListener("scroll", () => {
    const isMobile = window.innerWidth < 640

    const innerHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight

    const maxScrollY = document.body.scrollHeight - innerHeight

    const line = document.querySelector(".line") as HTMLDivElement | null
    if (!line) return

    const lineHeight = getMappedValue(
      window.scrollY,
      0,
      maxScrollY,
      0,
      isMobile ? window.innerHeight / 2 - 100 : window.innerHeight / 2 - 100
    )

    line.style.height = lineHeight.toString() + "px"

    const lineOpacity = getMappedValue(
      window.scrollY,
      window.innerHeight * 0.5,
      isMobile ? maxScrollY - 50 : maxScrollY,
      1,
      0
    )

    line.style.opacity = lineOpacity.toString()

    const title = document.querySelector(".title") as HTMLDivElement | null
    if (!title) return

    const hintOpacity = getMappedValue(
      window.scrollY,
      0,
      innerHeight * 0.25,
      1,
      0,
      easeOutSine
    )

    title.style.opacity = hintOpacity.toString()

    const blurb = document.querySelector(".blurb") as HTMLDivElement | null
    if (!blurb) return

    const blurbOpacity = getMappedValue(
      window.scrollY,
      innerHeight * 0.75,
      isMobile ? maxScrollY - 50 : maxScrollY,
      0,
      1,
      easeInSine
    )

    blurb.style.opacity = blurbOpacity.toString()
  })
}
