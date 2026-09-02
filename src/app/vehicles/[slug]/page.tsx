import type { Metadata } from "next"
import { notFound } from "next/navigation"
import services from "@/data/services.json"
import business from "@/data/business.json"
import { Car, Map as MapIcon, Mountain, Bus, Users, ShieldCheck, CheckCircle2 } from "lucide-react"
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

export async function generateStaticParams() {
  return (services as Service[]).map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = (services as Service[]).find(s => s.id === slug)
  if (!service) return { title: "Vehicle Not Found" }

  return {
    title: `${service.title} - ${business.name}`,
    description: service.details || service.description,
    alternates: { canonical: `/vehicles/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_NP",
      url: `https://manoranjan.com.np/vehicles/${slug}`,
      siteName: business.name,
      title: `${service.title} - ${business.name}`,
      description: service.details || service.description,
      images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: business.name }],
    },
  }
}

export default async function VehicleCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = (services as Service[]).find(s => s.id === slug)
  if (!service) notFound()

  const Icon = iconMap[service.icon] || MapIcon
  const otherServices = (services as Service[]).filter(s => s.id !== slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://manoranjan.com.np" },
      { "@type": "ListItem", position: 2, name: "Vehicles", item: "https://manoranjan.com.np/vehicles" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://manoranjan.com.np/vehicles/${slug}` },
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
    <div className="pt-20 pb-24 w-full overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }} />

      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {service.images && service.images[0] && (
            <Image src={service.images[0]} alt={service.title} fill className="object-cover" priority />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href="/vehicles" className="hover:text-primary transition-colors">Vehicles</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-primary border border-white/10">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold">{service.title}</h1>
                {service.capacity && (
                  <span className="text-sm font-bold text-white/60 uppercase tracking-wider">{service.capacity}</span>
                )}
              </div>
            </div>
            <p className="text-xl text-slate-300 leading-relaxed">{service.details}</p>
          </div>
        </div>
      </section>

      {/* Vehicle Details + Compact Inquiry */}
      <VehicleDetailClient slug={slug} service={serviceData} />

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
