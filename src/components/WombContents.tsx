import useEventListener from "@/utils/useEventListener"
import { EmailField } from "./EmailField"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInOutSine, easeInQuad, easeInSine } from "@/utils/easingFns"
import getDistance from "@/utils/getDistance"
import { useEffect, useRef, useState } from "react"

export function getMaxScrollY() {
  return 4 * getDistance(window.innerWidth / 2, window.innerHeight / 2, 0, 0)
}

export default function WombContents() {
  const scrollY = useRef(0)
  const [fullyScrolled, setFullyScrolled] = useState(false)
  const curAnimationId = useRef(0)

  useEffect(() => {
    const contents = document.querySelector(
      ".womb-contents"
    ) as HTMLDivElement | null
    if (!contents) return

    contents.style.opacity = "0"
    contents.style.scale = "0"

    if (navigator.maxTouchPoints > 1) {
      contents.style.opacity = "1"
      contents.style.scale = "1"
      setFullyScrolled(true)
    }
  }, [])
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

    const targetOpacity = getMappedValue(scrollY.current, 0, maxScrollY, 0, 1)

    const targetScale = getMappedValue(
      scrollY.current,
      0,
      maxScrollY,
      0,
      1,
      easeInQuad
    )

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
        transformOrigin: "center",
      }}
    >
      <Blurb />
      <div
        className="w-full flex items-center"
        style={{
          opacity: fullyScrolled ? 1 : 0,
          transitionDuration: fullyScrolled ? "500ms" : "0ms",
        }}
      >
        <Footer />
      </div>
    </div>
  )
}

function Blurb() {
  return (
    <div className="flex flex-col justify-center items-center sm:-mt-2 -mt-[10svh]">
      <p className="sm:block hidden text-white mb-10 text-left  tracking-wider font-light">
        Welcome to Eve, a tool to augment emotional
        <br /> intelligence. It is currently under development <br /> and will
        be released later this year.
      </p>
      <p className="sm:hidden text-white mb-10 text-left w-[273px] tracking-wider font-light">
        Eve is a tool to augment emotional
        <br className="sm:block hidden" /> intelligence. It is currently under
        development <br className="sm:block hidden" /> and will be released
        later this year.
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
