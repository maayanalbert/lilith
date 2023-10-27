import { useMouseMove } from "@/utils/useMouseMove"
import { set } from "lodash"
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

  useMouseMove(() => {
    if (state === "OPEN" && finishable) {
      setShowCursor(true)
    }
  }, [state, finishable])

  return (
    <div className={`${showCursor ? "" : "cursor-none"}  h-full w-full`}>
      {state === "FINISHED" && (
        <div
          className={`h-full w-full flex justify-center items-center absolute`}
        >
          <div
            className="transition-all duration-500 flex flex-row gap-1.5"
            style={{ color: "gray", opacity: finishedVisible ? 1 : 0 }}
          >
            <p>Contact</p>
            <a href={"mailto:maaayan@eve.space"}>maayan@eve.space</a>
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
          className={`rounded-full bg-white flex justify-center items-center ${
            showCursor ? "cursor-pointer" : ""
          } ${
            state === "CLOSED"
              ? "h-[66px] w-[66px] hover:h-[77px] hover:w-[77px] duration-300"
              : state === "OPEN"
              ? `
              sm:h-[500px] sm:w-[500px] 
              h-[400px] w-[400px] ${
                showCursor ? "duration-300" : "duration-700"
              }`
              : "h-0 w-0 duration-700"
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
            className="whitespace-nowrap transition-all ease-in-out duration-1000 flex flex-row gap-1 text-xl select-none"
            style={{ opacity: state === "OPEN" ? 1 : 0 }}
          >
            Eve is a space to talk to yourself
          </div>
        </div>
      </div>
    </div>
  )
}
