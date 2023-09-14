import Title from "@/components/Title"
import InfoCard from "@/components/InfoCard"
import AccessCard from "@/components/AccessCard"
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

      <div className="flex flex-col items-center" style={{ paddingTop: 0 }}>
        <div style={{ height: "7vh", width: "100vw" }} />

        <InfoCard />
        <div style={{ height: "7vh", width: "100vw" }} />
        <AccessCard />
        {/* the bottom padding */}
        <div className="relative w-full">
          <div style={{ height: `calc(50vh - ${180}px)`, width: "100vw" }} />
        </div>
        {/* */}
      </div>
    </>
  )
}
