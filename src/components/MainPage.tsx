import InfoCard from "@/components/InfoCard"
import AccessCard from "@/components/AccessCard"
import TitleCard from "@/components/TitleCard"

/**
 * The main page where all of the content is
 */
export default function MainPage() {
  return (
    <div className="relative">
      <TitleCard />
      <InfoCard />
      <AccessCard />
    </div>
  )
}
