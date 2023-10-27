import { Ref, RefObject, useEffect, useState } from "react"

/**
 * Use the current mouse position
 */
export function useMousePosition() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const updateMouse = (event: MouseEvent) => {
    console.log(event.clientX)
  }

  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener("mousemove", updateMouse)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", updateMouse)
    }
  }, [])

  return { mouseX, mouseY }
}
