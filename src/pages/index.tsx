import { use, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMousePosition } from "@/utils/useMousePosition"
import { useMouseMove } from "@/utils/useMouseMove"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    // Set the initial position of the dot to the center
    setDotX(centerX)
    setDotY(centerY)
  }, [])

  // const [mouseX, setMouseX] = useState(0)
  // const [mouseY, setMouseY] = useState(0)
  const [isInside, setIsInside] = useState(false)
  const radius = 66 / 2
  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(0)

  useMouseMove(
    (event: MouseEvent) => {
      const newIsInside = getIsInside(
        dotX,
        dotY,
        radius,
        event.clientX,
        event.clientY
      )
      if (isInside && !newIsInside) {
        const angle = Math.atan2(event.clientY - dotY, event.clientX - dotX)
        const newDotX = dotX + Math.cos(angle) * event.movementX
        const newDotY = dotY + Math.sin(angle) * event.movementY
        setDotX(newDotX)
        setDotY(newDotY)
        const newNewIsInside = getIsInside(
          newDotX,
          newDotX,
          radius,
          event.clientX,
          event.clientY
        )
        setIsInside(newNewIsInside)
      } else {
        setIsInside(newIsInside)
      }
    },
    [isInside]
  )

  return (
    <div className="h-full w-full">
      <div
        className="rounded-full bg-white cursor-pointer h-[66px] w-[66px] absolute"
        style={{ top: dotY - radius, left: dotX - radius }}
      />
    </div>
  )
}

// hover:h-[77px] hover:w-[77px] transition-all duration-300 ease-in-out

function getIsInside(
  x: number,
  y: number,
  radius: number,
  mouseX: number,
  mouseY: number
) {
  const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)
  return distance < radius
}
