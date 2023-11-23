import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react"
import { useScrollAnimations } from "./utils/useScrollAnimations"
import { set } from "lodash"

interface StateContextType {
  hasEnteredWomb: boolean
  scrolled: boolean
  wombIsClosed: boolean
  scrollOverlayRef?: RefObject<HTMLDivElement>
}

/**
 * Create the context
 */
const StateContext = createContext<StateContextType>({
  hasEnteredWomb: false,
  scrolled: false,
  wombIsClosed: false,
  scrollOverlayRef: undefined,
})

interface Props {
  children: ReactNode
  startOpened: boolean
}

/**
 * Create the provider that everything that uses the context should be wrapped in
 */
export function StateContextProvider({ children, startOpened }: Props) {
  const [hasEnteredWomb, setHasEnteredWomb] = useState(startOpened)
  const [scrolled, setScrolled] = useState(startOpened)
  const [wombIsClosed, setWombIsClosed] = useState(!startOpened)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    setHasEnteredWomb,
    setScrolled,
    setWombIsClosed,
    scrollOverlayRef
  )

  return (
    <StateContext.Provider
      value={{
        hasEnteredWomb,
        scrolled,
        wombIsClosed,
        scrollOverlayRef,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

/**
 * Use the editor context
 */
export function useStateContext(): StateContextType {
  const context = useContext(StateContext)
  return context
}
