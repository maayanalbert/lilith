import { useFadeInTitle, useIsMobile } from "@/GlobalsContext"
import useEventListener from "@/hooks/useEventListener"

/**
 * The thought cloud on the home page
 */
export default function Cloud() {
  const isMobile = useIsMobile()
  const fadeInTitle = useFadeInTitle()

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      const scrollHeight = window.scrollY / (3 * window.innerHeight + 1)

      // flashes when it hits 1 so bound at .99
      const boundedScrollHeight = Math.max(Math.min(scrollHeight, 0.99), 0)

      document.documentElement.style.setProperty(
        "--scroll-cloud",
        `${boundedScrollHeight}` // the % of the way you have scrolled to the second page
      )
    },
    []
  )

  return (
    <div
      className={`w-[200%] h-[200%] absolute animate-cloud`}
      style={{
        top: isMobile ? "calc(50% + 12px)" : "20%",
        transform: "translate(-25%)",
      }}
    >
      <div className="h-full w-full relative">
        <div
          className="h-full w-full scroll-cloud absolute"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at center, white, transparent)",
          }}
        />
      </div>
    </div>
  )
}
