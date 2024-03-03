import { EmailField } from "@/components/EmailField"
import Womb from "@/components/Womb"
import { useScrollAnimations } from "@/utils/useScrollAnimations"

/**
 * A wrapper for the main page
 */
export default function Home() {
  useScrollAnimations()

  return (
    <div className="h-fit w-full relative overflow-hidden">
      <div style={{ height: "100svh", width: "100%" }}>
        <Womb />
      </div>
      <div
        className={`w-full flex flex-col justify-center items-center absolute top-0`}
        style={{ height: "100svh", zIndex: -1 }}
      >
        <div
          className={`absolute bottom-0 w-full flex flex-col justify-center sm:pb-[22px] pb-8`}
        >
          <div className="text-sm text-zinc-500 text-center pb-1">
            Contact{" "}
            <a
              target="_blank"
              className="underline cursor-pointer"
              href="mailto:maayan@eve.space"
            >
              maayan@eve.space
            </a>{" "}
            to learn more.
          </div>

          <div className="text-sm text-zinc-600 text-center ">
            <p>Copyright Eve Technologies 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
