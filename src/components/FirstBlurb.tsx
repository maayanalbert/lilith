import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"

interface Props {
  isVisible: boolean
}

export function FirstBlurb({ isVisible }: Props) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div // text
        className={`absolute flex font-light 
          flex-col w-[350px] sm:w-[530px] text-center sm:text-lg ${
            isVisible ? "" : "cursor-default"
          }`}
        style={{
          transitionProperty: "opacity",
          transitionDuration: "750ms",
          transitionDelay: "250ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isVisible ? 1 : 0,
        }}
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
            style={{ marginTop: `32.5vh` }}
          >
            <ArrowDownIcon
              className="h-6 w-6"
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
