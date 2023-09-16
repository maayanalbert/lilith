import InfoCard from "@/components/InfoCard"
import AccessCard from "@/components/AccessCard"

/**
 * The main page where all of the content is
 */
export default function MainPage() {
  return (
    <div className="relative">
      <InfoCard />
      <AccessCard />
    </div>
  )
}
