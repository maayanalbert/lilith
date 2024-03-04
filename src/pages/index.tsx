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
      <div // poem
        className="flex justify-center items-center"
        style={{ height: "100svh", width: "100%" }}
      >
        <div className="flex flex-col items-center poem sm:mt-0 -mt-[12svh]">
          <p className="text-zinc-200 leading-[2.1]" style={{ fontSize: 18 }}>
            The Brain is just the weight of God—
            <br /> For—Heft them—Pound for Pound—
            <br /> And they will differ—if they do—
            <br /> As Syllable from Sound—
          </p>
          <p
            className="cursor-default select-none hint-enter text-zinc-500 tracking-wider"
            style={{ fontSize: 18, marginTop: 30 }}
          >
            {"(scroll)"}
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
            marginTop: "calc(50svh + 180px)",
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
      <p
        className="hint text-zinc-200 mt-7 mb-10 text-center sm:w-[450px] w-[300px]"
        style={{ textIndent: 30 }}
      >
        Eve is a space to think, a space to question, a space to learn. Where
        your consciousness melds with that which is greater than any one of us.
        A space for the soul.
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
