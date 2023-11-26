import { useStateContext } from "@/StateContext"

export default function Womb() {
  const { hasEnteredWomb, wombIsClosed, scrolled } = useStateContext()

  return (
    <div className="w-full relative" style={{ height: "100svh" }}>
      <div // hint
        className="absolute"
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          opacity: hasEnteredWomb && !wombIsClosed ? 0 : 1,
          transitionProperty: hasEnteredWomb ? "opacity" : undefined,
          transitionDuration: "500ms",
          transitionTimingFunction: "ease-in",
          transitionDelay: "200ms",
        }}
      >
        <p
          className={`hint-enter expand-hint font-light ${
            hasEnteredWomb ? "text-[27px]" : "text-3xl"
          } text-zinc-500`}
          style={{
            paddingTop: 88 * 2 + 20,
          }}
        >
          {hasEnteredWomb ? "Take a Bite" : "(scroll)"}
        </p>
      </div>
      <div // womb
        className={`womb absolute ${!scrolled && "womb-enter"}`}
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          transformOrigin: "50% 50%",
        }}
      >
        <div className="bg-white h-full w-full rounded-full circle" />
      </div>
      <div // title
        className="title absolute h-full w-full"
        style={{
          height: "100svh",
          transformOrigin: "50% 50%",
        }}
      >
        <div className="flex flex-col h-full w-full justify-center items-center">
          <p className="whitespace-nowrap select-none sm:text-[84px] text-[34px] cursor-default font-display sm:-mt-3 -mt-1">
            Welcome to Eve
          </p>
        </div>
      </div>
    </div>
  )
}
