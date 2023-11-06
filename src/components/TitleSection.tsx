import { ChevronDownIcon } from "@heroicons/react/24/solid"

interface Props {
  blurbVisible: boolean
}

export default function TitleSection({ blurbVisible }: Props) {
  return (
    <div
      className="flex justify-center items-center bg-black h-full"
      style={{
        width: "300%",
        marginLeft: "-100%",
      }}
    >
      <div className="rounded-full expand-womb bg-white fade-in-womb" />
      <div className="absolute flex h-full w-full justify-center items-center top-0">
        <p className="whitespace-nowrap select-none reveal-text sm:text-4xl text-xl cursor-default">
          Welcome to Eve
        </p>
      </div>
      <FirstBlurb blurbVisible={blurbVisible} />
    </div>
  )
}

function FirstBlurb({ blurbVisible }: Props) {
  return (
    <div // text
      className={`absolute flex font-light 
          flex-col w-[350px] sm:w-[530px] text-center sm:text-lg ${
            blurbVisible ? "" : "cursor-default"
          }`}
      style={{
        transitionProperty: "opacity",
        transitionDuration: blurbVisible ? "750ms" : "0ms",
        transitionDelay: blurbVisible ? "250ms" : "0ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: blurbVisible ? 1 : 0,
      }}
    >
      <p className="sm:text-xl text-lg font-normal">
        Eve is a space for your thoughts
      </p>
      <div className="h-6" />
      <p>
        Ancient rabbinic texts state that, as the earth's population sprang from
        Adam, each human soul contains its own unique world.
      </p>
      <div className="h-6" />
      <p>Within Eve, you'll uncover yours.</p>
      <div className="relative w-full bg-black">
        <div
          className="absolute w-full flex justify-center items-center"
          style={{ marginTop: `${33 / 2}vh` }}
        >
          <ChevronDownIcon
            className="h-8 w-8 fade-chevron-down"
            width={0.5}
            stroke="white"
            strokeWidth={0.5}
          />
        </div>
      </div>
    </div>
  )
}
