import type { Metadata } from "next"
import services from "@/data/services.json"
import business from "@/data/business.json"
import ImageSlideshow from "@/components/ui/ImageSlideshow"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import VehicleCategoryCard from "./VehicleCategoryCard"
import { safeJsonLdStringify } from "@/lib/utils"

const FLEET_SHOWCASE_IMAGES = [
  "/images/services/car/carent-4.jpeg",
  "/images/services/suv/suv.jpeg",
  "/images/services/jeep/JEEP3.jpeg",
  "/images/services/hiace/hiace-full.jpeg",
  "/images/services/bus/sutlej-bus-1.jpeg",
]

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
  title: `Our Fleet | Cars, SUVs, Vans & Buses for Rent in Nepal`,
  description: `Browse our full fleet of rental vehicles in Nepal — sedans, SUVs, jeeps, vans, and buses. Safe, reliable, and available for every trip.`,
  alternates: {
    canonical: "/vehicles",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/vehicles",
    siteName: business.name,
    title: `Our Fleet | Cars, SUVs, Vans & Buses for Rent in Nepal`,
    description: `Browse our full fleet of rental vehicles in Nepal — sedans, SUVs, jeeps, vans, and buses. Safe, reliable, and available for every trip.`,
    images: [
      {
        url: "https://manoranjan.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: "car, SUV, and bus rental fleet Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Fleet | Cars, SUVs, Vans & Buses for Rent in Nepal`,
    description: `Browse our full fleet of rental vehicles in Nepal — sedans, SUVs, jeeps, vans, and buses. Safe, reliable, and available for every trip.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}


const fleetFaqs = [
  {
    q: "What types of vehicles do you offer for rental in Nepal?",
    a: "We offer a range of rental vehicles including cars, SUVs, Hiace, Coaster and buses for individual, family, corporate and group travel across Nepal.",
  },
  {
    q: "Do you provide cars with professional drivers?",
    a: "Yes. We provide car rental with professional drivers for airport transfers, sightseeing, business travel, family trips and long-distance journeys.",
  },
  {
    q: "Can I rent a car for airport pickup and drop-off?",
    a: "Yes. We provide airport transfer services from Kathmandu airport to your hotel, residence or other destinations, as well as airport drop-off services.",
  },
  {
    q: "Can I rent a vehicle for travel outside Kathmandu?",
    a: "Yes. Our vehicles are available for travel from Kathmandu to Pokhara, Chitwan, Lumbini, Nagarkot, Mustang and other destinations across Nepal, subject to availability.",
  },
  {
    q: "Do you offer self-drive car rental in Nepal?",
    a: "Yes, self-drive rental options are available for selected vehicles, subject to our rental terms, documentation and availability.",
  },
  {
    q: "How much does car rental in Nepal cost?",
    a: "Starting from 5000 NPR , Rental prices depend on the vehicle type, rental duration, destination, mileage and whether a driver is required or not. Contact us for the latest quotation.",
  },
  {
    q: "Can I rent a vehicle for several days?",
    a: "Yes. We provide short-term and multi-day vehicle rental options based on your travel requirements.",
  },
  {
    q: "Do you provide vehicles for corporate and business travel?",
    a: "Yes. We provide vehicle rental and transportation solutions for companies, organizations, business trips, meetings, events and corporate travel.",
  },
  {
    q: "How can I book a rental vehicle?",
    a: "You can contact Manoranjan by phone or WhatsApp with your travel date, pickup location, destination and preferred vehicle. Our team will provide availability and pricing.",
  },
  {
    q: "How early should I book a vehicle?",
    a: "We recommend booking as early as possible, especially during peak travel seasons, holidays and busy periods, to ensure your preferred vehicle is available.",
  },
]

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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": fleetFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      
      {/* 1. Vehicle Categories (Directly at the top) */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm block mb-2">
              Chauffeur Driven Fleet
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Vehicle Rental Fleet in Nepal
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Explore our range of cars, SUVs, jeeps, vans, and luxury buses available with professional drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:gap-12">
            {typedServices.map((service, idx) => (
              <VehicleCategoryCard 
                key={service.id} 
                service={service} 
                idx={idx} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Showcase Slideshow & Quick Inquiry Form Section (Moved below vehicle categories) */}
      <section id="inquiry-form" className="relative bg-slate-900 text-white py-16 sm:py-20 overflow-hidden scroll-mt-16">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary block mb-2 font-mono">
              Rent with Driver • 100% Owned Fleet
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-3 text-white tracking-tight leading-tight">
              Explore Our Vehicle Rental Fleet in Nepal
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Browse cars, SUVs, jeeps, vans, and buses — all available for rent across Nepal with flexible booking options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image Slideshow & Fleet Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="relative h-[280px] xs:h-[320px] sm:h-[450px] md:h-[480px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <ImageSlideshow images={FLEET_SHOWCASE_IMAGES} priority={false} />
              </div>

              {/* Mobile-only Quick Inquiry (Right below image) */}
              <div className="lg:hidden">
                <ServiceInquiryForm initialType="Rental" initialVehicleType="Car" allowedTypes={["Rental"]} compact />
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary block">Chauffeur Fleet</span>
                  <span className="text-base sm:text-lg font-bold text-white">Cars, SUVs, Jeeps, Vans &amp; Luxury Buses</span>
                </div>
                <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                  Instant Confirmation
                </span>
              </div>
            </div>

            {/* Right Column: Desktop Sticky Quick Inquiry */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <ServiceInquiryForm initialType="Rental" initialVehicleType="Car" allowedTypes={["Rental"]} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Fleet Stands Out & How to Choose the Right Vehicle */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Why Our Fleet Stands Out</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-slate-600 leading-relaxed mb-6">
                Every vehicle is regularly maintained, safety-inspected, and ready for the road. We operate 100% company-owned vehicles to guarantee pristine cleanliness, comprehensive insurance coverage, and seasoned local chauffeurs.
              </p>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">✓ 100% Company-Owned Vehicles</li>
                <li className="flex items-center gap-2">✓ Mandatory Pre-Trip Safety &amp; AC Inspection</li>
                <li className="flex items-center gap-2">✓ Verified, Background-Checked Mountain Drivers</li>
                <li className="flex items-center gap-2">✓ 24/7 Rapid Replacement Roadside Backup</li>
              </ul>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">How to Choose the Right Vehicle</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-slate-600 leading-relaxed mb-6">
                Match your group size, route, and budget to find the perfect rental vehicle. Whether it is a compact car for Kathmandu heritage sites, a 4WD Scorpio for Upper Mustang, or a luxury Hiace for family tours, we have the ideal option.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">1-4 Passengers:</span>
                  <span className="text-slate-600">Sedan / SUV for city and short highway getaways</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">4-7 Passengers:</span>
                  <span className="text-slate-600">4WD Scorpio / Land Cruiser for off-road trails</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">7-14 Passengers:</span>
                  <span className="text-slate-600">Toyota Hiace Super GL for comfortable group tours</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">15-35+ Passengers:</span>
                  <span className="text-slate-600">Coaster &amp; Luxury Tourist Coaches for large groups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Fleet Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-sm sm:text-base">
              Common questions on vehicle types, pricing, and driver availability.
            </p>
          </div>

          <div className="space-y-4">
            {fleetFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/80 open:bg-white open:border-primary/30 open:shadow-md transition-all cursor-pointer"
              >
                <summary className="font-bold text-base sm:text-lg text-slate-900 list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform text-sm font-black">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
