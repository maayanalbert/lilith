import { useStateContext } from "@/StateContext"
import { useEffect, useState } from "react"

export default function About() {
  const { scrollOverlayRef } = useStateContext()

  useEffect(() => {
    // for mobile
    if (scrollOverlayRef?.current) {
      scrollOverlayRef.current.style.pointerEvents = "auto"
    }
  }, [])

  return (
    <div
      className={`w-full title relative flex justify-center items-center pointer-events-none
      relative`} // need relative for some reason
      style={{
        height: "100svh",
        transformOrigin: "50% 50%",
        zIndex: 1, // place above the scroll overlay but hide pointer events for anything other than links
      }}
    >
      <div className="sm:w-[460px] w-[280px] font-light">
        <p>
          Eve is a New York based venture building AIs as environments, with the
          goal of making a new type of{" "}
          <a
            className="underline pointer-events-auto"
            target="_blank"
            href="https://www.youtube.com/watch?v=KmuP8gsgWb8"
          >
            personal computer
          </a>
          .
        </p>
        <br />
        <p>
          Its founder is{" "}
          <a
            className="underline pointer-events-auto"
            target="_blank"
            href="https://twitter.com/_maayanster"
          >
            Maayan Albert
          </a>
          , a Carnegie Mellon alum whose work in authoring environments has
          received industry wide recognition.
        </p>
        <br />
        <p>
          To learn more, please contact to{" "}
          <a
            className="underline pointer-events-auto"
            href="mailto:maayan@eve.space"
          >
            maayan@eve.space
          </a>
          .
        </p>
      </div>
    </div>
  )
}
