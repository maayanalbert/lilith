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
      <div
        className={`w-full flex flex-col justify-center items-center relative`}
        style={{ height: "100svh" }}
      >
        <div className="flex flex-col justify-center items-center -mt-[9svh] sm:mt-[2svh] blurb">
          <div className="flex flex-col">
            <a className="font-bold sm:text-[36px] text-[35px] text-white mb-6">
              Welcome to Eve
            </a>
            <p
              className="w-[288px] text-white font-light sm:text-[15.5px] text-[15px]"
              style={{ color: "rgb(235, 235, 240)" }}
            >
              A space for your thoughts. To learn more, contact{" "}
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
          <div className="mt-[44px] mb-[34px]">
            <EmailField />
          </div>
        </div>
        <div
          className={`absolute bottom-0 w-full flex flex-row justify-center sm:pb-[22px] pb-8`}
        >
          <div className="text-sm text-zinc-600 text-center ">
            <p>Copyright Eve Technologies 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
