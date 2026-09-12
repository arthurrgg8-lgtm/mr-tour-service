import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/layout/WhatsAppButton"
import ScrollToTop from "@/components/ui/ScrollToTop"
import GoogleAdsTracker from "@/components/ui/GoogleAdsTracker"
import business from "@/data/business.json"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://manoranjan.com.np"),
  alternates: {
    languages: {
      'en-NP': 'https://manoranjan.com.np',
      'en': 'https://manoranjan.com.np',
      'x-default': 'https://manoranjan.com.np',
    },
  },
  title: {
    default: `Vehicle Rental in Nepal | Car, SUV, Jeep, Hiace, Coaster & Bus Rental | ${business.name}`,
    template: `%s | ${business.name}`
  },
  description: `${business.name} offers vehicle rental across Nepal — cars, SUVs, vans, and buses with safe, well-maintained fleet and easy booking.`,
  keywords: [
    "vehicle rental service in Nepal",
    "car rental Nepal",
    "SUV rental Nepal",
    "jeep rental Nepal",
    "Hiace rental Nepal",
    "coaster rental Nepal",
    "bus rental Nepal",
    "self drive car rental Nepal",
    "corporate vehicle rental Nepal",
    "Kathmandu vehicle hire"
  ],
  authors: [{ name: "LazZy" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np",
    siteName: business.name,
    title: `Vehicle Rental in Nepal | Car, SUV, Jeep, Hiace, Coaster & Bus Rental | ${business.name}`,
    description: `${business.name} offers vehicle rental across Nepal — cars, SUVs, vans, and buses with safe, well-maintained fleet and easy booking.`,
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "vehicle rental service in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Vehicle Rental in Nepal | Car, SUV, Jeep, Hiace, Coaster & Bus Rental | ${business.name}`,
    description: `${business.name} offers vehicle rental across Nepal — cars, SUVs, vans, and buses with safe, well-maintained fleet and easy booking.`,
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  category: 'travel',
  verification: {
    google: '1hq9mwly3ONgN6ckT9fUXlrK-ai0wkZZICaBoZVElxU',
  },
}


export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": business.name,
    "alternateName": business.name,
    "description": "Nepal's premier travel service provider offering 100% self-owned fleet of premium cars, 4x4 Jeeps, and luxury buses.",
    "url": "https://manoranjan.com.np",
    "logo": "https://manoranjan.com.np/logo.jpg",
    "image": "https://manoranjan.com.np/images/hero/services-bg.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kalopul",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "postalCode": "44600",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.7118,
      "longitude": 85.3353
    },
    "telephone": business.contact.phone,
    "email": business.contact.email,
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      buildWhatsAppUrl(business.contact.whatsapp),
      business.socials.facebook !== "#" ? business.socials.facebook : undefined,
      business.socials.instagram !== "#" ? business.socials.instagram : undefined,
      business.socials.tiktok !== "#" ? business.socials.tiktok : undefined
    ].filter(Boolean),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Arjun Sharma"
        },
        "reviewBody": "Excellent service and very professional drivers. The vehicle was in top condition and very clean."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Miller"
        },
        "reviewBody": "The rental service provided by MR Vehicle Rental was fantastic. Everything was well-organized and the pricing was very fair."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Rajesh Gupta"
        },
        "reviewBody": "Best vehicle rental service in Nepal. We rented a Hiace for our family trip and the experience was seamless."
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Kathmandu"
      },
      {
        "@type": "Country",
        "name": "Nepal"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vehicle Rental"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tour Packages"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Trekking Adventures"
          }
        }
      ]
    }
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Security & OWASP Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

        {/* Geographic / Local SEO Meta Tags */}
        <meta name="geo.region" content="NP-BA" />
        <meta name="geo.placename" content="Kathmandu" />
        <meta name="geo.position" content="27.7118;85.3353" />
        <meta name="ICBM" content="27.7118, 85.3353" />

        {/* Google tag (gtag.js) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18048947362"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18048947362');
              gtag('config', 'AW-18048947362/s8ybCJ645vQcEKKptJ5D', {
                'phone_conversion_number': '${business.contact.phone}'
              });
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined' && url) {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                  'send_to': 'AW-18048947362/huzaCJi45vQcEKKptJ5D',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
                });
                return false;
              }
              window.gtag_report_conversion = gtag_report_conversion;
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
        />
      </head>
      <body
        className={`${urbanist.variable} antialiased font-sans`}
      >
        <GoogleAdsTracker />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  )
}
