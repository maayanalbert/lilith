import { useEffect, useRef } from "react"
import { easeOutQuad } from "./easingFns"
import { getMappedValue } from "./getMappedValue"

export default function useAnimateCircle() {
  const curTargetScale = useRef(1)
  useEffect(() => {
    const circle = document.querySelector(".circle") as HTMLDivElement | null
    if (!circle) return

    circle.style.scale = "1"
    circle.style.opacity = "1"
  }, [])

  const animateCircle = (targetScale: number, circle: HTMLDivElement) => {
    const animate = (targetScale: number) => {
      if (targetScale !== curTargetScale.current) return

      const curScale = parseFloat(circle.style.scale)

      const newScale = curScale * 0.95 + targetScale * 0.05
      circle.style.scale = `${newScale}`
      const opacity = getMappedValue(newScale, 1, 1.2, 1, 0.85, easeOutQuad)
      circle.style.opacity = `${opacity}`

      if (Math.abs(newScale - targetScale) > 0.01) {
        requestAnimationFrame(() => animate(targetScale))
      }
    }

    requestAnimationFrame(() => animate(curTargetScale.current))
  }

  return { animateCircle, curTargetScale }
}
