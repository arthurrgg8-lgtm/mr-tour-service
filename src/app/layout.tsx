import type { Metadata } from "next"
import { Montserrat, Lora } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/layout/WhatsAppButton"
import ScrollToTop from "@/components/ui/ScrollToTop"
import business from "@/data/business.json"
import { buildWhatsAppUrl } from "@/lib/utils"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    default: `${business.name} | Premium Vehicle Rental & Tours in Nepal`,
    template: `%s | ${business.name}`
  },
  description: `Experience Nepal with confidence — 100% owned fleet of luxury vehicles, expert-led treks, and curated tours. Safe, reliable travel across Kathmandu, Pokhara & beyond. Book now.`,
  keywords: ["car rental Nepal", "Kathmandu vehicle hire", "Jeep rental for Mustang", "luxury tour packages Nepal", "Everest base camp trekking", "Toyota Hiace rental Nepal", "premium travel service Kathmandu", "best tour operator Nepal"],
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
    title: `${business.name} | Premium Vehicle Rental & Tours in Nepal`,
    description: `100% company-owned luxury fleet, expert-led Himalayan treks, and curated Nepal tours. Safe, reliable travel since 2003 — from Kathmandu to Everest.`,
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Premium Vehicle Rental & Tours in Nepal`,
    description: `100% company-owned luxury fleet, expert-led Himalayan treks, and curated Nepal tours. Safe, reliable travel since 2003 — from Kathmandu to Everest.`,
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
        "reviewBody": "The custom tour planned by M.R TRAVEL AND TOUR was fantastic. Everything was well-organized and the pricing was very fair."
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${lora.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  )
}
