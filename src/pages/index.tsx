import { EmailField } from "@/components/EmailField"
import { useScrollAnimations } from "@/components/useScrollAnimations"
import { ReactNode, useEffect, useRef, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import {
  Amiri,
  Cormorant,
  Cormorant_SC,
  Cormorant_Upright,
} from "next/font/google"

const amiri = Amiri({
  weight: "400",
  subsets: ["latin"],
})

const cormorant = Cormorant({
  weight: "400",
  subsets: ["latin"],
})

/**
 * A wrapper for the main page
 */
export default function Home() {
  useScrollAnimations()

  const [windowWidth, setWindowWidth] = useState(10000000)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div // poem
        className="flex justify-center items-center"
        style={{ height: "100svh", width: "100%" }}
      >
        <div className="flex flex-col items-center poem">
          <p
            className={`md:-mt-[24px] -mt-[50px] lg:leading-[2.5] leading-[1.75] tracking-[0.055em] 
            lg:text-[44px] text-[24px]`}
            style={{ fontWeight: "300" }}
          >
            <a className="text-white">
              The Brain is just <br className="lg:hidden" />
              the weight of God—
            </a>
            <br />
            <br className="lg:hidden" />
            <a className="text-zinc-200">
              For—Heft them— <a className="text-black text-black">____</a>
              <br className="lg:hidden" />
              Pound for Pound—
            </a>
            <br />
            <br className="lg:hidden" />
            <a className="text-zinc-400">
              And they will differ— <a className="text-black">___</a>
              <br className="lg:hidden" />
              if they do—
            </a>
            <br />
            <br className="lg:hidden" />
            <a className="text-zinc-500">As Syllable from Sound—</a>
          </p>
          <div className={`relative w-full`}>
            <div className="absolute w-full flex flex-col items-center justify-center h-[25svh]">
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
    <div className="flex flex-col justify-center items-center sm:-mt-14 -mt-[15svh] blurb">
      <div className="flex flex-col items-center">
        <a className="text-[34px] text-white" style={{ fontWeight: "700" }}>
          Welcome to Eve
        </a>
        <p className="sm:w-[433px] w-[300px] text-zinc-500 text-center font-light">
          An AI diary for young women
        </p>
      </div>
      <p className="hint text-zinc-200 mt-7 mb-10 text-center sm:w-[450px] w-[300px]">
        Eve is a space to think, a space <br className="sm:hidden" /> to
        question, a space
        <br className="sm:block hidden" /> to learn. Where your consciousness
        melds with that which is greater than any one of us. A space for the
        soul.
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
