import Script from "next/script";

/**
 * Loads an analytics provider only when configured:
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  → Plausible (cookieless)
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID → Google Analytics 4
 */
export function AnalyticsScripts() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <>
      {plausible && (
        <Script defer data-domain={plausible} src="https://plausible.io/js/script.tagged-events.js" strategy="afterInteractive" />
      )}
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
