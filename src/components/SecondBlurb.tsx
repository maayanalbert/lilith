import { useStateContext } from "@/StateContext"
import { easeInSine, easeOutQuad, easeOutSine } from "@/utils/easingFns"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { getDist } from "@/utils/useScrollAnimations"
import { ArrowDownIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react"

export default function SecondBlurb() {
  const { isInsideWomb, secondBlurbVisible } = useStateContext()

  const curTargetScale = useRef(0)

  useEffect(() => {
    const circle = document.querySelector(".circle") as HTMLDivElement | null
    if (!circle) return

    circle.style.scale = "1"
    circle.style.opacity = "1"
  }, [])

  useEventListener("scroll", (event) => {
    const circle = document.querySelector(".circle") as HTMLDivElement | null
    if (!circle) return

    const maxScrollY = document.body.scrollHeight - window.innerHeight

    curTargetScale.current = getMappedValue(
      window.scrollY,
      0,
      maxScrollY,
      0.7,
      1.3
    )

    const animate = (targetScale: number) => {
      if (targetScale !== curTargetScale.current) return

      const curScale = parseFloat(circle.style.scale)

      const newScale = curScale * 0.95 + targetScale * 0.05

      circle.style.scale = `${newScale}`
      const opacity = getMappedValue(newScale, 1, 1.3, 1, 0, easeOutQuad)
      circle.style.opacity = `${opacity}`

      if (Math.abs(newScale - targetScale) > 0.01) {
        requestAnimationFrame(() => animate(targetScale))
      }
    }

    requestAnimationFrame(() => animate(curTargetScale.current))
  })

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-8">
      <div
        className="absolute w-full flex justify-center items-end top-0"
        style={{ height: `9svh` }}
      >
        <ArrowDownIcon
          width={20}
          height={20}
          className={isInsideWomb ? "title-trimmings" : undefined}
          style={{ opacity: isInsideWomb ? 1 : 0 }}
        />
      </div>
      <div
        className={`flex justify-center relative
        items-center sm:h-[350px] sm:w-[350px] h-[280px] w-[280px] p-6`}
        style={{
          lineHeight: 1.5,
          transitionProperty: "opacity",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: secondBlurbVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full h-full w-full absolute border border-black circle" // the circle
        />
        <p className="font-display sm:text-[22px] text-lg text-center font-light">
          Eve is an intelligent environment for human thought.
        </p>
      </div>
    </div>
  )
}
