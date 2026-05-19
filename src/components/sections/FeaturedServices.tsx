"use client"

import { Car, Map as MapIcon, Mountain, Bus, ShieldCheck, Users } from "lucide-react"
import services from "@/data/services.json"
import Link from "next/link"
import Image from "next/image"

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  ShieldCheck,
  Users
}

export default function FeaturedServices() {
  const featured = services.filter(s => s.featured)

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We provide a comprehensive range of travel services tailored to your needs, 
            with a primary focus on quality vehicle rentals and curated tours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featured.map((service) => {
            const Icon = iconMap[service.icon]
            // Use the first image from the service's image array as a representative image
            const representativeImage = service.images?.[0] || "/images/hero/services-bg.jpg"

            return (
              <div 
                key={service.id}
                className="group flex flex-col rounded-[2rem] border bg-slate-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                {/* Image Section */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image 
                    src={representativeImage}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-6 h-12 w-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <div className="mt-auto">
                    <Link 
                      href={service.id === 'tour-packages' ? '/tours' : service.id === 'trekking' ? '/trekking' : `/services#${service.id}`} 
                      className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary pb-1"
                    >
                      Explore Details <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/services"
            className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-primary px-8 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
