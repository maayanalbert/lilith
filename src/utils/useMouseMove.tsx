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

// useEventListener(
//   "scroll",
//   () => {
//     const scrollHeight = window.scrollY / (window.innerHeight + 1)
//     const boundedScrollHeight = Math.max(Math.min(scrollHeight, 1), 0)

//     // disable if virtual keyboard is open so we can type in the space name easter egg
//     if (virtualKeyboardIsOpen) {
//       document.documentElement.style.setProperty(
//         "--scroll",
//         `${0}` // the % of the way you have scrolled to the second page
//       )
//       return
//     }

//     document.documentElement.style.setProperty(
//       "--scroll",
//       `${boundedScrollHeight}` // the % of the way you have scrolled to the second page
//     )
//   },
//   [virtualKeyboardIsOpen]
// )
