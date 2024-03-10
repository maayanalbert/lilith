import { P5CanvasInstance } from "@p5-wrapper/react"
import { NextReactP5Wrapper } from "@p5-wrapper/next"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine, easeOutCirc, easeOutSine } from "@/utils/easingFns"
import getDistance from "@/utils/getDistance"
import WombContents, { getMaxScrollY } from "@/components/WombContents"
import { useState } from "react"
import useEventListener from "@/utils/useEventListener"
import Hint from "@/components/Hint"
import ReleaseDate from "@/components/ReleaseDate"

/**
 * A wrapper for the main page
 */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  useEventListener("wheel", () => {
    setScrolled(true)
  })

  return (
    <div>
      <div className={`${!scrolled && "womb-enter"} absolute`}>
        <NextReactP5Wrapper sketch={sketch} />
      </div>
      <div className="absolute w-full flex items-center">
        <Hint />
      </div>
      <div className="absolute w-full flex items-center">
        <WombContents />
      </div>
      <ReleaseDate />
    </div>
  )
}

// need to put this all in the same file for some reason, will find workaround at some point
const numIterations = 48
let scrollY = 0
const arcStep = 10

const minScrollY = 0
const minStep = 5.1

let maxStep = 0 // resize with window
let minArcRatio = 0 // resize with scroll
let maxScrollY = 0

// update with render
let xoff = 400
let yoff = 0.3
let xArc = 0.1
let yArc = 0.2

function sketch(p5: P5CanvasInstance) {
  p5.setup = () => setup(p5)
  p5.draw = () => draw(p5)
  p5.mouseWheel = (event: { delta: number }) => mouseWheel(p5, event)
  p5.windowResized = () => windowResized(p5)
}

/**
 * Called first on initial render
 */
function setup(p5: P5CanvasInstance) {
  p5.createCanvas(p5.windowWidth, p5.windowHeight)

  maxScrollY = getMaxScrollY()

  maxStep = maxScrollY / numIterations
}

/**
 * Called continuously to draw the animation
 */
function draw(p5: P5CanvasInstance) {
  const step = getMappedValue(
    scrollY,
    minScrollY,
    maxScrollY,
    minStep,
    maxStep,
    easeInSine
  )

  var targetMinArcRatio = getMappedValue(scrollY, minScrollY, maxScrollY, 0, 1)

  minArcRatio = minArcRatio * 0.9 + targetMinArcRatio * 0.1

  p5.noiseDetail(1, 0.9)
  p5.background(0, 0, 0)
  p5.noFill()

  xoff += 0.011
  yoff += 0.005
  for (var i = 1; i < numIterations; i += 1) {
    const strokeWeightVal = p5.noise(xoff, i) * 13

    const scrollAdjustedStrokeWeight = getMappedValue(
      step,
      minStep,
      maxStep,
      strokeWeightVal,
      strokeWeightVal * 10
    )
    p5.strokeWeight(scrollAdjustedStrokeWeight)
    xArc = p5.constrain(
      p5.PI * (p5.noise((xoff * i * arcStep) / 640) * 8),
      0,
      yArc
    )
    yArc = p5.constrain(
      p5.PI * (p5.noise((yoff * i * arcStep) / 450) * 3),
      xArc + 1,
      p5.PI * 2
    )

    const grayVal = getMappedValue(i, 0, numIterations, 0, 255, easeInSine)

    p5.stroke(grayVal, grayVal, grayVal)

    const size = getMappedValue(
      i,
      0,
      numIterations,
      numIterations * step * minArcRatio,
      numIterations * step,
      easeOutCirc
    )

    p5.arc(p5.windowWidth / 2, p5.windowHeight / 2, size, size, yArc, xArc)
  }
}

function mouseWheel(p5: P5CanvasInstance, event: { delta: number }) {
  scrollY = Math.max(minScrollY, Math.min(scrollY + event.delta, maxScrollY))

  if (scrollY >= maxScrollY) {
    p5.noLoop()
  } else {
    p5.loop()
  }
}

function windowResized(p5: P5CanvasInstance) {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight)

  maxScrollY = getMaxScrollY()
  maxStep = maxScrollY / numIterations
}
