import { useStateContext } from "@/StateContext"
import { useRouter } from "next/router"

export default function NavBar() {
  const { isInsideWomb } = useStateContext()

  const router = useRouter()

  return (
    <div className="womb-innards">
      <div
        className={isInsideWomb ? "title-trimmings" : undefined} // don't show animation when leaving
        style={{ opacity: isInsideWomb ? 1 : 0 }}
      >
        <div
          className="absolute w-full flex justify-center items-center gap-4 navbar pointer-events-none"
          style={{
            zIndex: 1,
            height: 100,
            transition: "margin-top 250ms linear",
            backgroundImage: "linear-gradient(white, transparent)",
          }}
        >
          <p
            className={`absolute ${
              router.pathname === "/about"
                ? "border-black"
                : "border-[transparent]"
            } hover:border-black cursor-pointer  
       text-center right-[70%] sm:text-left sm:mr-[50px] sm:right-[50%] pointer-events-auto`}
            style={{
              borderBottomWidth: 1,
              lineHeight: 1.15,
              transition: "border-color 175ms ease-in-out",
            }}
            onClick={() => router.push("/about")}
          >
            About
          </p>

          <div
            className={`absolute bg-white rounded-full border border-black cursor-pointer hover:border-2 sm:h-[20px] sm:w-[20px] h-[24px] w-[24px] pointer-events-auto`}
            style={{
              transition: "border-width 150ms ease-in-out",
            }}
            onClick={() => router.push("/")}
          />
          <p
            className={`absolute hover:border-black ${
              router.pathname === "/roles"
                ? "border-black"
                : "border-[transparent]"
            } cursor-pointer
       text-center left-[70%] sm:text-right sm:ml-[50px] sm:left-[50%] pointer-events-auto`}
            style={{
              borderBottomWidth: 1,
              lineHeight: 1.1,
              transition: "border-color 175ms ease-in-out",
            }}
            onClick={() => router.push("/roles")}
          >
            Roles
          </p>
        </div>
      </div>
    </div>
  )
}
