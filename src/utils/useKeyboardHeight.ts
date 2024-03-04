import { use, useEffect, useState } from "react"

export default function useKeyboardIsOpen() {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    console.log(isMobile)

    if (!isMobile) return
    setWindowHeight(window.innerHeight)
    const handleResize = () => {
      const newHeight = window.innerHeight
      if (newHeight < windowHeight) {
        setKeyboardIsOpen(true)
      } else {
        setKeyboardIsOpen(false)
      }
      setWindowHeight(newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Clean up listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return keyboardIsOpen
}
