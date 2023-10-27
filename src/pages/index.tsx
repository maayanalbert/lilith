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
  const [copied, setCopied] = useState(false)
  const [copiedVisible, setCopiedVisible] = useState(true)

  useMouseMove(() => {
    if (state === "OPEN" && finishable) {
      setState("FINISHED")
      setTimeout(() => setShowCursor(true), 1200)
    }
  }, [state, finishable])

  return (
    <div className={`${showCursor ? "" : "cursor-none"} h-full w-full`}>
      {state !== "CLOSED" && (
        <div
          className={`h-full w-full flex justify-center items-center absolute`}
        >
          <div
            className="transition-all duration-500 delay-1000 flex flex-row gap-1.5"
            style={{ color: "gray", opacity: state === "FINISHED" ? 1 : 0 }}
          >
            <p>Contact</p>
            <div>
              <div className="relative" style={{ opacity: copied ? 1 : 0 }}>
                <p
                  className="text-white absolute whitespace-nowrap text-sm transition-all duration-1000 ease-in-out"
                  style={{ top: 25, left: 5, opacity: copiedVisible ? 1 : 0.5 }}
                >
                  Copied to clipboard
                </p>
              </div>

              <u
                className={showCursor ? "cursor-pointer" : ""}
                onClick={() => {
                  setCopied(true)
                  setCopiedVisible(false)
                }}
              >
                maayan@eve.space
              </u>
            </div>
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
            state === "CLOSED"
              ? "h-[66px] w-[66px] hover:h-[77px] hover:w-[77px] duration-300 cursor-pointer"
              : state === "OPEN"
              ? "h-[500px] w-[500px] duration-700"
              : "h-0 w-0 duration-700"
          }
         transition-all ease-in-out`}
          onClick={() => {
            if (state === "CLOSED") {
              setState("OPEN")
              setShowCursor(false)
              setTimeout(() => setFinishable(true), 700)
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
