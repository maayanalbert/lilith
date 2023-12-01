import useEventListener from "@/utils/useEventListener"
import { startSize } from "@/utils/useScrollAnimations"
import { set } from "lodash"
import { useState } from "react"

export default function Womb() {
  const [scrolled, setScrolled] = useState(false)
  const [scrolledToBottom, setScrolledToBottom] = useState(false)

  useEventListener(
    "scroll",
    () => {
      setScrolled(true)
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll) {
        setScrolledToBottom(true)
      }
    },
    []
  )

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
          } font-light w-full flex flex-row justify-center ${
            scrolledToBottom ? "text-[24px]" : "text-[20px]"
          } text-zinc-500`}
          style={{
            marginTop: scrolledToBottom ? startSize * 1.8 : startSize * 1.55,
          }}
        >
          <p className="hint">
            {scrolledToBottom ? "Take a Bite" : "(scroll)"}
          </p>
        </div>
      </div>
      <div // womb
        className={`womb absolute rounded-full ${
          !scrolled && "womb-enter"
        }  bg-white`}
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
  )
}
