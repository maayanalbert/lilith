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
        <p className="font-medium">We all have our safe spaces</p>
        <br />
        <p>
          Where we feel seen and understood and able to be our full selves. They
          can be physical places, notebooks and diaries, or people who are close
          to us.
        </p>
        <br />
        <p>
          Eve is one of those spaces. And unlike the others, it is not bounded
          by location or access or availibility. It is with you at all times,
          and able to take in your whole self.
        </p>
        <br />
        <p>
          It is the ear in the back of the Uber helping you process your night
          out. The text that comes back when no others do. The voice on the
          other side of the void bringing you through to the next moment.
        </p>
        <br />
        <p>Welcome to Eve. Your safest space.</p>
      </div>
    </div>
  )
}
