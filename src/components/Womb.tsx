import useEventListener from "@/utils/useEventListener"
import { shrinkCutoff, startSize } from "@/utils/useScrollAnimations"
import { set } from "lodash"
import { useState } from "react"
import { EmailField } from "./EmailField"

export default function Womb() {
  return (
    <div
      className="w-full relative flex justify-center items-center"
      style={{ height: "100svh" }}
    >
      <div // womb
        className={`womb-enter w-full h-full absolute 
        flex justify-center items-center rounded-full sm:mt-[-50px] mt-[-75px]`}
        style={{
          height: 350,
          width: 350,
          zIndex: -1,
        }}
      >
        <div
          className={`womb-breathe rounded-full border border-zinc-500`}
          style={{
            height: 350,
            width: 350,
          }}
        />
      </div>
      <div // text
        className={`flex flex-col justify-center 
        items-center title-enter sm:mt-[-15px] mt-[-60px]`}
      >
        <p className="font-thin text-[37px] text-white">Welcome to Eve</p>
        <p className="font-thin text-white text-center">
          An AI diary for young women
        </p>
        <div className="mt-[14px]">
          <EmailField />
        </div>
      </div>
    </div>
  )
}
