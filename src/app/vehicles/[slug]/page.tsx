import type { Metadata } from "next"
import { notFound } from "next/navigation"
import services from "@/data/services.json"
import business from "@/data/business.json"
import { Car, Map as MapIcon, Mountain, Bus, Users, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import VehicleDetailClient from "./VehicleDetailClient"
import { safeJsonLdStringify } from "@/lib/utils"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  images?: string[]
  featured: boolean
  details: string
  capacity?: string
  startingPrice?: string
  recommendedFor?: string
  subServices?: unknown[]
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  Users,
  ShieldCheck,
}

const vehicleSeoMeta: Record<string, { title: string; metaDescription: string; h1: string; h1Subtitle: string; imgAlt: string }> = {
  "car-rent": {
    title: `Car Rental in Nepal | Rent a Car in Kathmandu | ${business.name}`,
    metaDescription: `Rent a car in Nepal with ${business.name} — wide range, safe vehicles, and easy online booking for city and long-distance travel.`,
    h1: "Car Rental in Nepal",
    h1Subtitle: `Rent a car in Nepal with ${business.name} — safe, reliable vehicles for city and long-distance travel.`,
    imgAlt: "car rental Nepal",
  },
  "suv-rent": {
    title: `SUV Rental in Nepal | SUV Hire Kathmandu | ${business.name}`,
    metaDescription: `Book an SUV rental in Nepal for hill routes, family trips, and long journeys. Spacious, safe, and available with or without a driver.`,
    h1: "SUV Rental in Nepal",
    h1Subtitle: "Book a spacious, powerful SUV rental in Nepal — ideal for hill routes and family travel.",
    imgAlt: "SUV rental Nepal",
  },
  "jeep-rent": {
    title: `Jeep Rental in Nepal | Off-Road Jeep Hire | ${business.name}`,
    metaDescription: `Rent a jeep in Nepal for off-road adventures and trekking access. Reliable 4WD vehicles for tough terrain and multi-day trips.`,
    h1: "Jeep Rental in Nepal",
    h1Subtitle: "Rent a rugged, reliable jeep in Nepal — built for off-road adventures and trekking access.",
    imgAlt: "jeep rental Nepal off-road",
  },
  "hiace-rent": {
    title: `Hiace Rental in Nepal | Van Hire for Group Travel | ${business.name}`,
    metaDescription: `Book a Hiace rental in Nepal for group tours, family trips, and airport transfers. Comfortable seating for up to 12 passengers.`,
    h1: "Hiace Rental in Nepal",
    h1Subtitle: "Book a Hiace van rental in Nepal for comfortable group travel and airport transfers.",
    imgAlt: "Hiace van rental Nepal",
  },
  "minibus-rent": {
    title: `Coaster Rental in Nepal | Group & Corporate Travel Bus | ${business.name}`,
    metaDescription: `Rent a coaster in Nepal for corporate outings, school trips, and group tours. Comfortable seating for 20+ passengers.`,
    h1: "Coaster Rental in Nepal",
    h1Subtitle: "Rent a coaster in Nepal for corporate outings, school trips, and mid-sized group travel.",
    imgAlt: "coaster rental Nepal group travel",
  },
  "bus-rent": {
    title: `Bus Rental in Nepal | Large Group Bus Hire | ${business.name}`,
    metaDescription: `Book a bus rental in Nepal for weddings, corporate events, and large group tours. Comfortable, safe travel for 30+ passengers.`,
    h1: "Bus Rental in Nepal",
    h1Subtitle: "Book a bus rental in Nepal for weddings, events, and large group travel across the country.",
    imgAlt: "bus rental Nepal large group",
  },
  "premium-fleet": {
    title: `Premium Car Rental in Nepal | Luxury Vehicle Hire | ${business.name}`,
    metaDescription: `Hire a premium vehicle in Nepal for weddings, VIP travel, and corporate executives. Luxury, comfort, and professional chauffeur service.`,
    h1: "Premium Vehicle Rental in Nepal",
    h1Subtitle: "Hire a premium vehicle in Nepal for weddings, VIP travel, and corporate executives.",
    imgAlt: "premium luxury car rental Nepal",
  },
}

export async function generateStaticParams() {
  return (services as Service[]).map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = (services as Service[]).find(s => s.id === slug)
  if (!service) return { title: "Vehicle Not Found" }

  const seo = vehicleSeoMeta[slug] || {
    title: `${service.title} | ${business.name}`,
    metaDescription: service.details || service.description,
    h1: service.title,
    h1Subtitle: service.details || service.description,
    imgAlt: `${service.title} in Nepal`,
  }

  return {
    title: seo.title,
    description: seo.metaDescription,
    alternates: { canonical: `/vehicles/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_NP",
      url: `https://manoranjan.com.np/vehicles/${slug}`,
      siteName: business.name,
      title: seo.title,
      description: seo.metaDescription,
      images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: seo.imgAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.metaDescription,
      images: ["https://manoranjan.com.np/logo.jpg"],
    },
  }
}

export default async function VehicleCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = (services as Service[]).find(s => s.id === slug)
  if (!service) notFound()

  const otherServices = (services as Service[]).filter(s => s.id !== slug)
  const seo = vehicleSeoMeta[slug] || {
    title: `${service.title} | ${business.name}`,
    metaDescription: service.details || service.description,
    h1: service.title,
    h1Subtitle: service.details || service.description,
    imgAlt: `${service.title} in Nepal`,
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://manoranjan.com.np" },
      { "@type": "ListItem", position: 2, name: "Vehicles", item: "https://manoranjan.com.np/vehicles" },
      { "@type": "ListItem", position: 3, name: seo.h1, item: `https://manoranjan.com.np/vehicles/${slug}` },
    ]
  }

  const serviceData = {
    title: service.title,
    capacity: service.capacity,
    startingPrice: service.startingPrice,
    recommendedFor: service.recommendedFor,
    details: service.details || service.description,
    subServices: service.subServices,
    images: service.images || [],
  }

  return (
    <div className="w-full overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }} />

      {/* Vehicle Details + Top Hero Showcase & Compact Inquiry */}
      <VehicleDetailClient 
        slug={slug} 
        service={serviceData} 
        seoH1={seo.h1} 
        seoH1Subtitle={seo.h1Subtitle} 
      />

      {/* Other Vehicles */}
      {otherServices.length > 0 && (() => {
        const capacityOrder = ["car-rent", "suv-rent", "jeep-rent", "hiace-rent", "minibus-rent", "bus-rent", "premium-fleet"]
        const sorted = [...otherServices].sort((a, b) => capacityOrder.indexOf(a.id) - capacityOrder.indexOf(b.id))
        return (
          <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Other Vehicles</h2>
                <p className="text-sm text-slate-500">Find the perfect vehicle for every journey</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {sorted.map((s) => {
                  const SIcon = iconMap[s.icon] || MapIcon
                  const thumb = s.images?.[0]
                  return (
                    <Link
                      key={s.id}
                      href={`/vehicles/${s.id}`}
                      className="group bg-white rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
                    >
                      {thumb && (
                        <div className="relative h-32 sm:h-40 overflow-hidden">
                          <Image src={thumb} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          {s.startingPrice && (
                            <span className="absolute bottom-2 left-2 text-[10px] sm:text-xs font-bold text-white bg-primary/90 px-2 py-0.5 rounded-md">
                              From {s.startingPrice}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                            <SIcon className="h-3.5 w-3.5" />
                          </div>
                          <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 ml-9">{s.capacity}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })()}
    </div>
  )
}
