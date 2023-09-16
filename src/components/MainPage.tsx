import Title from "@/components/Title"
import InfoCard from "@/components/InfoCard"
import AccessCard from "@/components/AccessCard"

/**
 * The main page where all of the content is
 */
export default function MainPage() {
  return (
    <div className="relative">
      <Title />
      <InfoCard />
      <AccessCard />
    </div>
  )
}
