export default function ExpandingTitle() {
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
    </div>
  )
}

//   className={`absolute flex font-light
//       flex-col w-[350px] sm:w-[530px] text-center sm:text-lg ${
//         blurbVisible ? "" : "cursor-default"
//       }`}
//   style={{
//     transitionProperty: "opacity",
//     transitionDuration: blurbVisible ? "750ms" : "0ms",
//     transitionDelay: blurbVisible ? "250ms" : "0ms",
//     transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
//     opacity: blurbVisible ? 1 : 0,
//   }}
