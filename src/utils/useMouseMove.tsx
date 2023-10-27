import { Ref, RefObject, useEffect, useState } from "react"

/**
 * Called on mouse move
 */
export function useMouseMove(
  callback: (event: MouseEvent) => void,
  deps?: any[]
) {
  const updateMouse = (event: MouseEvent) => {
    callback(event)
  }

  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener("mousemove", updateMouse)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", updateMouse)
    }
  }, [...(deps ? deps : [])])
}
