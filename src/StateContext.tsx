import { ReactNode, createContext, useContext, useRef, useState } from "react"
import { useScrollAnimations } from "./utils/useScrollAnimations"
import { set } from "lodash"

interface StateContextType {
  hasEnteredWomb: boolean
  secondBlurbVisible: boolean
  setSecondBlurbVisible: (_: boolean) => void
  thirdBlurbVisible: boolean
  setThirdBlurbVisible: (_: boolean) => void
  scrolled: boolean
  scrollOverlayRef?: React.RefObject<HTMLDivElement>
  wombIsClosed: boolean
  isInsideWomb: boolean
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
  scrollOverlayRef: undefined,
  wombIsClosed: false,
  isInsideWomb: false,
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
  const [secondBlurbVisible, setSecondBlurbVisible] = useState(false)
  const [thirdBlurbVisible, setThirdBlurbVisible] = useState(false)
  const [scrolled, setScrolled] = useState(startOpened)
  const [wombIsClosed, setWombIsClosed] = useState(!startOpened)
  const [isInsideWomb, setIsInsideWomb] = useState(startOpened)

  const scrollOverlayRef = useRef<HTMLDivElement>(null)

  useScrollAnimations(
    scrollOverlayRef,
    hasEnteredWomb,
    setHasEnteredWomb,
    setScrolled,
    setWombIsClosed,
    setIsInsideWomb,
    setSecondBlurbVisible,
    setThirdBlurbVisible,
    startOpened
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
        scrollOverlayRef,
        wombIsClosed,
        isInsideWomb,
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
