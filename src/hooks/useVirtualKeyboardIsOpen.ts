import { useIsMobile } from "@/GlobalsContext"
import { useEffect, useState } from "react"

/**
 * Track if the virtual keyboard is open
 */
export default function useVirtualKeyboardIsOpen() {
  // set it to something very large because the virtual keboard should always start as closed
  const [lastViewPortHeight, setLastViewPortHeight] = useState(200000000)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const handler = () => {
    if (window.visualViewport === null) return

    setIsOpen(!isOpen)

    if (
      window.visualViewport.height <
      (lastViewPortHeight * 3) / 4
      // use this proportion to account for the fact that the viewport height also changes when you scroll down
      // and the lower menu bar disappears
    ) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
    setLastViewPortHeight(window.visualViewport.height)
  }

  useEffect(() => {
    if (!isMobile) return // don't track if it's not mobile
    window.visualViewport?.addEventListener("resize", handler)
    return () => {
      window.visualViewport?.removeEventListener("resize", handler)
    }
  }, [lastViewPortHeight, isOpen])

  return isOpen
}
