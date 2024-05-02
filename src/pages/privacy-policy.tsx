import { P5CanvasInstance } from "@p5-wrapper/react"
import { NextReactP5Wrapper } from "@p5-wrapper/next"
import { getMappedValue } from "@/utils/getMappedValue"
import { easeInSine, easeOutCirc, easeOutSine } from "@/utils/easingFns"
import getDistance from "@/utils/getDistance"
import WombContents from "@/components/WombContents"
import { use, useEffect, useMemo, useRef, useState } from "react"
import useEventListener from "@/utils/useEventListener"
import Hint from "@/components/Hint"
import ReleaseDate from "@/components/ReleaseDate"
import {
  addScrollEventListenerSafe,
  getMaxScrollY,
} from "@/utils/scrollEventListeners"

/**
 * Eve privacy policy page
 */
export default function PrivacyPolicy() {
  return (
    <iframe
      src="/privacyPolicy.html"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        backgroundColor: "white",
      }}
    />
  )
}
