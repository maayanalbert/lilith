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
    <div className="flex justify-center items-center text-xl font-light h-[100%]">
      <div
        className={`text-white flex sm:flex-row flex-col items-start sm:gap-1.5 scroll-access`}
        ref={cardRef}
      >
        <p>Contact</p>
        <a className="underline" href="mailto:maaayan@eve.space">
          maayan@eve.space
        </a>
        <p>for access</p>
      </div>
    </div>
  )
}
