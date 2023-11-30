import useEventListener from "@/utils/useEventListener"
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
            scrolledToBottom ? "text-[27px]" : "text-3xl"
          } text-zinc-500`}
          style={{
            marginTop: scrolledToBottom ? 88 * 2 + 13 : 88 * 2,
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
          height: 88,
          width: 88,
        }}
      />
    </div>
  )
}
