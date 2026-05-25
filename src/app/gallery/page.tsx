import type { Metadata } from "next"
import business from "@/data/business.json"
import Gallery from "@/components/sections/Gallery"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Travel Gallery",
  description: `Visual memories of our journeys across Nepal. Browse photos of our premium fleet, satisfied clients, and breathtaking destinations managed by ${business.name}.`,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/gallery",
    siteName: business.name,
    title: business.name,
    description: `View photo gallery from ${business.name} tours, treks, and fleet across Nepal. See our journeys to Everest, Annapurna, Lumbini, Chitwan, and Kathmandu valley.`,
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
    title: business.name,
    description: `View photo gallery from ${business.name} tours, treks, and fleet across Nepal. See our journeys to Everest, Annapurna, Lumbini, Chitwan, and Kathmandu valley.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

export default function GalleryPage() {
  return (
    <div className="pt-20 pb-24">
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
