import { useStateContext } from "@/StateContext"

export default function ScrollOverlay() {
  const { scrollOverlayRef } = useStateContext()
  return (
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
  )
}
