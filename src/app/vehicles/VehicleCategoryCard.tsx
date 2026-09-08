"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Car, Map as MapIcon, Mountain, Bus, Users, ShieldCheck, ArrowRight } from "lucide-react"
import ImageSlideshow from "@/components/ui/ImageSlideshow"

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  Users,
  ShieldCheck,
}

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

interface VehicleCategoryCardProps {
  service: Service
  idx: number
}

export default function VehicleCategoryCard({ service, idx }: VehicleCategoryCardProps) {
  const router = useRouter()
  const Icon = iconMap[service.icon] || MapIcon

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    // If user clicked slideshow controls or an anchor tag, let that handle it
    if (target.closest("button") || target.closest("a")) {
      return
    }
    router.push(`/vehicles/${service.id}`)
  }

  return (
    <div
      id={service.id}
      onClick={handleCardClick}
      className="group flex flex-col lg:flex-row gap-6 lg:gap-12 items-stretch scroll-mt-32 border border-slate-200/80 hover:border-primary/40 bg-white hover:bg-slate-50/50 p-4 sm:p-7 rounded-2xl sm:rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Slideshow */}
      <div className="w-full lg:w-1/2 shrink-0">
        <div className="relative h-[240px] sm:h-[320px] lg:h-full min-h-[240px] sm:min-h-[300px] lg:min-h-[380px] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
          <ImageSlideshow
            images={service.images || []}
            priority={idx < 2}
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
        <div className="space-y-3.5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-11 w-11 sm:h-13 sm:w-13 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <Link 
                href={`/vehicles/${service.id}`}
                className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors block"
              >
                {service.title}
              </Link>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                {service.capacity && (
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    {service.capacity}
                  </span>
                )}
                {service.recommendedFor && (
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    {service.recommendedFor}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            {service.details || service.description}
          </p>

          {service.startingPrice && (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/70 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">Starting From</span>
              <span className="text-base sm:text-lg font-bold text-slate-900">{service.startingPrice}</span>
            </div>
          )}

          {service.subServices && Array.isArray(service.subServices[0]) && (
            <div className="space-y-1.5 pt-1">
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">Popular Use Cases</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(service.subServices as unknown as string[]).map((use, i) => (
                  <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button - Enquire Now navigates directly to vehicle detail page */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-start">
          <Link
            href={`/vehicles/${service.id}`}
            className="inline-flex h-11 sm:h-14 items-center justify-center rounded-xl sm:rounded-2xl bg-primary px-6 sm:px-10 text-xs sm:text-base font-bold text-white hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 group/btn"
          >
            <span>Enquire Now</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
