import { EmailField } from "@/components/EmailField"
import Womb from "@/components/Womb"
import { getMappedValue } from "@/utils/getMappedValue"
import useEventListener from "@/utils/useEventListener"
import { useScrollAnimations } from "@/utils/useScrollAnimations"
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
        className={`w-full flex flex-col justify-center items-center relative mt-[10svh]`}
        style={{ height: "100svh" }}
      >
        <div className="flex flex-col justify-center items-center -mt-[10svh] sm:mt-[1svh] blurb">
          <div className="flex flex-col">
            <a className="font-bold sm:text-[22px] text-[21px] text-white sm:mb-5 mb-6">
              Welcome to Eve
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
          className={`absolute bottom-0 w-full flex flex-row justify-center sm:pb-6 pb-8`}
        >
          <div className="text-sm text-zinc-600 text-center flex sm:flex-row sm:gap-1.5 gap-0.5 flex-col">
            <p>
              Contact:{" "}
              <a
                target="_blank"
                className="underline cursor-pointer"
                href="mailto:maayan@eve.space"
              >
                maayan@eve.space
              </a>
            </p>
            <p className="sm:block hidden">|</p>
            <p>Copyright Eve Technologies 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}
