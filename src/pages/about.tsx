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
        <p className="font-normal">Eve is a seed stage venture in New York.</p>
        <br />
        <p>
          It's lead by{" "}
          <a
            className="underline pointer-events-auto"
            target="_blank"
            href="https://twitter.com/_maayanster"
          >
            Maayan Albert
          </a>
          , a Carnegie Mellon alum whose work on{" "}
          <a
            className="underline pointer-events-auto"
            target="_blank"
            href="https://paper.dropbox.com/doc/Stamper-An-Artboard-Oriented-Programming-Environment-QXtfMXshBFBNCu6iCtx2J"
          >
            digital authoring environments
          </a>{" "}
          has received industry wide recognition.
        </p>
        <br />
        <p>
          To learn more, contact{" "}
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
