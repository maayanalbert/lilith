import useEventListener from "@/utils/useEventListener"
import useOutsideClick from "@/utils/useOutsideClick"
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { getSvgPath } from "figma-squircle"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useMutation } from "react-query"

type FieldState = "GET_ACCESS" | "EMAIL" | "DONE"
const EMAIL_TRANSITION_DURATION = 0.65
const GET_ACCESS_HIGHLIGHT_DURATION = "200ms"
const DONE_FIELD_FADE_DURATION = 200
export const MOBILE_BLURB_WIDTH = 273

export function EmailField() {
  const [state, setState] = useState<FieldState>("GET_ACCESS")
  const fieldHeight = 47
  const borderWidth = 1
  const cornerRadius = 15

  const getAccessFieldWidth = 175
  const emailFieldWidth = 364
  const doneFieldWidth = fieldHeight
  const [fieldWidth, setFieldWidth] = useState(getAccessFieldWidth)
  const [mouseOverField, setMouseOverField] = useState(false)
  const innerPath = useMemo(
    () =>
      getSvgPath({
        width: fieldWidth,
        height: fieldHeight,
        cornerRadius: cornerRadius, // defaults to 0
        cornerSmoothing: 0.8, // cornerSmoothing goes from 0 to 1
      }),
    [fieldHeight, fieldWidth, cornerRadius]
  )

  const outerPath = useMemo(
    () =>
      getSvgPath({
        width: fieldWidth + borderWidth * 2,
        height: fieldHeight + borderWidth * 2,
        cornerRadius: cornerRadius + 0.5, // defaults to 0
        cornerSmoothing: 0.8, // cornerSmoothing goes from 0 to 1
      }),
    [fieldHeight, fieldWidth, cornerRadius]
  )

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => {
    if (state === "EMAIL") {
      setState("GET_ACCESS")
      setFieldWidth(getAccessFieldWidth)
    }
  })

  const fieldGetAccessToEmailTransition = {
    type: "tween",
    duration: EMAIL_TRANSITION_DURATION,
    ease: state === "EMAIL" ? "easeOut" : "easeIn",
  }

  return (
    <div
      ref={ref}
      className={`relative flex justify-center w-fit items-center sm:text-[15px] ${
        state === "GET_ACCESS" ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        setState("EMAIL")
        setFieldWidth(
          window.innerWidth < 640 ? MOBILE_BLURB_WIDTH : emailFieldWidth
        )
      }}
      onMouseOver={() => setMouseOverField(true)}
      onMouseOut={() => setMouseOverField(false)}
    >
      <div
        className="relative flex justify-center items-center"
        style={{
          opacity: state === "DONE" ? 0 : 1,
          transition: "opacity",
          transitionDuration: `${DONE_FIELD_FADE_DURATION}ms`,
          transitionDelay: `${EMAIL_TRANSITION_DURATION * 1000}ms`,
        }}
      >
        <motion.svg // outer outline
          height={fieldHeight + borderWidth * 2}
          animate={{ width: fieldWidth + borderWidth * 2 }}
          xmlns="http://www.w3.org/2000/svg"
          className={
            (mouseOverField && state === "GET_ACCESS") || state === "DONE"
              ? "fill-zinc-300"
              : "fill-zinc-400"
          }
          transition={fieldGetAccessToEmailTransition}
          style={{
            transitionProperty: "fill",
            transitionDuration:
              state === "EMAIL"
                ? `${EMAIL_TRANSITION_DURATION * 1000}ms`
                : GET_ACCESS_HIGHLIGHT_DURATION,
            transitionTimingFunction: `ease-in-out`,
          }}
        >
          <motion.path
            animate={{ d: outerPath }}
            transition={fieldGetAccessToEmailTransition}
          />
        </motion.svg>
        <motion.svg // inner fill
          animate={{ width: fieldWidth }}
          height={fieldHeight}
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute ${
            (mouseOverField && state === "GET_ACCESS") || state === "DONE"
              ? "fill-zinc-300"
              : "fill-black"
          }`}
          transition={fieldGetAccessToEmailTransition}
          style={{
            transitionProperty: "fill",
            transitionDuration:
              state === "EMAIL"
                ? `${EMAIL_TRANSITION_DURATION * 1000}ms`
                : GET_ACCESS_HIGHLIGHT_DURATION,
            transitionTimingFunction: `ease-in-out`,
          }}
        >
          <motion.path
            animate={{ d: innerPath }}
            transition={fieldGetAccessToEmailTransition}
          />
        </motion.svg>
      </div>
      <div // done
        className="absolute"
        style={{
          opacity: state === "DONE" ? 1 : 0,
          pointerEvents: state === "DONE" ? undefined : "none",
          transition: "opacity",
          transitionDuration: "500ms",
          transitionDelay: `${
            EMAIL_TRANSITION_DURATION * 1000 + DONE_FIELD_FADE_DURATION
          }ms`,
          transitionTimingFunction: "ease-in",
        }}
      >
        <div className={"text-zinc-500 text-center"}>
          Thank you, we'll notify you when a spot becomes available
        </div>
      </div>

      <div
        className="absolute" // get access
      >
        <GetAccessContents
          isVisible={state === "GET_ACCESS"}
          mouseOverField={mouseOverField}
        />
      </div>
      <div
        className="absolute w-full" // email
      >
        <EmailContents
          isVisible={state === "EMAIL"}
          callback={() => {
            setState("DONE")
            setFieldWidth(doneFieldWidth)
          }}
          state={state} // for cursor
        />
      </div>
    </div>
  )
}

