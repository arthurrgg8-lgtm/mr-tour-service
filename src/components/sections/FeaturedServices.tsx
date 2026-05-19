"use client"

import { Car, Map as MapIcon, Mountain, Bus, ShieldCheck, Users } from "lucide-react"
import services from "@/data/services.json"
import Link from "next/link"

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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a comprehensive range of travel services tailored to your needs, 
            with a primary focus on quality vehicle rentals and curated tours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {featured.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <div 
                key={service.id}
                className="group p-8 md:p-10 rounded-[2rem] border bg-slate-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  {service.description}
                </p>
                <Link 
                  href={`/services#${service.id}`} 
                  className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary pb-1"
                >
                  Explore Details <span aria-hidden="true">→</span>
                </Link>
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
