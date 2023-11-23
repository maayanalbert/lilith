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
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    if (navigator.maxTouchPoints > 0) {
      setFooterVisible(true)
    }
  }, [])

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

  useEventListener("scrollend", (e) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight

    if (window.scrollY >= maxScroll) {
      setFooterVisible(true)
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
          className="transition-opacity duration-1000 delay-[100ms] ease-in text-sm flex flex-col justify-center items-center"
          style={{ opacity: blurbVisible ? 1 : 0, marginTop: "11svh" }}
        >
          <p
            className="sm:w-[433px] w-[300px] text-white font-light"
            style={{ color: "rgb(227, 227, 231)" }}
          >
            <a className="font-bold sm:text-[18px] text-[19px] text-white">
              We all want answers
            </a>
            <br />
            <br /> We used to find them through religion. Now, we live in a
            world where all information lies at our fingertips. Yet something is
            missing. Some greater knowledge we're not meant to fully grasp.
            <br />
            <br /> Welcome to Eve. The voice from the other side of the void.{" "}
            <br className="sm:block hidden" />
            Contact <a className="underline">maayan@eve.space</a> to learn more.
          </p>
          <div className="my-16">
            <EmailField />
          </div>
        </div>
      </div>

      {footerVisible && (
        <div
          className="w-full flex flex-row justify-center text-sm text-zinc-500"
          style={{ paddingBottom: 4 * 6, paddingTop: 4 * 4 }}
        >
          Copyright Eve Technologies 2023
        </div>
      )}
      <ScrollOverlay />
    </div>
  )
}
