import useEventListener from "@/utils/useEventListener"
import { useMousePercentToCenterCss } from "@/utils/useMousePercentToCenterCss"
import { useEffect, useState } from "react"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useEffect(() => {
    document.title = "Eve"
  }, [])

  const [state, setState] = useState<"CLOSED" | "OPEN" | "FINISHED">("CLOSED")
  const [finishable, setFinishable] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [finishedVisible, setFinishedVisible] = useState(false)

  useMousePercentToCenterCss()

  useEventListener(
    "mousemove",
    () => {
      if (state === "OPEN" && finishable) {
        setShowCursor(true)
      }
    },
    [state, finishable]
  )

  return (
    <div className={`${!showCursor ? "cursor-none" : ""}  h-full w-full`}>
      {state === "FINISHED" && ( // learn more text
        <div
          className={`h-full w-full flex justify-center items-center absolute`}
        >
          <div
            className="transition-all duration-500 flex flex-row gap-1.5 sm:text-lg"
            style={{ color: "gray", opacity: finishedVisible ? 1 : 0 }}
          >
            <p>Contact</p>
            <a className="underline" href={"mailto:maaayan@eve.space"}>
              maayan@eve.space
            </a>
            <p>to learn more</p>
          </div>
        </div>
      )}
      <div
        className={`h-full w-full flex justify-center items-center ${
          state === "FINISHED" ? "pointer-events-none" : ""
        }`}
      >
        <div
          className={`flex justify-center items-center rounded-full ${
            showCursor ? "cursor-pointer" : "" // womb
          } ${
            state === "CLOSED"
              ? "h-[132px] w-[132px] hover:h-[150px] hover:w-[150px] duration-300"
              : state === "OPEN"
              ? `sm:h-[550px] sm:w-[550px] w-[400px] h-[400px]
              ${showCursor ? "duration-300" : "duration-1000"}`
              : `h-0 w-0 duration-1000`
          }
         transition-all ease-in-out`}
          onClick={() => {
            if (state === "CLOSED") {
              setState("OPEN")
              setShowCursor(false)
              setTimeout(() => setFinishable(true), 700)
            } else if (state === "OPEN") {
              setState("FINISHED")
              setTimeout(() => setFinishedVisible(true), 950)
            }
          }}
        >
          <div
            className={`fade-in-womb rounded-full h-full w-full bg-white
            flex justify-center items-center overflow-hidden ${
              state === "OPEN"
                ? "shadow-[inset_0_0_10px_rgb(50_50_50)]"
                : state === "FINISHED"
                ? "shadow-[inset_0_0_5px_gray]"
                : `expand-womb`
            }`}
          >
            <div
              className={`whitespace-nowrap flex flex-row gap-1 text-4xl select-none h-full w-full flex justify-center items-center rounded-full
              transition-all ease-in-out duration-500 ${
                state === "CLOSED" ? "opacity-0 hover:opacity-[.15]" : ""
              }`}
              style={{
                color: "rgb(44, 44, 44)",
                filter: state === "CLOSED" ? "blur(2px)" : undefined,
              }}
            >
              Eve is a space to talk to yourself
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
