import { getMappedValue } from "./getMappedValue"

/**
 * Set the scroll class name for this part of the info card
 */
export function setCardScrollClass(
  cardDistFromCenter: number,
  upperScrollDuration: number, // when the card is on the top half of the screen
  lowerScrollDuration: number, // when the card is on the bottom half of the screen
  variableName: string
) {
  const keyframe =
    cardDistFromCenter > 0
      ? getMappedValue(cardDistFromCenter, 100, lowerScrollDuration, 0, 1)
      : getMappedValue(
          Math.abs(cardDistFromCenter),
          100,
          upperScrollDuration,
          0,
          1
        )

  const boundedOpacityKeyframe = Math.max(Math.min(keyframe, 1), 0)
  document.documentElement.style.setProperty(
    variableName,
    `${1 - boundedOpacityKeyframe}` // the % of the way you have scrolled to the second page
  )
}
