import Title from "@/components/Title"
import Cloud from "@/components/Cloud"
import InfoCard from "@/components/InfoCard"
import AlphaCard from "@/components/AlphaCard"
import { CARD_HEIGHT } from "@/constants"
/**
 * The main page where all of the content is
 */
export default function MainPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Title />
      </div>

      <div
        className="flex flex-col items-center"
        style={{ paddingTop: "100%" }}
      >
        <InfoCard />
        <AlphaCard />
        {/* the bottom padding */}
        <div className="relative w-full">
          <div style={{ height: `calc(50vh - ${180}px)`, width: "100vw" }} />
        </div>
        {/* */}
      </div>

      <Cloud />
    </>
  )
}
