import { MutableRefObject, useEffect } from "react"

/**
 * For using a window's event listener
 */
export default function useEventListener(
  eventName: string,
  handler: (_: any) => void,
  dependancies: any[] = [],
  ref?: MutableRefObject<HTMLElement | null>
) {
  useEffect(
    () => {
      const element = ref ? ref.current : window
      element?.addEventListener(eventName, handler)
      return () => {
        element?.removeEventListener(eventName, handler)
      }
    },
    dependancies // add the ref.current as a dependancy!
  )
}
