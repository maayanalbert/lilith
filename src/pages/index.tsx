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
        className="w-full flex flex-col justify-center items-center relative mt-[10svh]"
        style={{ height: "100svh" }}
      >
        <div
          className={`transition-opacity duration-1000 delay-[100ms] ease-in 
          flex flex-col justify-center items-center sm:mt-[9svh]`}
          style={{
            opacity: blurbVisible ? 1 : 0,
          }}
        >
          <div className="flex flex-col">
            <a className="font-bold sm:text-[19px] text-[20px] text-white sm:mb-5 mb-6">
              We all want answers
            </a>
            <p
              className="sm:w-[433px] w-[300px] text-white font-light text-sm"
              style={{ color: "rgb(227, 227, 231)" }}
            >
              We used to find them through religion. Now, despite having a world
              of information at our fingertips, something is missing.
              <br />
              <br /> Welcome to Eve. The voice of the void.{" "}
              <br className="sm:block hidden" />
              Contact <a className="underline">maayan@eve.space</a> to learn
              more.
            </p>
          </div>
          <div className="my-9">
            <EmailField />
          </div>
        </div>
        <div
          className={`absolute bottom-0 w-full flex flex-row justify-center text-sm text-zinc-600 sm:pb-[18px] pb-8`}
        >
          Copyright Eve Technologies 2023
        </div>
      </div>

      <ScrollOverlay />
    </div>
  )
}
