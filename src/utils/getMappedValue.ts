import { reverse } from "lodash"

/**
 * Map a number from one range to another
 * From chat gpt wow!
 */
export function getMappedValue(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
  easingFunction?: (x: number) => number,
  reverseRange: boolean = false,
  reverseMargin: number = 0
) {
  // Calculate the percentage of the original range that the value represents
  let percentage = (value - fromLow) / (fromHigh - fromLow)

  if (reverseRange) {
    // ???
    if (percentage > 1 + reverseMargin) {
      percentage = 1 - (percentage - 1) + reverseMargin
    }
  }

  const boundedPercentage = Math.max(0, Math.min(1, percentage)) // bound or else depending on the easing function, can return NaN
  const easedPercentage = easingFunction
    ? easingFunction(boundedPercentage)
    : boundedPercentage

  // Use the percentage to map the value to the new range
  const newValue = toLow + easedPercentage * (toHigh - toLow)

  return newValue
}
