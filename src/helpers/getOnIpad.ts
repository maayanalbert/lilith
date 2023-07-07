import { userAgent } from "next/server"

export default function getOnIpad(navigator: Navigator) {
  return navigator.userAgent.includes("iPad")
}
