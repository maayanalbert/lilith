import { useStateContext } from "@/StateContext"
import { FirstBlurb } from "@/components/FirstBlurb"
import NavBar from "@/components/NavBar"
import SecondBlurb from "@/components/SecondBlurb"
import { ThirdBlurb } from "@/components/ThirdBlurb"
import Womb from "@/components/Womb"
import useEventListener from "@/utils/useEventListener"

/**
 * A wrapper for the main page
 */
export default function Home() {
  const { setSecondBlurbVisible, setThirdBlurbVisible, scrollOverlayRef } =
    useStateContext()

  useEventListener(
    "scroll",
    () => {
      const maxScrollY = document.body.scrollHeight - window.innerHeight

      if (window.scrollY > maxScrollY * 0.3) {
        setSecondBlurbVisible(true)
      }
      if (window.scrollY > maxScrollY * 0.7) {
        setThirdBlurbVisible(true)
      }
    },
    [setSecondBlurbVisible, setThirdBlurbVisible]
  )

  return (
    <>
      <div className="w-full h-full overflow-hidden relative">
        <Womb />

        <div className="womb-innards">
          <NavBar />
        </div>
        <div
          className="w-full h-fit title relative"
          style={{
            transformOrigin: "50% calc(16.6666% + 50px)",
          }}
        >
          <div
            className="w-full relative"
            style={{
              height: "100svh",
            }}
          >
            <FirstBlurb />
          </div>

          <div
            className="w-full womb-innards"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
            }}
          >
            <SecondBlurb />
          </div>

          <div
            className="w-full womb-innards"
            style={{
              height: "100svh",
              position: "relative",
              zIndex: 1,
              marginTop: "-16vh",
            }}
          >
            <ThirdBlurb />
          </div>
        </div>
      </div>
      <div // scroll overlay
        className="absolute top-0 w-full scrollbar-hidden"
        style={{
          height: "100svh",
          overflow: "scroll",
        }}
        ref={scrollOverlayRef}
      >
        <div style={{ height: "10000vh" }} />
      </div>
    </>
  )
}
