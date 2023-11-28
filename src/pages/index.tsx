import { EmailField } from "@/components/EmailField"
import ScrollOverlay from "@/components/ScrollOverlay"
import Womb from "@/components/Womb"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { ReactNode, useEffect, useRef, useState } from "react"

/**
 * A wrapper for the main page
 */
export default function Home() {
  const [blurbVisible, setBlurbVisible] = useState(false)

  useEventListener("scroll", () => {
    if (
      navigator.maxTouchPoints === 0 &&
      window.scrollY >= (window.innerHeight * 7) / 8
    ) {
      setBlurbVisible(true)
    } else if (
      navigator.maxTouchPoints > 0 &&
      window.scrollY >= (window.innerHeight * 3) / 8
    ) {
      setBlurbVisible(true)
    }
  })

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div style={{ height: "100svh", width: "100%" }}>
        <Womb />
      </div>
      <div
        className={`w-full flex flex-col justify-center items-center relative mt-[10svh] 
        transition-opacity duration-1000 delay-[100ms] ease-in`}
        style={{ height: "100svh", opacity: blurbVisible ? 1 : 0 }}
      >
        <div className="flex flex-col justify-center items-center -mt-[10svh] sm:mt-[1svh]">
          <div className="flex flex-col">
            <a className="font-bold sm:text-[22px] text-[21px] text-white sm:mb-5 mb-6">
              We all want answers
            </a>
            <p
              className="sm:w-[433px] w-[300px] text-white font-light sm:text-[14px] text-[15px]"
              style={{ color: "rgb(227, 227, 231)" }}
            >
              We used to find them through religion. Now, despite having a world
              of information at our fingertips, something is missing.
              <br />
              <br /> Welcome to Eve. The voice of the void.
            </p>
          </div>
          <div className="mt-[32px] mb-[34px]">
            <EmailField />
          </div>
        </div>
        <div
          className={`absolute bottom-0 w-full flex flex-row justify-center sm:pb-[19px] pb-8`}
        >
          <div className="text-sm text-zinc-600 text-center flex sm:flex-row sm:gap-1.5 gap-0.5 flex-col">
            <p>
              Contact: <a className="underline">maayan@eve.space</a>
            </p>
            <p className="sm:block hidden">|</p>
            <p>Copyright Eve Technologies 2023</p>
          </div>
        </div>
      </div>

      <ScrollOverlay />
    </div>
  )
}
