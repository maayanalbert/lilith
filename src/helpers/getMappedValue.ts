/**
 * Map a number from one range to another
 * From chat gpt wow!
 */
export function getMappedValue(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
) {
  // Calculate the percentage of the original range that the value represents
  const percentage = (value - fromLow) / (fromHigh - fromLow)

  // Use the percentage to map the value to the new range
  const newValue = toLow + percentage * (toHigh - toLow)

  return newValue
}
