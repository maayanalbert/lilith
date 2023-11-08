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
      <div className="absolute">
        <p
          className="fade-in-hint expand-hint font-light text-3xl"
          style={{ color: "gray" }}
        >
          {"(scroll)"}
        </p>
      </div>
    </div>
  )
}
