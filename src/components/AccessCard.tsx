import { useIsMobile, useLowColor, useMidColor } from "@/GlobalsContext"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import { useEffect, useRef, useState } from "react"
import { UseMutateAsyncFunction, useMutation } from "react-query"
import axios from "axios"
import { TailSpin } from "react-loader-spinner"
import getOnIpad from "@/helpers/getOnIpad"
import useVirtualKeyboardIsOpen from "@/hooks/useVirtualKeyboardIsOpen"
import { useRouter } from "next/router"
import useEventListener from "@/hooks/useEventListener"

/**
 * The card where we offer a signup for the alpha
 */
export default function AccessCard() {
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const virtualKeyboardIsOpen = useVirtualKeyboardIsOpen()
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false)

  // mutate call for sending the email
  const {
    mutateAsync,
    error,
    isLoading,
  }: {
    mutateAsync: UseMutateAsyncFunction<
      void,
      unknown,
      {
        email: string
      },
      unknown
    >
    error: any
    isLoading: boolean
  } = useMutation(
    (data: { email: string }) => {
      const axiosCall = async () => {
        axios.post(
          "https://getform.io/f/f0b97eb1-3068-4702-8fbb-f9fd0061d3f2",
          {
            message: data.email,
          },
          { headers: { Accept: "application/json" } }
        )
      }
      return axiosCall()
    },
    {
      onSuccess: () => {
        setEmail("")
        setEmailSubmitted(true)
      },
    }
  )

  // create an event listener for scrolling animation
  useEventListener(
    "scroll",
    () => {
      // disable scroll effects on ipad
      if (getOnIpad(navigator)) {
        setCardScrollClass(0, 200, 200, `--scroll-access`)
        return
      }

      // get the current center of the card
      const cardTopPosition = cardRef.current?.getBoundingClientRect().top
      const cardHeight = cardRef.current?.getBoundingClientRect().height
      if (!cardTopPosition || !cardHeight) return
      const cardCenter = cardTopPosition + cardHeight / 2

      const screenCenter = window.innerHeight / 2

      const cardDistFromCenter = cardCenter - screenCenter
      const scrollDurationBase = (window.innerHeight * 4.25) / 5

      if (virtualKeyboardIsOpen) {
        setCardScrollClass(
          0,
          scrollDurationBase * 0.3,
          scrollDurationBase * 0.3,
          `--scroll-access`
        )
        return
      }

      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.3,
        scrollDurationBase * 0.3,
        `--scroll-access`
      )
    },
    [cardRef, virtualKeyboardIsOpen]
  )

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "60vh", paddingBottom: "40vh" }}
    >
      <div
        className="flex flex-col justify-center items-start  sm:w-[420px] w-[300px] scroll-access"
        ref={cardRef}
      >
        <style>
          {`
          input::placeholder {
            color: rgb(80, 80, 80);
          }
        `}
        </style>
        <div className="flex flex-col gap-2">
          <p
            className={`text-white text-2xl ${
              isMobile ? "font-bold" : "font-semibold"
            }`}
          >
            Apply for access
          </p>

          <div className={`text-white flex flex-col gap-4`}>
            <div style={{ color: "gray" }}>
              {/* nest this so the opacities don't overlap */}
              <p>We're a small team based in New</p>
            </div>
            <div className={`flex flex-col ${isMobile ? "gap-1.5" : "gap-1"}`}>
              <div
                className="flex flex-row gap-3.5 items-end"
                style={{ width: 250 }}
              >
                <input
                  autoCapitalize="none"
                  value={email}
                  placeholder="email"
                  className={`bg-transparent border-b ${
                    isMobile ? "pb-1" : "pb-0.5"
                  } border-white text-white w-full outline-0 rounded-none`}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setEmailSubmitted(false)
                  }}
                  style={{
                    borderBottomColor: "gray",
                  }}
                />
                <div>
                  {isLoading ? (
                    <div style={{ color: "gray" }}>
                      <TailSpin
                        height="20"
                        width="20"
                        color="rgba(255, 255, 255, 1)"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  ) : error ? (
                    <p className="text-white">{error.toString()}</p> // quick error handling, elaborate later if necessary
                  ) : (
                    <div
                      className="cursor-default relative"
                      style={{
                        color: !!email && isMobile ? "white" : "gray",
                        paddingBottom: 3,
                      }}
                      onClick={() => !!email && mutateAsync({ email })}
                    >
                      submit
                      {!!email && ( // show the email hover state if there is one
                        <p className="absolute top-0 left-0 text-white opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                          submit
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p
                className="text-sm ease-in transition-opacity"
                style={{
                  color: "gray",
                  opacity: emailSubmitted ? 1 : 0,
                }}
              >
                email submitted successfully!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
