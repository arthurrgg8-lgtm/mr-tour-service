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
  metadataBase: new URL("https://mrtourservice.com.np"),
  title: {
    default: `${business.name} | Premium Vehicle Rental & Tours in Nepal`,
    template: `%s | ${business.name}`
  },
  description: `${business.name} is Nepal's premier travel service provider. We offer a 100% self-owned fleet of premium cars, 4x4 Jeeps, and luxury buses, alongside expert-led trekking and tour packages. Experience safe, reliable, and professional travel in Kathmandu and beyond.`,
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
    url: "https://mrtourservice.com.np",
    siteName: business.name,
    title: business.name,
    description: business.tagline,
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
    title: business.name,
    description: business.tagline,
    images: ["/logo.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/logo.jpg", sizes: "any" }],
    apple: "/logo.jpg",
  },
  category: 'travel',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
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
    "alternateName": "M.R travel and Tour",
    "description": "Nepal's premier travel service provider offering 100% self-owned fleet of premium cars, 4x4 Jeeps, and luxury buses.",
    "url": "https://mrtourservice.com.np",
    "logo": "https://mrtourservice.com.np/logo.jpg",
    "image": "https://mrtourservice.com.np/images/hero/services-bg.jpg",
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
