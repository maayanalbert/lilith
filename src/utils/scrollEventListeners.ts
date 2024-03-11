import { useEffect, useRef } from "react"
import getDistance from "./getDistance"

// all callbacks receive a scroll ratio, which is a number between 0 and 1

// for react
export function useScrollEventListener(
  callback: (scrollRatio: number, absoluteScroll: number) => void,
  dependancies: any[] = []
) {
  const scrollY = useRef(0)
  useEffect(() => {
    const processedCallBack = getProcessedCallback(callback, scrollY.current)

    addScrollListener(processedCallBack)
    return () => {
      removeScrollListener(processedCallBack)
    }
  }, dependancies)
}

// for vanilla js
// removes it on unload too
export function addScrollEventListenerSafe(
  callback: (scrollRatio: number) => void
) {
  let scrollY = 0
  const processedCallBack = getProcessedCallback(callback, scrollY)
  addScrollListener(processedCallBack)
  window.addEventListener("beforeunload", () =>
    removeScrollListener(processedCallBack)
  )
}

/**
 * Add a scroll listener
 */
function addScrollListener(callback: (event: any) => void) {
  if (isMobile()) {
    window.addEventListener("scroll", callback)
  } else {
    window.addEventListener("wheel", callback)
  }
}

/**
 * Remove a scroll listener
 */
function removeScrollListener(callback: (event: any) => void) {
  if (isMobile()) {
    window.removeEventListener("scroll", callback)
  } else {
    window.removeEventListener("wheel", callback)
  }
}

/**
 * Get the callback that will be used in the event listener
 */
function getProcessedCallback(
  callback: (scrollRatio: number, absoluteScroll: number) => void,
  scrollY: number
) {
  const maxScrollY = getMaxScrollY()

  if (isMobile()) {
    return (event: any) => {
      const scrollRatio =
        window.scrollY / (getMaxScrollY() - window.innerHeight)
      callback(scrollRatio, window.scrollY)
    }
  } else {
    return (event: any) => {
      scrollY = Math.min(Math.max(0, scrollY + event.deltaY), maxScrollY)

      const scrollRatio = scrollY / maxScrollY
      callback(scrollRatio, scrollY)
    }
  }
}

/**
 * Get the maximum amount we can scroll
 */
export function getMaxScrollY() {
  return (
    (isMobile() ? 6 : 5) *
    getDistance(window.innerWidth / 2, window.innerHeight / 2, 0, 0)
  )
}

function isMobile() {
  return navigator.maxTouchPoints > 1
}