function GetAccessContents({
  isVisible,
  mouseOverField,
}: {
  isVisible: boolean
  mouseOverField: boolean
}) {
  return (
    <motion.div
      className={mouseOverField ? "text-black font-normal" : undefined}
      style={{
        transitionProperty: "all",
        transitionDuration: GET_ACCESS_HIGHLIGHT_DURATION,
        transitionTimingFunction: `ease-in-out`,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none",
      }}
      transition={{
        duration: EMAIL_TRANSITION_DURATION / 2,
        ease: !isVisible ? "easeOut" : "easeIn",
        delay: !isVisible ? 0 : EMAIL_TRANSITION_DURATION / 2,
      }}
      // style={{
      //   transitionProperty: "all",
      //   transitionDuration: "100ms",
      //   transitionTimingFunction: `ease-in`,
      // }}
    >
      <p className="h-full w-full select-none flex justify-center items-center">
        Get Early Access
      </p>
    </motion.div>
  )
}

function EmailContents({
  callback,
  isVisible,
  state,
}: {
  callback: () => void
  isVisible: boolean
  state: FieldState
}) {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (isVisible) {
        inputRef.current?.focus()
      }
    }, EMAIL_TRANSITION_DURATION)
  }, [])

  useEventListener(
    "keydown",
    (e) => {
      // if (e.key === "Escape") {
      //   // reset for debugging
      //   setState("NOTIFY")
      //   setOnEmailDelayed(false)
      //   setIsFinished(false)
      //   setIsFinishedDelayed(false)
      // }

      // console.log(e.key)
      if (e.key === "Enter" && email) {
        mutateAsync()
      }
    },
    [email]
  )

  // mutate call for sending the email
  const { mutateAsync } = useMutation(
    () => {
      const axiosCall = async () => {
        axios.post(
          "https://getform.io/f/paqxgwvb",
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
          callback()
        }
      },
    }
  )

  return (
    <motion.div
      className="w-full pl-5"
      style={{
        paddingRight: 4 * 4.25,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "all" : "none",
      }}
      transition={{
        duration: EMAIL_TRANSITION_DURATION / 2,
        ease: !isVisible ? "easeOut" : "easeIn",
        delay: !isVisible ? 0 : EMAIL_TRANSITION_DURATION / 2,
      }}
    >
      <div className="h-full w-full flex flex-row justify-between items-center">
        <input
          ref={inputRef}
          value={email}
          placeholder="email@domain.com"
          onChange={(event) => setEmail(event.target.value)}
          className="bg-transparent w-full h-full tracking-wider"
          style={{
            // will show over parent set pointer
            cursor:
              state === "GET_ACCESS"
                ? "pointer"
                : state === "EMAIL"
                ? "auto"
                : "default",
          }}
          type="email"
        />
        <SubmitButton email={email} mutateAsync={mutateAsync} error={error} />
      </div>
    </motion.div>
  )
}

function SubmitButton({
  email,
  mutateAsync,
  error,
}: {
  email: string
  mutateAsync: () => void
  error: boolean
}) {
  return (
    <div
      className={`rounded-full transition-all duration-200 p-1.5 ${
        email && "sm:hover:bg-zinc-700"
      }`}
      style={{ marginRight: -4 * 1.5 }}
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
         ${
           email
             ? "text-white cursor-pointer stroke-white"
             : "text-zinc-500 stroke-zinc-500"
         }`}
          onClick={() => email && mutateAsync()}
          strokeWidth={0.5}
        />
      )}
    </div>
  )
}

const easeInOut = "cubic-bezier(0.4, 0, 0.2, 1)"
const easeIn = "cubic-bezier(0.4, 0, 1, 1)"
const easeOut = "cubic-bezier(0, 0, 0.2, 1)"
