import { useEffect, useState } from "react"

export default function ExpandingTitle() {
  const [windowWidth, setWindowWidth] = useState(640)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])
  return (
    <div
      className="flex justify-center items-center bg-black h-full"
      style={{
        width: "300%",
        marginLeft: "-100%",
      }}
    >
      <div
        className={`rounded-full womb bg-white ${
          windowWidth >= 640 && "womb-fade-in"
        }`}
      />
      <div className="absolute flex h-full w-full justify-center items-center top-0">
        <p className="whitespace-nowrap select-none title sm:text-4xl text-xl cursor-default">
          Welcome to Eve
        </p>
      </div>
      <div className="absolute">
        <p
          className={`${
            windowWidth >= 640 && "hint-fade-in"
          } expand-hint font-light text-3xl text-gray-500`}
        >
          {"(scroll)"}
        </p>
      </div>
    </div>
  )
}
