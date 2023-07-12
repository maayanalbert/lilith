import { useCardSize, useFadeInTitle, useIsMobile } from "@/GlobalsContext"
import getOnIpad from "@/helpers/getOnIpad"
import { smoothScroll } from "@/helpers/smoothScroll"
import Image from "next/image"
import { useState } from "react"

/**
 * The navigation bar between pages
 */
export default function NavBar() {
  const cardSize = useCardSize()
  const isMobile = useIsMobile()
  const columnWidth = isMobile ? 75 : 80
  const [activeItem, setActiveItem] = useState<
    "LOGO" | "BETA" | "ABOUT" | undefined
  >()
  const fadeInTitle = useFadeInTitle()
  const transitionDuration = 150

  return (
    <div
      className="absolute left-0 flex justify-center items-center w-full h-full select-none"
      style={{
        top: isMobile ? -61 : -72,
        paddingBottom: isMobile ? cardSize / 3 : 0,
      }}
    >
      <div className="text-white text-sm items-center flex flex-row">
        <div className="scroll-logo">
          <div className={fadeInTitle ? "animate-logo" : ""}>
            <p
              style={{
                transitionDuration: `${transitionDuration}ms`,
                width: isMobile
                  ? columnWidth
                  : activeItem === "LOGO"
                  ? columnWidth + 10
                  : columnWidth,
                opacity: isMobile
                  ? 0.35
                  : activeItem === "BETA" || activeItem === "ABOUT"
                  ? 0.4
                  : undefined,
                filter: isMobile
                  ? undefined
                  : activeItem === "BETA" || activeItem === "ABOUT"
                  ? "blur(1px)"
                  : undefined,
              }}
              className={`flex justify-center transition-all ease-linear cursor-pointer ${
                isMobile
                  ? ""
                  : "hover:font-normal hover:opacity-[1] hover:scale-[1.1] opacity-[0.45]"
              }`}
              onMouseEnter={() => setActiveItem("LOGO")}
              onMouseLeave={() => setActiveItem(undefined)}
              onClick={() =>
                smoothScroll(
                  cardSize + window.innerHeight / 2 - (cardSize * 7) / 24,
                  350,
                  window
                )
              }
            >
              {/* <Image src="/logos/eve.svg" alt="" width={25} height={25} /> */}
              <div
                className="bg-white rounded-full"
                style={{ width: 15, height: 15 }}
              />
            </p>
          </div>
        </div>
        <div className="scroll-nav-items">
          <div className={fadeInTitle ? "animate-nav-items" : ""}>
            <p
              style={{
                transitionDuration: `${transitionDuration}ms`,
                width: isMobile // disable width and filter transitions on mobile
                  ? columnWidth
                  : activeItem === "BETA"
                  ? columnWidth + 5
                  : columnWidth,
                filter: isMobile
                  ? undefined
                  : activeItem === "ABOUT" || activeItem === "LOGO"
                  ? "blur(0.75px)"
                  : undefined,
                opacity: isMobile ? 0.35 : undefined, // leave undefined on desktop so hover animation works
              }}
              onMouseEnter={() => setActiveItem("BETA")}
              onMouseLeave={() => setActiveItem(undefined)}
              className={`transition-all ease-linear text-center ${
                isMobile ? "font-medium" : "font-light"
              }
             cursor-pointer opacity-[0.45] ${
               isMobile
                 ? ""
                 : "hover:font-normal hover:opacity-[1] hover:scale-[1.1]"
             }`}
              onClick={() =>
                smoothScroll(
                  4 * cardSize + window.innerHeight / 2 - (cardSize * 7) / 24,
                  600,
                  window
                )
              }
            >
              access
            </p>
          </div>
        </div>
        <div className="scroll-nav-items">
          <div className={fadeInTitle ? "animate-nav-items" : ""}>
            <p
              style={{
                transitionDuration: `${transitionDuration}ms`,
                width: isMobile
                  ? columnWidth
                  : activeItem === "ABOUT"
                  ? columnWidth + 10
                  : columnWidth,
                filter: isMobile
                  ? undefined
                  : activeItem === "BETA" || activeItem === "LOGO"
                  ? "blur(0.75px)"
                  : undefined,
                opacity: isMobile ? 0.35 : undefined,
              }}
              onMouseEnter={() => setActiveItem("ABOUT")}
              onMouseLeave={() => setActiveItem(undefined)}
              className={`transition-all ease-linear text-center ${
                isMobile ? "font-medium" : "font-light"
              }
              cursor-pointer ${
                isMobile
                  ? ""
                  : "hover:font-normal hover:opacity-[1] opacity-[0.45] hover:scale-[1.1]"
              }`}
              onClick={() =>
                smoothScroll(
                  5 * cardSize + window.innerHeight / 2 - (cardSize * 7) / 24,
                  600,
                  window
                )
              }
            >
              about
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
