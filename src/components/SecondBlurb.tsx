import { useStateContext } from "@/StateContext"
import { ArrowDownIcon } from "@heroicons/react/24/solid"

export default function SecondBlurb() {
  const { hasEnteredWomb, secondBlurbVisible } = useStateContext()
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-8">
      <div
        className="absolute w-full flex justify-center items-end top-0"
        style={{ height: `9svh` }}
      >
        <ArrowDownIcon
          width={20}
          height={20}
          className="title-trimmings"
          style={{ opacity: hasEnteredWomb ? 1 : 0 }}
        />
      </div>
      <div
        className={`rounded-full border border-black flex justify-center 
        items-center sm:h-[350px] sm:w-[350px] h-[250px] w-[250px] p-6`}
        style={{
          lineHeight: 1.5,
          transitionProperty: "opacity",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: secondBlurbVisible ? 1 : 0,
        }}
      >
        <p className="font-display sm:text-[22px] text-lg text-center font-light sm:w-[420px w-[300px">
          Eve is an intelligent environment for human thought.
        </p>
      </div>
    </div>
  )
}
