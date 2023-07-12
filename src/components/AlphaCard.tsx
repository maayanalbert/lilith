import {
  useCardSize,
  useIsMobile,
  useLowColor,
  useMidColor,
} from "@/GlobalsContext"
import { setCardScrollClass } from "@/helpers/setCardScrollClass"
import { useEffect, useRef, useState } from "react"
import { useMutation } from "react-query"
import axios from "axios"
import { TailSpin } from "react-loader-spinner"
import getOnIpad from "@/helpers/getOnIpad"
import useVirtualKeyboardIsOpen from "@/hooks/useVirtualKeyboardIsOpen"
import { useRouter } from "next/router"
import useEventListener from "@/hooks/useEventListener"

/**
 * The card where we offer a signup for the alpha
 */
export default function AlphaCard() {
  const cardSize = useCardSize()
  const isMobile = useIsMobile()
  const cardRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const virtualKeyboardIsOpen = useVirtualKeyboardIsOpen()
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false)
  const router = useRouter()
  const [pageRoute, setPageRoute] = useState<string>()
  const [scrolled, setScrolled] = useState(false)
  const midColor = useMidColor()
  const lowColor = useLowColor()

  // disable the page routing if we've alread scrolled
  useEventListener("scroll", () => setScrolled(true), [scrolled])

  // update the router based on the desired page route
  useEffect(() => {
    if (!scrolled) return
    if (pageRoute) {
      router.push({ query: { page: pageRoute } }, undefined, { shallow: true })
    } else {
      router.push({}, undefined, { shallow: true })
    }
  }, [pageRoute])

  // mutate call for sending the email
  const { mutateAsync, error, isLoading } = useMutation(
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
        // the title
        setCardScrollClass(0, 200, 200, `--scroll-card-beta-title`)

        // the subtitle
        setCardScrollClass(0, 200, 200, `--scroll-card-beta-text`)
        return
      }

      // get the current center of the card
      const cardTopPosition = cardRef.current?.getBoundingClientRect().top
      if (!cardTopPosition) return
      const cardCenter = cardTopPosition + cardSize / 2

      const screenCenter = window.innerHeight / 2

      const cardDistFromCenter = cardCenter - screenCenter
      const scrollDurationBase = (window.innerHeight * 4.25) / 5

      // update the desire page route based on our scroll position
      if (Math.abs(cardDistFromCenter) < cardSize / 2) {
        setPageRoute("alpha")
      } else if (cardDistFromCenter < 0) {
        setPageRoute("about")
      } else {
        setPageRoute("")
      }

      if (virtualKeyboardIsOpen) {
        setCardScrollClass(
          0,
          scrollDurationBase * 0.285,
          scrollDurationBase * 0.3,
          `--scroll-card-beta-title`
        )
        setCardScrollClass(
          0,
          scrollDurationBase * 0.3,
          scrollDurationBase * 0.285,
          `--scroll-card-beta-text`
        )
        return
      }

      // the text
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.285,
        scrollDurationBase * 0.3,
        `--scroll-card-beta-title`
      )

      // the input
      setCardScrollClass(
        cardDistFromCenter,
        scrollDurationBase * 0.3,
        scrollDurationBase * 0.285,
        `--scroll-card-beta-text`
      )
    },
    [cardRef, virtualKeyboardIsOpen]
  )

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        height: cardSize,
        width: 270,
        paddingBottom: isMobile ? cardSize / 3 : 0,
      }}
      ref={cardRef}
    >
      <style>
        {`
          input::placeholder {
            color: ${lowColor};
          }
        `}
      </style>
      <div className="flex flex-col gap-2">
        <p
          className={`text-white text-2xl ${
            isMobile ? "font-bold" : "font-semibold"
          } scroll-card-beta-title`}
        >
          Gain access
        </p>

        <div
          className={`${
            isMobile ? "font-normal" : "font-light"
          } text-white flex flex-col gap-4`}
        >
          <div style={{ color: midColor }}>
            {/* nest this so the opacities don't overlap */}
            <p className="scroll-card-beta-text">
              We've launched an alpha. Join the waitlist:
            </p>
          </div>
          <div
            className={`flex flex-col ${
              isMobile ? "gap-1.5" : "gap-1"
            } scroll-card-beta-text`}
          >
            <div className="flex flex-row gap-3.5 items-end">
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
                  borderBottomColor: midColor,
                }}
              />
              <div>
                {isLoading ? (
                  <div style={{ color: midColor }}>
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
                      color:
                        !!email && isMobile
                          ? "white"
                          : !!email
                          ? midColor
                          : lowColor,
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
                color: midColor,
                opacity: emailSubmitted ? 1 : 0,
              }}
            >
              email submitted successfully!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
