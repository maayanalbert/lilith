export default function getBrowserType(navigator: Navigator) {
  var userAgent = navigator.userAgent.toLowerCase()

  // Check if the user agent contains the name of a specific mobile browser
  if (userAgent.includes("crios")) {
    // Chrome browser
    return "Chrome"
  } else if (userAgent.includes("safari")) {
    // Safari browser
    return "Safari"
  } else if (userAgent.includes("firefox")) {
    // Firefox browser
    return "Firefox"
  } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
    // Opera browser
    return "Opera"
  } else if (userAgent.includes("edge")) {
    // Microsoft Edge browser
    return "Edge"
  } else if (userAgent.includes("ie")) {
    // Internet Explorer browser (not commonly used on mobile)
    return "IE"
  } else {
    // Other or unknown browser
    return undefined
  }
}
