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
            <a className="font-bold sm:text-[27px] text-[28px] text-white mb-5">
              Who do you talk to?
            </a>
            <p
              className="sm:w-[433px] w-[300px] text-white font-light sm:text-[14px] text-[15px]"
              style={{ color: "rgb(227, 227, 231)" }}
            >
              When you can't quite grasp your thoughts, much less voice them to
              another human. Welcome to Eve, a space for your thoughts.
              <br />
              <br /> To learn more, contact{" "}
              <a
                target="_blank"
                className="underline cursor-pointer"
                href="mailto:maayan@eve.space"
              >
                maayan@eve.space
              </a>
              .
            </p>
          </div>
          <div className="mt-[36px] mb-[34px]">
            <EmailField />
          </div>
        </div>
        <div
          className={`absolute bottom-0 w-full flex flex-row justify-center sm:pb-[22px] pb-8`}
        >
          <div className="text-sm text-zinc-600 text-center ">
            <p>Copyright Eve Technologies 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}
