import useEventListener from "@/utils/useEventListener"
import { useRef } from "react"

export default function NavBar() {
  const lastScrollY = useRef(0)
  useEventListener(
    "scroll",
    () => {
      const navbar = document.querySelector(".navbar") as HTMLDivElement | null
      if (!navbar) return

      if (window.scrollY > lastScrollY.current) {
        // scrolled down
        navbar.style.marginTop = "-100px"
      } else {
        navbar.style.marginTop = "0px"
      }

      lastScrollY.current = window.scrollY
    },
    []
  )

  return (
    <div
      className="fixed w-full flex justify-center items-center gap-4 navbar"
      style={{
        zIndex: 1,
        height: 100,
        transition: "margin-top 150ms ease-in-out",
        backgroundImage: "linear-gradient(white, transparent)",
      }}
    >
      <p
        className={`absolute  hover:border-black border-[transparent] cursor-pointer sm:text-base text-[17px] 
       text-center right-[70%] sm:text-left sm:mr-[50px] sm:right-[50%]`}
        style={{
          borderBottomWidth: 1,
          lineHeight: 1.15,
          transition: "border-color 150ms ease-in-out",
        }}
      >
        About
      </p>
      <div
        className="absolute rounded-full border border-black cursor-pointer hover:border-2 sm:h-[20px] sm:w-[20px] h-[24px] w-[24px]"
        style={{
          transition: "border-width 150ms ease-in-out",
        }}
      />
      <p
        className={`absolute hover:border-black border-[transparent] cursor-pointer sm:text-base text-[17px] 
       text-center left-[70%] sm:text-right sm:ml-[50px] sm:left-[50%]`}
        style={{
          borderBottomWidth: 1,
          lineHeight: 1.3,
          transition: "border-color 150ms ease-in-out",
        }}
      >
        Hiring
      </p>
    </div>
  )
}
