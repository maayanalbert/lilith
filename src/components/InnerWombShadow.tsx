import useEventListener from "@/utils/useEventListener"
import { getDist, getMaxWombSize, startSize } from "@/utils/useScrollAnimations"
import { useEffect, useState } from "react"

interface Props {
  exitHovering: boolean
  exited: boolean
}

export function InnerWombShadow({ exitHovering, exited }: Props) {
  const [halfWombSize, setHalfWombSize] = useState(0)
  const [exitHoveringDelayed, setExitHoveringDelayed] = useState(false)

  useEffect(() => {
    if (!exitHovering) {
      setTimeout(() => {
        setExitHoveringDelayed(false)
      }, 450)
    } else {
      setExitHoveringDelayed(true)
    }
  }, [exitHovering])

  useEffect(() => {
    const halfWombSize =
      getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) * 2
    setHalfWombSize(halfWombSize)
  }, [])

  useEventListener(
    "resize",
    () => {
      const halfWombSize =
        getDist(0, 0, window.innerWidth / 2, window.innerHeight / 2) * 2

      setHalfWombSize(halfWombSize)
    },
    [setHalfWombSize]
  )

  return (
    <div
      className="h-full w-full"
      style={{
        position: "fixed",
        background:
          exitHovering || exitHoveringDelayed || exited
            ? "black"
            : "transparent",
      }}
    >
      <div
        className="relative"
        style={{
          opacity: exited ? 0 : 1,
          filter: exited ? "blur(10px)" : "blur(0px)",
          transitionTimingFunction: "linear",
          transitionDuration: "1000ms",
          transitionDelay: "1000ms",
        }}
      >
        <div // side shadow
          className="absolute bg-white rounded-full"
          style={{
            height: exited ? startSize : halfWombSize,
            width: exited ? startSize : halfWombSize,
            boxShadow: exitHovering
              ? `inset 0 0 20px 20px rgb(0 0 0)`
              : exited
              ? "inset 0 0 0px 0px rgb(0 0 0)"
              : "",
            top: "50svh", // might cause problems
            left: "50%",
            transform: "translate(-50%, -50%)",
            transitionDuration: exited
              ? "1000ms"
              : exitHovering
              ? "300ms"
              : "450ms",
            transitionProperty: "height, width, box-shadow",
            transitionTimingFunction: exited
              ? `ease-in, ease-in, ${easeOutExpo}`
              : "ease-out",
            transitionDelay: exited ? "50ms" : "0ms",
          }}
        />
      </div>
      <div className="relative">
        <p
          className="text-center absolute text-2xl font-light text-gray-500"
          style={{
            top: "50svh", // might cause problems
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: exited ? 1 : 0,
            transitionDuration: "500ms",
            transitionProperty: "all",
            transitionTimingFunction: "ease-in-out",
            transitionDelay: "2500ms",
          }}
        >
          Summer 2024
        </p>
      </div>
    </div>
  )
}

export const easeInQuad = "cubic-bezier(0.11, 0, 0.5, 0)"
export const easeInCubic = "cubic-bezier(0.32, 0, 0.67, 0)"
export const easeInQuart = "cubic-bezier(0.5, 0, 0.75, 0))"
export const easeOutCubic = "cubic-bezier(0.33, 1, 0.68, 1"
export const easeInExpo = "cubic-bezier(0.7, 0, 0.84, 0)"
export const easeInCirc = "cubic-bezier(0.55, 0, 1, 0.45)"
export const easeOutExpo = "cubic-bezier(0.16, 1, 0.3, 1)"
