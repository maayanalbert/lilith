import { EmailField } from "@/components/EmailField"
import Womb from "@/components/Womb"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useScrollAnimations } from "@/components/useScrollAnimations"
import { ReactNode, useEffect, useRef, useState } from "react"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useScrollAnimations()

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div style={{ height: "100svh", width: "100%" }}>
        <Womb />
      </div>
      <div
        className={`w-full flex flex-col justify-center items-center relative`}
        style={{ height: "100svh" }}
      >
        <Blurb />
        <Footer />
      </div>
    </div>
  )
}

export function Blurb() {
  return (
    <div className="flex flex-col justify-center items-center sm:-mt-14 -mt-[9svh] blurb">
      <div className="flex flex-col items-center">
        <a className="font-bold text-[37px] text-white">Welcome to Eve</a>
        <p
          className="sm:w-[433px] w-[300px] text-zinc-500 text-center font-light"
          // style={{ color: "rgb(227, 227, 231)" }}
        >
          An AI diary for young women
        </p>
      </div>
      <div className="mt-6">
        <EmailField />
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <div
      className={`absolute bottom-0 w-full flex flex-col justify-center sm:pb-[22px] pb-8`}
    >
      <div className="text-sm text-zinc-500 text-center pb-1">
        Contact{" "}
        <a
          target="_blank"
          className="underline cursor-pointer"
          href="mailto:maayan@eve.space"
        >
          maayan@eve.space
        </a>{" "}
        to learn more
      </div>

      <div className="text-sm text-zinc-600 text-center">
        <p>Copyright Eve Technologies 2024</p>
      </div>
    </div>
  )
}
