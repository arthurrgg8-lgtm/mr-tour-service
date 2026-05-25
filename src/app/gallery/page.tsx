import type { Metadata } from "next"
import business from "@/data/business.json"
import Gallery from "@/components/sections/Gallery"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Travel Photo Gallery",
  description: `Visual journeys across Nepal — from Kathmandu's temples to the Everest skyline, Chitwan safaris & our premium fleet. See the adventures that await you.`,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/gallery",
    siteName: business.name,
    title: `${business.name} - Travel Photo Gallery`,
    description: `Visual journeys across Nepal — from Kathmandu's temples to the Everest skyline. See the beauty, people, and adventures that await you.`,
    images: [
      {
        url: "https://manoranjan.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} - Travel Photo Gallery`,
    description: `Visual journeys across Nepal — from Kathmandu's temples to the Everest skyline. See the beauty, people, and adventures that await you.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "Gallery", "item": "https://manoranjan.com.np/gallery" }
    ]
  }

  return (
    <div className="pt-20 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/services-bg.jpg" 
            alt="Gallery Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Gallery</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Capturing the essence of Nepal through our lens. Explore our journeys, 
            meet our happy clients, and see our premium fleet in action.
          </p>
        </div>
      </section>

      <Gallery />
    </div>
  )
}
