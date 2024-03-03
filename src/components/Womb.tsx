import useEventListener from "@/utils/useEventListener"
import { shrinkCutoff, startSize } from "@/utils/useScrollAnimations"
import { set } from "lodash"
import { useState } from "react"

export default function Womb() {
  const [scrolled, setScrolled] = useState(false)
  const [passedShrinkCutoff, setPassedShrinkCutoff] = useState(false)
  const [isCircle, setIsCircle] = useState(true)

  useEventListener(
    "scroll",
    () => {
      setScrolled(true)
      if (window.scrollY > shrinkCutoff) {
        setPassedShrinkCutoff(true)
      }
      setIsCircle(window.scrollY < shrinkCutoff)
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
          } font-light w-full flex flex-row justify-center text-[27px] text-zinc-500`}
          style={{
            marginTop: startSize * 2,
          }}
        >
          <p className="hint cursor-default select-none">
            {passedShrinkCutoff ? "" : "(scroll)"}
          </p>
        </div>
      </div>
      <div // wrapper on womb for breathing animation
        className={`h-full w-full absolute flex 
        items-center justify-center ${isCircle ? "womb-breathe" : ""}`}
        style={{ zIndex: -1 }}
      >
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
    </div>
  )
}
