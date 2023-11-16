import { ReactNode, createContext, useContext, useRef, useState } from "react"
import { useScrollAnimations } from "./utils/useScrollAnimations"

interface StateContextType {
  hasEnteredWomb: boolean
  secondBlurbVisible: boolean
  setSecondBlurbVisible: (_: boolean) => void
  thirdBlurbVisible: boolean
  setThirdBlurbVisible: (_: boolean) => void
  scrolled: boolean
  hasClosedWomb: boolean
  scrollOverlayRef?: React.RefObject<HTMLDivElement>
}

/**
 * Create the context
 */
const StateContext = createContext<StateContextType>({
  hasEnteredWomb: false,
  secondBlurbVisible: false,
  setSecondBlurbVisible: () => undefined,
  thirdBlurbVisible: false,
  setThirdBlurbVisible: () => undefined,
  scrolled: false,
  hasClosedWomb: false,
  scrollOverlayRef: undefined,
})

interface Props {
  children: ReactNode
}

/**
 * Create the provider that everything that uses the context should be wrapped in
 */
export function StateContextProvider({ children }: Props) {
  const [hasEnteredWomb, setHasEnteredWomb] = useState(false)
  const [secondBlurbVisible, setSecondBlurbVisible] = useState(false)
  const [thirdBlurbVisible, setThirdBlurbVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hasClosedWomb, setHasClosedWomb] = useState(false)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    scrollOverlayRef,
    hasEnteredWomb,
    setHasEnteredWomb,
    setScrolled,
    setHasClosedWomb
  )

  return (
    <StateContext.Provider
      value={{
        hasEnteredWomb,
        secondBlurbVisible,
        setSecondBlurbVisible,
        thirdBlurbVisible,
        setThirdBlurbVisible,
        scrolled,
        hasClosedWomb,
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
