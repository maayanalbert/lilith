import { useCardSize, useIsMobile } from "@/GlobalsContext"
import getBrowserType from "@/helpers/getBrowserType"
import getOnIpad from "@/helpers/getOnIpad"
import { useEffect, useRef, useState } from "react"

/**
 * The title text (your space)
 */
export default function Title() {
  const isMobile = useIsMobile()
  const cardSize = useCardSize()

  return (
    <div
      className="leading-normal sm:text-6xl text-5xl md:w-full sm:w-[400px] w-[250px] 
    text-center text-white flex flew-row justify-center"
      style={{
        paddingBottom: isMobile ? cardSize / 3 : 0,
      }}
    >
      <div
        className={`scroll-space ${
          isMobile ? "font-normal" : "font-extralight"
        } select-none cursor-default`}
      >
        <p style={{ color: "gray" }}>What's on your mind?</p>
      </div>
    </div>
  )
}
