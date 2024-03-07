import { EmailField } from "@/components/EmailField"
import { useScrollAnimations } from "@/components/useScrollAnimations"
import { ReactNode, useEffect, useRef, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import useLandingAnimation from "@/components/useLandingAnimation"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useScrollAnimations()
  // useLandingAnimation()

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div // title
        className="flex justify-center items-center"
        style={{ height: "100svh", width: "100%" }}
      >
        <div className="flex flex-col items-center title">
          <div className={`sm:-mt-[0] -mt-[50px]`}>
            <div className="flex flex-col items-center">
              <p
                className="tracking-[0.055em] text-white lg:text-[112px] text-[48px] text-center"
                style={{ fontWeight: "600" }}
              >
                Welcome <br className="sm:hidden" /> to Eve
              </p>
            </div>
          </div>
          <div className={`relative w-full`}>
            <div className="absolute w-full flex flex-col items-center justify-center h-[50svh]">
              <ChevronDownIcon className="w-8 h-8 hint-enter text-zinc-600" />
            </div>
          </div>
        </div>
      </div>
      <div // line
        className="absolute top-0 w-full flex flex-col items-center"
        style={{ height: "200svh", zIndex: -1 }}
      >
        <div
          className="bg-white line"
          style={{
            width: 1,
            marginTop: "calc(50svh + 300px)",
          }}
        />
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
    <div className="flex flex-col justify-center items-center sm:-mt-10 -mt-[15svh] blurb">
      <p className="hint text-zinc-200 mt-7 mb-10 text-center sm:w-full w-[300px]">
        Eve is a space to think, a space <br className="sm:hidden" /> to
        question, a space to learn.
        <br className="sm:block hidden" /> Where your consciousness melds with
        that which is greater than any one of us.
        <br className="sm:block hidden" /> A space for the soul.
      </p>
      <EmailField />
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
