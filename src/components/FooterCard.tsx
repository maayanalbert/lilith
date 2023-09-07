import getOnIpad from "@/helpers/getOnIpad"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import useEventListener from "@/hooks/useEventListener"
import { useRef } from "react"

/**
 * Made in New York footer
 */
export default function FooterCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    (event) => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        // the title
        setCardScrollClass(0, 200, 200, `--scroll-footer`)

        return
      }

      // Get the current scroll position
      const scrollTop = window.scrollY || window.pageYOffset

      // Get the total scrollable height of the page
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      // Calculate the number of pixels left to scroll to the bottom
      const pixelsLeftToScroll = scrollHeight - scrollTop
      setCardScrollClass(pixelsLeftToScroll, 50, 50, `--scroll-footer`)
    },
    [cardRef]
  )

  return (
    <div
      ref={cardRef}
      className="text-white w-full text-center p-6 scroll-footer"
    >
      Made in New York
    </div>
  )
}
