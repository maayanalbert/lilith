import Title from "@/components/Title"
import Line from "@/components/Line"
import InfoCard from "@/components/InfoCard"
import AlphaCard from "@/components/AlphaCard"
import { useCardSize, useIsMobile } from "@/GlobalsContext"
import { useEffect, useState } from "react"
import useEventListener from "@/hooks/useEventListener"
import { useRouter } from "next/router"

/**
 * The main page where all of the content is
 */
export default function MainPage() {
  const cardSize = useCardSize()

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Title />
      </div>
      <Line />
      <div
        className="flex flex-col items-center"
        style={{ paddingTop: (cardSize * 7) / 24 }}
      >
        <InfoCard
          title="Your personal thought partner"
          body="Built to boost creativity, reframe experiences, and organize the snippets of your mind."
          index={0}
        />
        <AlphaCard />
        {/* the bottom padding */}
        <div className="relative">
          <div style={{ height: `calc(50vh - ${180}px)`, width: "100vw" }} />
        </div>
        {/* */}
      </div>
    </>
  )
}
