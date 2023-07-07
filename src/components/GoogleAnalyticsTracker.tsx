import Script from "next/script"

export default function GoogleAnalyticsTracker() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9MTN8WWFN6"
      ></Script>
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9MTN8WWFN6');
        `}
      </Script>
    </>
  )
}
