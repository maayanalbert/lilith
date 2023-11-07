import useEventListener from "@/utils/useEventListener"
import useOutsideClick from "@/utils/useOutsideClick"
import {
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"

interface Props {
  isVisible: boolean
}

export function SecondBlurb({ isVisible }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-[350px] sm:w-[530px] text-center flex flex-col items-center  sm:text-lg font-light"
        style={{
          transitionProperty: "opacity",
          transitionDuration: "750ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <p className="text-lg sm:text-xl font-normal">Take a bite</p>
        <div className="h-6" />
        <p>Eve will launch as a mobile app this summer.</p>
        <p>
          To learn more, contact{" "}
          <a className="underline" href="mailto:maayan@eve.space">
            maayan@eve.space.
          </a>
        </p>
        <div className="h-8" />
        <NotifyField />
      </div>
    </div>
  )
}

function NotifyField() {
  const [state, setState] = useState<"NOTIFY" | "EMAIL" | "EXIT">("NOTIFY")
  const [onEmailDelayed, setOnEmailDelayed] = useState(false)
  useEventListener("keydown", (e) => {
    if (e.key === "Shift") setState("NOTIFY")
  })

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(ref, () => {
    if (state === "EMAIL") {
      setState("NOTIFY")
      setTimeout(() => setOnEmailDelayed(false), 100)
    }
  })

  const [email, setEmail] = useState("")

  return (
    <div
      ref={ref}
      className={`rounded-full border border-red-600 py-2 relative 
         whitespace-nowrap
          ${state === "EMAIL" && "sm:w-[360px] w-[300px]"}
          ${state !== "EMAIL" && "cursor-pointer"}
          ${state === "NOTIFY" && "hover:bg-red-600 bg-white"}
          `}
      style={{
        transitionProperty: "width, background",
        transitionDuration: state === "EMAIL" ? "600ms, 300ms" : "700ms, 300ms",
        transitionTimingFunction: easeInOut,
      }}
      onClick={() => {
        if (state === "NOTIFY") {
          setState("EMAIL")
          setTimeout(() => {
            setOnEmailDelayed(true)
            inputRef.current?.focus()
          }, 700)
        }
      }}
    >
      <p
        className={`h-full w-full text-red-600 hover:text-white select-none`}
        style={{
          opacity: state === "EMAIL" ? 0 : 1,
          transitionProperty: "color, opacity",
          transitionDuration:
            state === "EMAIL" || onEmailDelayed ? "350ms" : "300ms",
          transitionDelay: onEmailDelayed ? "350ms" : "0ms",
          transitionTimingFunction: `ease-in, ${
            state === "EMAIL" ? easeIn : easeOut
          }}`,
        }}
      >
        {state === "NOTIFY" || state === "EMAIL" ? "Notify Me" : "Exit"}
      </p>
      <div
        className={`w-full h-full absolute top-0 w-full rounded-full left-0 pl-6 pr-4
        transition-opacity duration-[350ms] flex flex-row justify-between items-center`}
        style={{
          opacity: state === "EMAIL" ? 1 : 0,
          pointerEvents: state === "EMAIL" ? undefined : "none",
          transitionTimingFunction: state === "EMAIL" ? easeIn : easeOut,
          transitionDelay: state === "EMAIL" ? "350ms" : "0ms",
        }}
      >
        <input
          ref={inputRef}
          placeholder="email@domain.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <ArrowRightIcon
          className={`cursor-pointer sm:h-[20px] sm:w-[20px] h-[18px] w-[18px]
          ${state === "EXIT" ? "text-black" : "text-gray-400"} 
         ${!!email && "hover:text-black"}`}
          onClick={() => {
            setState("EXIT")
            setTimeout(() => setOnEmailDelayed(false), 600)
          }}
        />
      </div>
    </div>
  )
}

const easeInOut = "cubic-bezier(0.4, 0, 0.2, 1)"
const easeIn = "cubic-bezier(0.4, 0, 1, 1)"
const easeOut = "cubic-bezier(0, 0, 0.2, 1)"
