export const GA_ADS_ID = "AW-18048947362"
export const CALL_CONVERSION_ID = "AW-18048947362/huzaCJi45vQcEKKptJ5D"
export const CONTACT_CONVERSION_ID = "AW-18048947362/r9XICJu45vQcEKKptJ5D"
export const PHONE_FORWARDING_ID = "AW-18048947362/s8ybCJ645vQcEKKptJ5D"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (command: string, ...args: unknown[]) => void
    gtag_report_conversion?: (url?: string) => boolean | void
  }
}

/**
 * Tracks a Google Ads Click-to-Call conversion.
 * If url is provided and gtag callback is available, it handles navigation smoothly.
 */
export function trackCallConversion(url?: string): boolean {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    const callback = () => {
      if (typeof url !== "undefined" && url) {
        window.location.href = url
      }
    }
    window.gtag("event", "conversion", {
      send_to: CALL_CONVERSION_ID,
      value: 1.0,
      currency: "USD",
      event_callback: callback,
    })
    return false
  }
  if (typeof url !== "undefined" && url && typeof window !== "undefined") {
    window.location.href = url
  }
  return false
}

/**
 * Tracks a Google Ads Contact / Lead conversion event (Form inquiry, WhatsApp message, etc.).
 */
export function trackContactConversion(value: number = 1.0, currency: string = "USD") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CONTACT_CONVERSION_ID,
      value,
      currency,
    })
  }
}

// Export trackLeadConversion as alias for backward compatibility across existing components
export const trackLeadConversion = trackContactConversion

