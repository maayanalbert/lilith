import { useEffect } from "react"
import getDistance from "./getDistance"

// all callbacks receive a scroll ratio, which is a number between 0 and 1

// for react
export function useScrollEventListener(
  callback: (scrollRatio: number, absoluteScroll: number) => void,
  dependancies: any[] = []
) {
  useEffect(() => {
    const processedCallBack = () => {
      const scrollRatio =
        window.scrollY / (getMaxScrollY() - window.innerHeight)
      callback(scrollRatio, window.scrollY)
    }
    window.addEventListener("scroll", processedCallBack)
    return () => {
      window.removeEventListener("scroll", processedCallBack)
    }
  }, dependancies)
}

// for vanilla js
// removes it on unload too
export function addScrollEventListenerSafe(
  callback: (scrollRatio: number) => void
) {
  const processedCallBack = () => {
    const scrollRatio = window.scrollY / (getMaxScrollY() - window.innerHeight)

    callback(scrollRatio)
  }
  window.addEventListener("scroll", processedCallBack)
  window.addEventListener("beforeunload", () =>
    window.removeEventListener("scroll", processedCallBack)
  )
}

export function getMaxScrollY() {
  return 6 * getDistance(window.innerWidth / 2, window.innerHeight / 2, 0, 0)
}
