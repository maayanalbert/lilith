import { use, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMousePosition } from "@/utils/useMousePosition"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  const { mouseX, mouseY } = useMousePosition()
  const [isInside, setIsInside] = useState(false)

  const radius = 77
  const [dotX, setDotX] = useState(0)
  const [dotY, setDotY] = useState(0)

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="rounded-full bg-white cursor-pointer h-[66px] w-[66px] hover:h-[77px] hover:w-[77px] transition-all duration-300 ease-in-out" />
    </div>
  )
}
