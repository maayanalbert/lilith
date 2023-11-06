interface Props {
  isVisible: boolean
}

export function SecondBlurb({ isVisible }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white text-black">
      <div
        className="w-[350px] sm:w-[530px] text-center text-center sm:text-lg font-light"
        style={{
          transitionProperty: "opacity",
          transitionDuration: "750ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <p className="text-lg sm:text-xl font-normal">Take a bite</p>
        <div className="h-6" />
        <p>Eve will launch as a mobile app this summer.</p>
        <p>
          To learn more, contact <u>maayan@eve.space.</u>
        </p>
      </div>
    </div>
  )
}
