import { useStateContext } from "@/StateContext"
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export function FirstBlurb() {
  const { isInsideWomb } = useStateContext()
  return (
    <div className="absolute flex flex-col h-full w-full justify-center items-center">
      <p className="whitespace-nowrap select-none sm:text-8xl text-[42px] cursor-default font-display">
        Welcome to Eve
      </p>
      <div className="relative w-full flex justify-center sm:mt-7">
        <p
          className={`font-light font-display sm:text-3xl text-lg ${
            isInsideWomb ? "title-trimmings" : undefined
          } text-center`}
          style={{ opacity: isInsideWomb ? 1 : 0 }}
        >
          A space for your <a className="text-zinc-500">self</a>
        </p>
      </div>
    </div>
  )
}
