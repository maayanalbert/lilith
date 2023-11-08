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
        className="w-[350px] sm:w-[530px] text-center flex flex-col items-center sm:text-lg font-light"
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
  const [isFinished, setIsFinished] = useState(false)
  const [state, setState] = useState<"NOTIFY" | "EMAIL">("NOTIFY")
  const [onEmailDelayed, setOnEmailDelayed] = useState(false)
  useEventListener("keydown", (e) => {
    // if (e.key === "Escape") {
    //   setState("NOTIFY")
    //   setOnEmailDelayed(false)
    //   setIsFinished(false)
    // }

    if (e.key === "Enter" && state === "EMAIL") {
      submitEmail()
    }
  })

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(ref, () => {
    if (state === "EMAIL") {
      setState("NOTIFY")
      setTimeout(() => setOnEmailDelayed(false), 100)
    }
  })

  const submitEmail = () => !!email && setIsFinished(true)

  const [email, setEmail] = useState("")

  return (
    <div className="h-[47px] flex justify-center items-center relative w-full">
      <div
        className={`${
          isFinished
            ? "w-[47px] opacity-0 blur-[8px] scale-0"
            : "sm:w-[360px] w-[330px]"
        } 
      flex justify-center items-center overflow-hidden rounded-full h-[47px]`}
        style={{
          transitionProperty: "width, opacity, filter, transform",
          transitionDuration: "500ms, 500ms, 500ms, 500ms",
          transitionDelay: "0ms, 500ms, 500ms, 500ms",
          transitionTimingFunction: `${easeIn}, ${easeOut}, ${easeOut}, ${easeOut}`,
        }}
      >
        <div
          ref={ref}
          className={`rounded-full relative h-full
         whitespace-nowrap border border-red-600
         ${isFinished ? "bg-red-600" : "bg-white"}
          ${state === "EMAIL" && "sm:w-[360px] w-[330px]"}
          ${
            state === "NOTIFY" &&
            "hover:bg-red-600 w-[130px] hover:text-white text-red-600"
          }
          ${state !== "EMAIL" && "cursor-pointer"}
          `}
          style={{
            transitionProperty: "width, background",
            transitionDuration:
              state === "EMAIL" ? "600ms, 300ms" : "700ms, 300ms",
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
            className="h-full w-full hover:text-white select-none flex justify-center items-center"
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
            {state === "NOTIFY" || state === "EMAIL" ? "Notify Me" : ""}
          </p>
          <div
            className={`w-full h-full absolute top-0 w-full rounded-full left-0 pr-[8px]
        transition-opacity duration-[350ms] flex flex-row justify-between items-center`}
            style={{
              opacity: state === "EMAIL" && !isFinished ? 1 : 0,
              pointerEvents: state === "EMAIL" ? undefined : "none",
              transitionTimingFunction: state === "EMAIL" ? easeIn : easeOut,
              transitionDelay:
                state === "EMAIL" && !isFinished ? "350ms" : "0ms",
            }}
          >
            <input
              ref={inputRef}
              placeholder="email@domain.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-transparent w-full pl-6 h-full"
              type="email"
            />
            <div
              className={`rounded-full p-1.5 transition-all duration-200 ${
                email && "sm:hover:bg-gray-200"
              }`}
            >
              <ArrowRightIcon
                className={`sm:h-[20px] sm:w-[20px] h-[18px] w-[18px]
         ${email ? "text-black cursor-pointer" : "text-gray-400 "}`}
                onClick={submitEmail}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute 
        transition-opacity duration-[600ms] ease-in delay-[1200ms]`}
        style={{
          pointerEvents: isFinished ? undefined : "none",
          opacity: isFinished ? 1 : 0,
        }}
      >
        <p className={`sm:text-base text-sm text-gray-600`}>
          Your response has been submitted
        </p>
      </div>
    </div>
  )
}

const easeInOut = "cubic-bezier(0.4, 0, 0.2, 1)"
const easeIn = "cubic-bezier(0.4, 0, 1, 1)"
const easeOut = "cubic-bezier(0, 0, 0.2, 1)"
