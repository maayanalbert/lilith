import AccessCard from "@/components/AccessCard"
import TitleCard from "@/components/TitleCard"

/**
 * The main page where all of the content is
 */
export default function MainPage() {
  return (
    <div className="relative h-[100%]">
      <TitleCard />
      <AccessCard />
    </div>
  )
}
