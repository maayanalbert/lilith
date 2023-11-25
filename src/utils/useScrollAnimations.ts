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
  easeInQuad,
  easeInQuart,
  easeInSine,
  easeOutQuad,
} from "./easingFns"
import { getMappedValue } from "./getMappedValue"
import useEventListener from "./useEventListener"

export const startSize = 88

export function useScrollAnimations(
  setHasEnteredWomb: (_: boolean) => void,
  setScrolled: (scrolled: boolean) => void,
  setWombIsClosed: (_: boolean) => void,
  scrollOverlayRef: RefObject<HTMLDivElement>
) {
  const wombSize = useRef(startSize)
  const lastOverlayY = useRef(0)
  const autoScrolling = useRef(false)

  useEffect(() => {
    document.documentElement.style.setProperty("--hint-opacity", `1`)
    document.documentElement.style.setProperty("--html-overflow", `hidden`)

    if (scrollOverlayRef.current) {
      const maxSize = Math.min(window.innerWidth, window.innerHeight)

      scrollOverlayRef.current.scrollTo(0, maxSize * 10)
      lastOverlayY.current = maxSize * 10
      if (navigator.maxTouchPoints > 0) {
        scrollOverlayRef.current.style.zIndex = "1"
      } else {
        scrollOverlayRef.current.style.zIndex = "-1"
      }
    }
    const womb = document.querySelector(".womb") as HTMLDivElement | null

    if (!womb) return

    womb.style.height = `${startSize}px`
    womb.style.width = `${startSize}px`

    const title = document.querySelector(".title") as HTMLDivElement | null
    if (!title) return

    title.style.opacity = "0"
  }, [])

  useEventListener(
    "wheel",
    (event) => {
      if (window.scrollY > 0) return
      setScrolled(true)

      const maxSize = Math.min(window.innerWidth, window.innerHeight)

      wombSize.current = Math.max(
        Math.min(wombSize.current + event.deltaY * 0.25, maxSize),
        startSize
      )

      updateWombStyles(wombSize.current, maxSize * 0.95)
      updateTitleStyle(wombSize.current, maxSize)
      setWombIsClosed(wombSize.current === startSize)

      if (wombSize.current === maxSize) {
        setHasEnteredWomb(true)
        document.documentElement.style.setProperty("--html-overflow", `auto`)
      } else {
        document.documentElement.style.setProperty("--html-overflow", `hidden`)
      }
    },
    [
      setHasEnteredWomb,
      setWombIsClosed,
      setScrolled,
      updateWombStyles,
      updateTitleStyle,
    ]
  )

  useEventListener(
    "touchstart",
    (event) => {
      autoScrolling.current = false
    },
    []
  )

  useEventListener(
    // won't fire on desktop because overlay index is -1
    "scroll",
    () => {
      const maxSize = Math.min(window.innerWidth, window.innerHeight)

      if (
        window.scrollY > 0 ||
        !scrollOverlayRef.current ||
        wombSize.current === maxSize
      )
        return

      const deltaY = scrollOverlayRef.current.scrollTop - lastOverlayY.current
      if (deltaY > 0) {
        // because we start lastOverlayY.current at 10 * maxSize
        setScrolled(true)
      }
      lastOverlayY.current = scrollOverlayRef.current.scrollTop

      wombSize.current = Math.max(
        Math.min(wombSize.current + deltaY * 0.25, maxSize),
        startSize
      )

      updateWombStyles(wombSize.current, maxSize * 0.95)
      updateTitleStyle(wombSize.current, maxSize)
      setWombIsClosed(wombSize.current === startSize)

      if (wombSize.current === maxSize) {
        setHasEnteredWomb(true)
        document.documentElement.style.setProperty("--html-overflow", `auto`)
        scrollOverlayRef.current?.style.setProperty("z-index", "-1")

        const overflowScroll = (deltaY: number) => {
          if (!autoScrolling.current) return
          const newDelta = deltaY * 0.9
          window.scrollBy(0, newDelta)
          if (newDelta > 0.01) {
            requestAnimationFrame(() => overflowScroll(newDelta))
          }
        }

        autoScrolling.current = true
        overflowScroll(deltaY)
      }
    },
    [
      setHasEnteredWomb,
      setWombIsClosed,
      setScrolled,
      updateWombStyles,
      updateTitleStyle,
    ],
    scrollOverlayRef
  )
}

/**
 * Womb styles
 */
function updateWombStyles(wombSize: number, maxSize: number) {
  const womb = document.querySelector(".womb") as HTMLDivElement | null
  if (!womb) return

  const boundedWomb = Math.min(wombSize, maxSize)

  womb.style.height = `${boundedWomb}px`
  womb.style.width = `${boundedWomb}px`
}

/**
 * Title inside womb styles
 */
function updateTitleStyle(wombSize: number, maxSize: number) {
  const title = document.querySelector(".title") as HTMLDivElement | null
  if (!title) return

  const titleScale = getMappedValue(
    wombSize,
    startSize,
    maxSize,
    0.0025,
    1,
    easeInCubic
  )

  title.style.scale = `${titleScale}`

  const titleOpacity =
    wombSize < maxSize * 0.975
      ? getMappedValue(wombSize, startSize, maxSize * 0.5, 0, 1, easeOutQuad)
      : getMappedValue(wombSize, maxSize * 0.975, maxSize, 1, 0, easeInQuad)

  title.style.opacity = `${titleOpacity}`
}
