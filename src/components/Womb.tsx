import useEventListener from "@/utils/useEventListener"
import { startSize } from "@/utils/useScrollAnimations"
import { set } from "lodash"
import { useEffect, useState } from "react"

export default function Womb() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEventListener("scroll", () => setScrolled(true), [])

  const textMarginTop = startSize * 2.05

  useEffect(() => setIsMobile(window.innerWidth < 640))

  return (
    <div className="w-full relative" style={{ height: "100svh" }}>
      <div // hint
        className="absolute"
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <div
          className={`${
            !scrolled && "hint-enter"
          } font-light w-full flex flex-row justify-center sm:text-[28px] text-[30px] text-zinc-600`}
          style={{
            marginTop: textMarginTop,
            opacity: 0.85,
          }}
        >
          <p className="hint">{"(scroll)"}</p>
        </div>
      </div>
      <div
        className={`h-full w-full ${!scrolled ? "womb-enter" : ""}`} // womb
      >
        <div
          className={`womb absolute rounded-full bg-white`}
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            transformOrigin: "50% 50%",
            zIndex: -1,
            height: startSize,
            width: startSize,
          }}
        />
      </div>
      <div // title
        className="absolute title w-full"
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          opacity: 0,
          marginTop: textMarginTop * 0.6,
          fontSize: isMobile ? "38px" : "62px",
        }}
      >
        <p
          className={`font-display font-bold text-center text-white tracking-[.035em]`}
        >
          Welcome to Eve
        </p>
      </div>
    </div>
  )
}
