import {
  SpaceType,
  getSpaceColor,
  getSpaceName,
  useSpacesContext,
} from "@/SpaceContext"
import { useRef } from "react"

/**
 * The bar of buttons for spaces
 */
export default function SpaceButtons() {
  const { setCurSpace } = useSpacesContext()
  const buttonsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="h-0 sticky top-0">
      <div className="absolute w-full flex justify-center items-center mb-12">
        <div
          className="flex flex-row items-center justify-between gap-[10px]"
          ref={buttonsRef}
        >
          <SpaceSelectable space="IDEAS" />
          <SpaceSelectable space="FEELINGS" />
          <SpaceSelectable space="NOTES" />
        </div>
      </div>
    </div>
  )
}

interface SpaceSelectableProps {
  space: SpaceType
}

function SpaceSelectable({ space }: SpaceSelectableProps) {
  const { curSpace, setCurSpace } = useSpacesContext()

  const accentColor =
    !curSpace || curSpace === space ? getSpaceColor(space) : "gray"

  const onPress = () => {
    if (curSpace === space) {
      setCurSpace()
    } else {
      setCurSpace(space)
    }
  }
  return (
    <div
      className={`rounded text-base border px-[20px] py-[5px] cursor-pointer 
      hover:scale-105 transition-transform ease-in-out`}
      style={{
        color: accentColor,
        borderColor: accentColor,
        borderRadius: 7,
      }}
      onClick={onPress}
    >
      {getSpaceName(space)}
    </div>
  )
}
