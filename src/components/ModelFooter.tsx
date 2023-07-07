import { ReactNode } from "react"

interface Props {
  text?: string
  isSmall: boolean
}

/**
 * An icon and optionally small text explaining the model used
 */
export default function SourceFooter({ text, isSmall }: Props) {
  return (
    <>
      <div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          background:
            "linear-gradient(190deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.75) 100%)",
        }}
      />
      <p
        className="absolute text-xs text-white drop-shadow-2xl items-center"
        style={{
          fontSize: isSmall ? 9 : 12,
          bottom: isSmall ? 3 : 8,
          left: isSmall ? 3 : 8,
        }}
      >
        {text}
      </p>
    </>
  )
}
