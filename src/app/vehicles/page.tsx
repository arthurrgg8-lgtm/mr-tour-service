import type { Metadata } from "next"
import services from "@/data/services.json"
import business from "@/data/business.json"
import { Car, Map as MapIcon, Mountain, Bus, Users, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import EnquireButton from "@/components/ui/EnquireButton"
import ImageSlideshow from "@/components/ui/ImageSlideshow"
import { FadeIn } from "@/components/ui/MotionComponents"
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

export const metadata: Metadata = {
  title: "Vehicle Rental Fleet in Nepal",
  description: `Rent premium vehicles in Nepal — Toyota Fortuner 4x4, BYD EV, Toyota Hiace & luxury tourist buses. 100% company-owned fleet with verified drivers.`,
  alternates: {
    canonical: "/vehicles",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/vehicles",
    siteName: business.name,
    title: `${business.name} - Vehicle Rental Fleet`,
    description: `Rent the best vehicles in Nepal — Toyota Fortuner, BYD Atto 3 EV, luxury buses & more. 100% company-owned fleet with professional drivers.`,
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
    title: `${business.name} - Vehicle Rental Fleet`,
    description: `Rent the best vehicles in Nepal — Toyota Fortuner, BYD Atto 3 EV, luxury buses & more. 100% company-owned fleet with professional drivers.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  Users,
  ShieldCheck,
}

export default function VehiclesPage() {
  const typedServices = (services as Service[])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://manoranjan.com.np" },
      { "@type": "ListItem", position: 2, name: "Vehicles", item: "https://manoranjan.com.np/vehicles" }
    ]
  }

  return (
    <div className="pt-20 pb-24 w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/fleet/fleet-bg.jpg" 
            alt="Vehicle Fleet Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Vehicle Fleet</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              100% company-owned fleet of premium vehicles. From compact cars for city rides 
              to luxury buses for large groups — every vehicle comes with a professional, trained driver.
            </p>
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {typedServices.map((service, idx) => {
              const Icon = iconMap[service.icon] || MapIcon
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="group flex flex-col lg:flex-row gap-8 lg:gap-16 items-start scroll-mt-32"
                >
                  {/* Image Slideshow */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative h-[250px] sm:h-[350px] lg:h-[450px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
                      <ImageSlideshow 
                        images={service.images || []} 
                        priority={idx < 2}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">{service.title}</h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                          {service.capacity && (
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{service.capacity}</span>
                          )}
                          {service.recommendedFor && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">{service.recommendedFor}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-sm sm:text-lg">
                      {service.details || service.description}
                    </p>

                    {service.startingPrice && (
                      <div className="inline-flex items-center gap-2 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Starting From</span>
                        <span className="text-lg sm:text-xl font-bold text-slate-900">{service.startingPrice}</span>
                      </div>
                    )}

                    {service.subServices && Array.isArray(service.subServices[0]) && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Use Cases</h4>
                        <div className="flex flex-wrap gap-2">
                          {(service.subServices as unknown as string[]).map((use, i) => (
                            <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <Link 
                        href={`/vehicles/${service.id}`}
                        className="inline-flex h-14 items-center justify-center rounded-xl bg-primary/5 border border-primary/10 px-8 text-sm font-bold text-primary hover:bg-primary/10 transition-all"
                      >
                        View Full Details →
                      </Link>
                      <EnquireButton>Enquire Now</EnquireButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
