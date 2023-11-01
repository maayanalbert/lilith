import { useEffect } from "react"

/**
 * For using a window's event listener
 */
export default function useEventListener(
  eventName: string,
  handler: (_: any) => void,
  dependancies?: any[]
) {
  useEffect(
    () => {
      window.addEventListener(eventName, handler)
      return () => {
        window.removeEventListener(eventName, handler)
      }
    },
    dependancies ? dependancies : []
  )
}
