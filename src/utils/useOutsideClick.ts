import { RefObject } from "react"
import useEventListener from "./useEventListener"

/**
 * Fire callback whenever a click occurs outside of the provided ref
 * @param ref
 * @param callback
 */
export default function useOutsideClick(
  ref: RefObject<any>,
  callback: () => void
) {
  function handleClick(event: MouseEvent) {
    if (ref.current && !(ref.current as any).contains(event.target)) {
      callback()
    }
  }

  useEventListener("mousedown", handleClick, [callback, ref.current])
}
