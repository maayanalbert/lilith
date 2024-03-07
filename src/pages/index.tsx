import { EmailField } from "@/components/EmailField"
import Womb from "@/components/Womb"
import { useScrollAnimations } from "@/components/useScrollAnimations"

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
        className={`w-full flex flex-col justify-center items-center relative`}
        style={{ height: "100svh" }}
      >
        <Blurb />
        <Footer />
      </div>
    </div>
  )
}

export function Blurb() {
  return (
    <div className="flex flex-col justify-center items-center sm:-mt-4 -mt-[10svh] blurb">
      <div className="flex flex-col items-center">
        <a
          className="sm:text-[44px] text-[36px] text-white"
          style={{ fontWeight: "700" }}
        >
          Welcome to Eve
        </a>
        <p className="sm:w-[433px] w-[300px] text-zinc-500 text-center font-light">
          An AI diary for young women
        </p>
      </div>
      <p className="hint text-zinc-200 mt-7 mb-10 text-center sm:w-[450px] w-[300px]">
        Eve is a space to think, a space <br className="sm:hidden" /> to
        question, a space
        <br className="sm:block hidden" /> to learn. Where your consciousness
        melds with that which is greater than any one of us. A space for the
        soul.
      </p>
      <EmailField />
    </div>
  )
}

export function Footer() {
  return (
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
        to learn more
      </div>

      <div className="text-sm text-zinc-600 text-center">
        <p>Copyright Eve Technologies 2024</p>
      </div>
    </div>
  )
}
