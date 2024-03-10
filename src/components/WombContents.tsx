import useEventListener from "@/utils/useEventListener"
import { EmailField } from "./EmailField"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInOutSine, easeInSine } from "@/utils/easingFns"
import getDistance from "@/utils/getDistance"
import { useRef, useState } from "react"

export function getMaxScrollY() {
  return 3 * getDistance(window.innerWidth / 2, window.innerHeight / 2, 0, 0)
}

export default function WombContents() {
  const scrollY = useRef(0)
  const [fullyScrolled, setFullyScrolled] = useState(false)
  const curAnimationId = useRef(0)
  useEventListener("wheel", (event) => {
    const maxScrollY = getMaxScrollY()

    scrollY.current = Math.min(
      Math.max(0, scrollY.current + event.deltaY),
      maxScrollY
    )

    setFullyScrolled(scrollY.current === maxScrollY)

    const contents = document.querySelector(
      ".womb-contents"
    ) as HTMLDivElement | null
    if (!contents) return

    const targetOpacity = getMappedValue(
      scrollY.current,
      0,
      maxScrollY,
      0,
      1,
      easeInSine
    )

    const targetScale = getMappedValue(scrollY.current, 0, maxScrollY, 0, 1)

    const animate = (
      animationId: number,
      targetOpacity: number,
      targetScale: number
    ) => {
      if (animationId !== curAnimationId.current) return

      const currentOpacity = parseFloat(contents.style.opacity)
      const currentScale = parseFloat(contents.style.scale)

      const newOpacity = currentOpacity * 0.5 + targetOpacity * 0.5
      const newScale = currentScale * 0.5 + targetScale * 0.5

      contents.style.opacity = newOpacity.toString()
      contents.style.scale = newScale.toString()

      if (
        Math.abs(newOpacity - targetOpacity) > 0.01 ||
        Math.abs(newScale - targetScale) > 0.01
      ) {
        requestAnimationFrame(() =>
          animate(animationId, targetOpacity, targetScale)
        )
      }
    }

    curAnimationId.current++
    requestAnimationFrame(() =>
      animate(curAnimationId.current, targetOpacity, targetScale)
    )
  })

  return (
    <div
      className={`w-full flex flex-col justify-center items-center relative womb-contents`}
      style={{
        height: "100svh",
        opacity: 0,
        transformOrigin: "center",
        scale: 0,
      }}
    >
      <Blurb fullyScrolled={fullyScrolled} />
      <Footer />
    </div>
  )
}

interface BlurbProps {
  fullyScrolled: boolean
}

function Blurb({ fullyScrolled }: BlurbProps) {
  return (
    <div className="flex flex-col justify-center items-center sm:-mt-4 -mt-[10svh]">
      <div className="flex flex-col items-center">
        <a
          className="sm:text-[42px] text-[36px] text-white"
          style={{ fontWeight: "700" }}
        >
          Welcome to Eve
        </a>
        <p
          className="sm:w-[433px] w-[300px] text-zinc-500 text-center"
          style={{
            opacity: fullyScrolled ? 1 : 0,
            transitionDuration: fullyScrolled ? "500ms" : "",
          }}
        >
          A second brain for emotional intelligence
        </p>
      </div>
      <p className="hint text-zinc-200 mt-7 mb-10 text-center sm:w-full w-[300px]">
        Eve is a tool to augment emotional intelligence. <br />
        It is currently under development and will be <br />
        released later this year.
      </p>

      <EmailField />
    </div>
  )
}

function Footer() {
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
