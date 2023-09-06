import exp from "constants"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import getBrowserType from "./helpers/getBrowserType"

interface GlobalsContextType {
  isMobile: boolean | undefined
  midColor: string
  lowColor: string
  fadeInTitle: boolean | undefined
}

/**
 * Create the context
 */
const GlobalsContext = createContext<GlobalsContextType>({
  isMobile: undefined,
  midColor: "",
  fadeInTitle: undefined, // fade in the title if we're not on mobile chrome
  lowColor: "",
})

interface Props {
  children: ReactNode
}

/**
 * Create the provider that everything that uses the context should be wrapped in
 */
export function GlobalsContextProvider({ children }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined) // set to undefined to start so we know if it hasn't been set yet
  const [midColor, setMidColor] = useState<string>("")
  const [fadeInTitle, setFadeInTitle] = useState<boolean | undefined>(undefined)
  const [lowColor, setLowColor] = useState<string>("")

  useEffect(() => {
    const isMobile = window.innerWidth < 640
    setIsMobile(isMobile)
    setMidColor(isMobile ? "rgb(125, 125, 125)" : "rgb(170, 170, 170)") // on mobile text is thicker and darker for some reason
    setLowColor(isMobile ? "rgb(70, 70, 70)" : "rgb(110, 110, 110)")
    setFadeInTitle(!(isMobile && getBrowserType(navigator) === "Chrome")) // allow as long as we're not on mobile chrome
  }, [])

  return (
    <GlobalsContext.Provider
      value={{
        isMobile,
        midColor,
        fadeInTitle,
        lowColor,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  )
}

/**
 * General getter for the context
 * A helper for all of the other getters and setters
 */
function useDynamicContentContext(): GlobalsContextType {
  const context = useContext(GlobalsContext)
  return context
}

/**
 * Use if we're on a mobile browser or not
 */
export function useIsMobile() {
  const { isMobile } = useDynamicContentContext()

  return isMobile
}

/**
 * Use our mid color
 */
export function useMidColor() {
  const { midColor } = useDynamicContentContext()

  return midColor
}

/**
 * Use our low color
 */
export function useLowColor() {
  const { lowColor } = useDynamicContentContext()

  return lowColor
}

/**
 * Use whether we can fade in the title or not
 */
export function useFadeInTitle() {
  const { fadeInTitle } = useDynamicContentContext()

  return fadeInTitle
}
