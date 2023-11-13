import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"

interface Props {
  isInsideWomb: boolean
}

export function FirstBlurb({ isInsideWomb }: Props) {
  return (
    <div className="absolute flex flex-col h-full w-full justify-center items-center">
      <p className="whitespace-nowrap select-none sm:text-8xl text-4xl cursor-default font-display">
        Welcome to Eve
      </p>
      <div className="relative w-full flex justify-center sm:mt-5 mt-2">
        <p
          className="font-light font-display sm:text-3xl text-xl title-trimmings text-center"
          style={{ opacity: isInsideWomb ? 1 : 0 }}
        >
          A space for your thoughts
        </p>
      </div>
    </div>
  )
}
