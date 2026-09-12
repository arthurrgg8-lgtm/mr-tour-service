"use client"

import { useEffect } from "react"
import { trackCallConversion } from "@/lib/gtag"

/**
 * Global client component that captures all telephone link clicks
 * across all Server and Client components, ensuring 100% conversion
 * capture in Google Ads (AW-18048947362/huzaCJi45vQcEKKptJ5D).
 */
export default function GoogleAdsTracker() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="tel:"]')
      if (target) {
        const href = target.getAttribute("href") || undefined
        trackCallConversion(href)
      }
    }

    document.addEventListener("click", handleGlobalClick, { capture: true })
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true })
    }
  }, [])

  return null
}
