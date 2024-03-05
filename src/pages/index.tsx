import { EmailField } from "@/components/EmailField"
import { useScrollAnimations } from "@/components/useScrollAnimations"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Cormorant_Garamond } from "next/font/google"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

const poemFont = Cormorant_Garamond({
  weight: "400",
  subsets: ["latin"],
  // style: ["italic"],
})

/**
 * A wrapper for the main page
 */
export default function Home() {
  useScrollAnimations()

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div // poem
        className="flex justify-center items-center"
        style={{ height: "100svh", width: "100%" }}
      >
        <div className="flex flex-col items-center poem">
          <p
            className={`md:-mt-[24px] -mt-[50px] text-zinc-200 md:leading-[1.9] tracking-[0.01em] 
            md:text-[48px] text-[28px]  ${poemFont.className}`}
          >
            The Brain is just <br className="sm:hidden" />
            the weight of God—
            <br />
            <br className="md:hidden" />
            For—Heft them—
            <br className="md:hidden" />
            Pound for Pound—
            <br />
            <br className="md:hidden" />
            And they will differ— <br className="md:hidden" />
            if they do—
            <br />
            <br className="md:hidden" />
            As Syllable from Sound—
          </p>

          <p className={`relative w-full flex flex-col items-center`}>
            <ChevronDownIcon
              color="gray"
              className="w-8 h-8 absolute md:mt-[88px] mt-[50px]"
            />
          </p>
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
