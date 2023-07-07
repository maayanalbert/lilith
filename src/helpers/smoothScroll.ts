import { getMappedValue } from "./getMappedValue"

/**
 * Automatically scroll a given distance using a cubic bezier curve
 *
 * Pass in the window to ensure that we're in a place that has access to it
 */
export function smoothScroll(
  distance: number,
  duration: number,
  window: Window
) {
  let startTime: number | undefined
  const startScroll = window.scrollY
  const animate = (currentTime: number) => {
    if (startTime === undefined) {
      startTime = currentTime
    }

    const timeElapsed = currentTime - startTime

    // the % of the animation we've completed from 0 to 1
    const rawKeyframe = getMappedValue(timeElapsed, 0, duration, 0, 1)

    // map it to the easing function of choice
    const easedKeyframe = easeInOutSine(rawKeyframe)

    const nextLocation = getMappedValue(
      easedKeyframe,
      0,
      1,
      startScroll,
      startScroll + distance
    )

    window.scrollTo(0, nextLocation)

    if (timeElapsed < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2
}
