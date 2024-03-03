import useEventListener from "@/utils/useEventListener"
import useOutsideClick from "@/utils/useOutsideClick"
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { useRef, useState } from "react"
import { useMutation } from "react-query"

export function EmailField() {
  const [isFinished, setIsFinished] = useState(false)
  const [isFinishedDelayed, setIsFinishedDelayed] = useState(false)
  const [state, setState] = useState<"NOTIFY" | "EMAIL">("NOTIFY")
  const [onEmailDelayed, setOnEmailDelayed] = useState(false)
  const [error, setError] = useState(false)
  const [mouseMovedSinceFinished, setMouseMovedSinceFinished] = useState(false)
  const [email, setEmail] = useState("")

  useEventListener(
    "mousemove",
    () => isFinishedDelayed && setMouseMovedSinceFinished(true),
    [isFinishedDelayed]
  )

  // useEventListener(
  //   "keydown",
  //   (e) => {
  //     if (e.key === "Escape") {
  //       // reset for debugging
  //       setState("NOTIFY")
  //       setOnEmailDelayed(false)
  //       setIsFinished(false)
  //       setIsFinishedDelayed(false)
  //     }

  //     console.log(e.key)
  //     if (e.key === "Enter" && state === "EMAIL" && email) {
  //       mutateAsync()
  //     }
  //   },
  //   [state, email]
  // )

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

  return (
    <div className="font-light flex flex-col justify-center items-center relative w-full sm:text-[15.5px]">
      <div
        className={`${
          isFinished ? "w-[47px] opacity-0 blur-[8px] scale-0" : "w-[225px]"
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
         whitespace-nowrap
         ${isFinished ? "bg-white" : "bg-black"}
          ${state === "EMAIL" && "w-[225px] border-zinc-800"}
          ${
            state === "NOTIFY" &&
            "hover:bg-white w-[135px] sm:w-[130px] hover:text-black text-zinc-200 border-zinc-800 hover:border-white"
          }
          ${state !== "EMAIL" && "cursor-pointer"}
          `}
          style={{
            transitionProperty: "width, background, border-color",
            transitionDuration: "700ms, 300ms, 700ms",
            transitionTimingFunction: easeInOut,
            borderWidth: 1.75,
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
            className="h-full w-full hover:text-black select-none flex justify-center items-center"
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
            {state === "NOTIFY" || state === "EMAIL" ? "Reach Out" : ""}
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
              value={email}
              placeholder="email@domain.com"
              onChange={(event) => setEmail(event.target.value)}
              className="bg-transparent w-full pl-6 h-full text-white"
              type="email"
            />
            <div
              className={`rounded-full p-1.5 transition-all duration-200 ${
                email && "sm:hover:bg-zinc-700"
              }`}
            >
              {error ? (
                <ArrowPathIcon
                  className={`h-[20px] sm:w-[20px] w-[18px]
         ${email ? "text-white cursor-pointer" : "text-zinc-500 "}`}
                  onClick={() => email && mutateAsync()}
                />
              ) : (
                <ArrowRightIcon
                  className={`sm:h-[20px] sm:w-[20px] h-[18px] w-[18px]
         ${email ? "text-white cursor-pointer" : "text-zinc-500 "}`}
                  onClick={() => email && mutateAsync()}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute transition-opacity duration-[500ms] ease-in delay-[1100ms]`}
        style={{
          pointerEvents: isFinished ? undefined : "none",
          opacity: isFinished ? 1 : 0,
        }}
      >
        <div
          className={`sm:text-lg text-base text-zinc-600 flex flex-row gap-[5px] whitespace-nowrap`}
          style={{
            pointerEvents:
              isFinishedDelayed && mouseMovedSinceFinished ? undefined : "none",
          }}
        >
          <p className="text-center sm:text-[15px] text-sm">
            Your response has been submitted
          </p>
        </div>
      </div>
    </div>
  )
}

const easeInOut = "cubic-bezier(0.4, 0, 0.2, 1)"
const easeIn = "cubic-bezier(0.4, 0, 1, 1)"
const easeOut = "cubic-bezier(0, 0, 0.2, 1)"
