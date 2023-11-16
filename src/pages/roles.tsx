import { useStateContext } from "@/StateContext"
import { useEffect, useState } from "react"

export default function Roles() {
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
      <div className="sm:w-[400px] w-[280px] font-light">
        <p>Open roles:</p>
        <br />
        <div className="relative">
          <p className="absolute">-</p>
        </div>
        <p className="pl-8">
          Interaction Designer{" "}
          <i> 3-6 yrs, expertise in authoring environments.</i>
        </p>
        <br />
        <p className="pl-8">
          For inquiries, contact{" "}
          <a
            target="_blank"
            href="mailto:maayan@eve.space"
            className="underline pointer-events-auto"
          >
            maayan@eve.space
          </a>
        </p>
        <br />
        <br />

        <i>
          *If you're interested and truly exceptional, but don’t see your
          background listed, reach out regardless.
        </i>
      </div>
    </div>
  )
}
