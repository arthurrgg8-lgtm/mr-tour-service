export const GA_ADS_ID = "AW-18048947362"
export const CONVERSION_ID = "AW-18048947362/s7N4CPj94-scEKKptJ5D"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (command: string, ...args: unknown[]) => void
  }
}

/**
 * Tracks a Google Ads lead conversion event.
 */
export function trackLeadConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CONVERSION_ID,
    })
  }
}
