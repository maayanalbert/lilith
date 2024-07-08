import { EmailField, MOBILE_BLURB_WIDTH } from "./EmailField"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInQuad } from "@/utils/easingFns"
import { useRef, useState } from "react"
import { useScrollEventListener } from "@/utils/scrollEventListeners"

export default function WombContents() {
  const [fullyScrolled, setFullyScrolled] = useState(false)
  const curAnimationId = useRef(0)

  useScrollEventListener((scrollRatio) => {
    setFullyScrolled(scrollRatio > 0.99)

    const contents = document.querySelector(
      ".womb-contents"
    ) as HTMLDivElement | null
    if (!contents) return

    const targetOpacity = getMappedValue(scrollRatio, 0, 0.99, 0, 1)

    const targetScale = getMappedValue(scrollRatio, 0, 0.99, 0, 1, easeInQuad)

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
        opacity: 0,
        scale: 0,
        pointerEvents: !fullyScrolled ? "none" : "all",
        display: !fullyScrolled ? "none" : undefined,
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
    <div className="flex flex-col justify-center items-center sm:-mt-5 -mt-5 tracking-wider">
      <div className="sm:block hidden mb-10 text-left font-light text-zinc-100">
        <a className="font-bold text-white">Welcome to Eve.</a> We are exploring
        the space of AI personas and <br /> the role they will play in our lives
        in this new era of technology.
        <br /> If you're curious to learn more, reach out.
      </div>
      <p
        className="sm:hidden mb-10 text-left font-light text-white"
        style={{ width: MOBILE_BLURB_WIDTH }}
      >
        <a className="font-bold text-white">Welcome to Eve.</a> We are exploring
        the space of AI personas and the role they will play in our lives in
        this new era of technology. If you're curious to learn more, reach out.
      </p>
      <div className="text-zinc-200 font-light w-full flex justify-center">
        <EmailField />
      </div>
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
