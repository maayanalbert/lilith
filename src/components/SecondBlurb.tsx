import { ArrowDownIcon } from "@heroicons/react/24/solid"

interface Props {
  isInsideWomb: boolean
  isVisible: boolean
}

export default function SecondBlurb({ isInsideWomb, isVisible }: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div
        className="absolute w-full flex justify-center items-end top-0"
        style={{ height: `9svh` }}
      >
        <ArrowDownIcon
          width={20}
          height={20}
          className="title-trimmings"
          style={{ opacity: isInsideWomb ? 1 : 0 }}
        />
      </div>
      <p
        className="font-display sm:text-2xl text-xl text-center font-light sm:w-[450px] w-[300px]"
        style={{
          lineHeight: 1.5,
          transitionProperty: "opacity",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        Eve is an intelligent entity that understands you, and exists as a
        digital space for your thoughts.
      </p>
    </div>
  )
}
