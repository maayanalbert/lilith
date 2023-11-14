import useEventListener from "@/utils/useEventListener"
import useOutsideClick from "@/utils/useOutsideClick"
import {
  ArrowDownIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid"
import axios from "axios"
import { set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"

interface Props {
  isVisible: boolean
}

export function ThirdBlurb({ isVisible }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="absolute w-full flex justify-center items-end top-0"
        style={{ height: `9svh` }}
      >
        <ArrowDownIcon width={20} height={20} />
      </div>
      <div
        className="text-center flex flex-col items-center"
        style={{
          transitionProperty: "opacity",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* <p
          className="font-display sm:text-2xl text-xl"
          style={{ lineHeight: 1.5 }}
        >
          Take a bite
        </p>
        <div className="h-6" /> */}

        <p
          className="font-light font-display sm:text-xl text-lg sm:w-[450px] w-[280px]"
          style={{ lineHeight: 1.5 }}
        >
          Eve will launch as a mobile app this summer. For more information,
          contact{" "}
          <a className="underline" href="mailto:maayan@eve.space">
            maayan@eve.space.
          </a>
        </p>
        <div className="h-8" />
        <div className="font-light sm:text-lg">
          <NotifyField />
        </div>
      </div>
      <div
        className="absolute bottom-0 w-full flex flex-row justify-center font-light text-sm fading-content"
        style={{ height: "8svh" }}
      >
        Copyright Eve Technologies 2023
      </div>
    </div>
  )
}

function NotifyField() {
  const [isFinished, setIsFinished] = useState(false)
  const [isFinishedDelayed, setIsFinishedDelayed] = useState(false)
  const [state, setState] = useState<"NOTIFY" | "EMAIL">("NOTIFY")
  const [onEmailDelayed, setOnEmailDelayed] = useState(false)
  const [error, setError] = useState(false)
  const [mouseMovedSinceFinished, setMouseMovedSinceFinished] = useState(false)

  useEventListener(
    "mousemove",
    () => isFinishedDelayed && setMouseMovedSinceFinished(true),
    [isFinishedDelayed]
  )

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      // reset for debugging
      setState("NOTIFY")
      setOnEmailDelayed(false)
      setIsFinished(false)
      setIsFinishedDelayed(false)
    }

    if (e.key === "Enter" && state === "EMAIL" && email) {
      mutateAsync()
    }
  })

  // mutate call for sending the email
  const { mutateAsync } = useMutation(
    () => {
      const axiosCall = async () => {
        axios.post(
          "https://getform.io/f/f0b97eb1-3068-4702-8fbb-f9fd0061d3f2",
          {
            message: email,
          },
          { headers: { Accept: "application/json" } }
        )
      }
      return axiosCall()
    },
    {
      onSettled: (data, error) => {
        if (error) {
          setError(true)
        } else {
          setIsFinished(true)
          setTimeout(() => setIsFinishedDelayed(true), 1100)
        }
      },
    }
  )

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(ref, () => {
    if (state === "EMAIL") {
      setState("NOTIFY")
      setTimeout(() => setOnEmailDelayed(false), 1100) // delay for submitted text appearing
    }
  })

  const [email, setEmail] = useState("")

  return (
    <div className="h-[47px] flex justify-center items-center relative w-full">
      <div
        className={`${
          isFinished
            ? "w-[47px] opacity-0 blur-[8px] scale-0"
            : "sm:w-[400px] w-[330px]"
        } 
      flex justify-center items-center overflow-hidden rounded-full h-[47px]`}
        style={{
          transitionProperty: "width, opacity, filter, transform",
          transitionDuration: "450ms, 500ms, 500ms, 500ms",
          transitionDelay: "0ms, 450ms, 450ms, 450ms",
          transitionTimingFunction: `${easeIn}, ${easeOut}, ${easeOut}, ${easeOut}`,
        }}
      >
        <div
          ref={ref}
          className={`rounded-full relative h-full
         whitespace-nowrap border border-red-600
         ${isFinished ? "bg-red-600" : "bg-white"}
          ${state === "EMAIL" && "sm:w-[400px] w-[330px]"}
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
              {error ? (
                <ArrowPathIcon
                  className={`sm:h-[20px] sm:w-[20px] h-[18px] w-[18px]
         ${email ? "text-black cursor-pointer" : "text-gray-400 "}`}
                  onClick={() => email && mutateAsync()}
                />
              ) : (
                <ArrowRightIcon
                  className={`sm:h-[20px] sm:w-[20px] h-[18px] w-[18px]
         ${email ? "text-black cursor-pointer" : "text-gray-400 "}`}
                  onClick={() => email && mutateAsync()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute 
        transition-opacity duration-[500ms] ease-in delay-[1100ms]`}
        style={{
          pointerEvents: isFinished ? undefined : "none",
          opacity: isFinished ? 1 : 0,
        }}
      >
        <div
          className={`sm:text-lg text-base text-zinc-500 flex flex-row gap-[5px] whitespace-nowrap`}
          style={{
            pointerEvents:
              isFinishedDelayed && mouseMovedSinceFinished ? undefined : "none",
          }}
        >
          <p>Your response has been submitted.</p>
        </div>
      </div>
    </div>
  )
}

const easeInOut = "cubic-bezier(0.4, 0, 0.2, 1)"
const easeIn = "cubic-bezier(0.4, 0, 1, 1)"
const easeOut = "cubic-bezier(0, 0, 0.2, 1)"
