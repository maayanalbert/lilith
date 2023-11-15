interface Props {
  hasEnteredWomb: boolean
  hasClosedWomb: boolean
  scrolled: boolean
}

export default function Womb({
  hasEnteredWomb,
  hasClosedWomb,
  scrolled,
}: Props) {
  return (
    <div className="absolute w-full bg-black" style={{ height: "100svh" }}>
      <div className="relative h-full w-full">
        <div
          className="absolute"
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            opacity:
              hasEnteredWomb && !hasClosedWomb && navigator.maxTouchPoints === 0
                ? 0
                : 1,
            transitionProperty: hasEnteredWomb ? "opacity" : undefined,
            transitionDuration: "500ms",
            transitionTimingFunction: "ease-in",
            transitionDelay: "200ms",
          }}
        >
          <p
            className={`hint-enter expand-hint font-light text-3xl text-zinc-500`}
            style={{
              paddingTop: 88 * 2 + 20,
            }}
          >
            {hasEnteredWomb ? "Summer 2024" : "(scroll)"}
          </p>
        </div>
        <div
          className={`rounded-full womb bg-white absolute ${
            !scrolled && "womb-enter"
          }`}
          style={{
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
    </div>
  )
}
