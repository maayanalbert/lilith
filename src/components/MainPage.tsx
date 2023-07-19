import Title from "@/components/Title"
import Line from "@/components/Line"
import InfoCard from "@/components/InfoCard"
import AlphaCard from "@/components/AlphaCard"
import AboutCard from "@/components/AboutCard"
import { useCardSize, useIsMobile } from "@/GlobalsContext"
import NavBar from "./NavBar"
import { useEffect, useState } from "react"
import useEventListener from "@/hooks/useEventListener"
import { useRouter } from "next/router"
import { smoothScroll } from "@/helpers/smoothScroll"

/**
 * The main page where all of the content is
 */
export default function MainPage() {
  const cardSize = useCardSize()
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()
  const { page } = router.query

  // disable the page routing if we've alread scrolled
  useEventListener("scroll", () => setScrolled(true), [scrolled])

  // route to whatever page the url indicates
  useEffect(() => {
    // disable routing if we've already scrolled
    if (scrolled) return

    if (page === "alpha") {
      const scrollDist =
        4 * cardSize + window.innerHeight / 2 - (cardSize * 7) / 24
      if (isMobile) {
        smoothScroll(scrollDist, 600, window)
      } else {
        window.scrollTo(0, scrollDist)
      }
    } else if (page === "about") {
      const scrollDist =
        5 * cardSize + window.innerHeight / 2 - (cardSize * 7) / 24
      if (isMobile) {
        smoothScroll(scrollDist, 600, window)
      } else {
        window.scrollTo(0, scrollDist)
      }
    }
  }, [page, scrolled])

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Title />
      </div>
      <Line />
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: (cardSize * 7) / 24 }}
      >
        <InfoCard
          title="Enter the Ether"
          body="Eve is an app where you can journal and create your own space."
          index={0}
        />
        <InfoCard
          title="Explore yourself"
          body="Use Eve's AI tools to investigate your own mind and map your soul."
          index={1}
        />
        <InfoCard
          title="A space for you"
          body="Eve is private and secure by design. Only you can read your entries."
          index={2}
        />
        <AlphaCard />
        <AboutCard />
        {/* the bottom padding */}
        <div className="relative">
          <div style={{ height: `calc(50vh - ${180}px)`, width: "100vw" }} />
        </div>
        {/* */}
      </div>
    </>
  )
}
