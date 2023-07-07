import { useCardSize, useFadeInTitle, useIsMobile } from "@/GlobalsContext"
import useEventListener from "@/hooks/useEventListener"
import useVirtualKeyboardIsOpen from "@/hooks/useVirtualKeyboardIsOpen"

/**
 * The line between the title text and information cards
 * @returns
 */
export default function Line() {
  const isMobile = useIsMobile()
  const fadeInTitle = useFadeInTitle()
  const virtualKeyboardIsOpen = useVirtualKeyboardIsOpen()

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      const scrollHeight = window.scrollY / (window.innerHeight + 1)
      const boundedScrollHeight = Math.max(Math.min(scrollHeight, 1), 0)

      // disable if virtual keyboard is open so we can type in the space name easter egg
      if (virtualKeyboardIsOpen) {
        document.documentElement.style.setProperty(
          "--scroll",
          `${0}` // the % of the way you have scrolled to the second page
        )
        return
      }

      document.documentElement.style.setProperty(
        "--scroll",
        `${boundedScrollHeight}` // the % of the way you have scrolled to the second page
      )
    },
    [virtualKeyboardIsOpen]
  )

  return (
    <div
      className={`h-[50%] w-[1px] absolute left-1/2 flex flex-col justify-end`}
      style={{
        top: isMobile ? "calc(50% + 12px)" : "calc(50% + 70px)",
        height: isMobile ? "58%" : "51%",
        opacity: isMobile ? 0.8 : 1,
      }}
    >
      <div className="scroll-line-height scroll-line-opacity w-full">
        <div
          className={`${
            fadeInTitle ? "animate-line" : ""
          } h-full w-full bg-white`}
        />
      </div>
    </div>
  )
}
