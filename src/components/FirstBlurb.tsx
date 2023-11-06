import { ChevronDownIcon } from "@heroicons/react/24/solid"

export function FirstBlurb() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div // text
        className="flex font-light flex-col w-[350px] sm:w-[530px] text-center sm:text-lg"
      >
        <p className="sm:text-xl text-lg font-normal">
          Eve is a space for your thoughts
        </p>
        <div className="h-6" />
        <p>
          Ancient rabbinic texts state that, as the earth's population sprang
          from Adam, each human soul contains its own unique world.
        </p>
        <div className="h-6" />
        <p>Within Eve, you'll uncover yours.</p>
        <div className="relative w-full bg-black">
          <div
            className="absolute w-full flex justify-center items-center"
            style={{ marginTop: `${33 / 2}vh` }}
          >
            <ChevronDownIcon
              className="h-8 w-8"
              width={0.5}
              stroke="white"
              strokeWidth={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
