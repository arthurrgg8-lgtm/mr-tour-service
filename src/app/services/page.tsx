import type { Metadata } from "next"
import services from "@/data/services.json"
import business from "@/data/business.json"
import { Car, Map as MapIcon, Mountain, Bus, Users } from "lucide-react"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import EnquireButton from "@/components/ui/EnquireButton"
import ImageSlideshow from "@/components/ui/ImageSlideshow"
import DestinationsGrid from "@/components/sections/DestinationsGrid"

interface SubService {
  name: string;
  image: string;
  duration?: string;
  startingPrice?: string;
}

interface Region {
  name: string;
  image: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  images?: string[];
  featured: boolean;
  details: string;
  capacity?: string;
  startingPrice?: string;
  recommendedFor?: string;
  subServices?: SubService[];
  regions?: Region[];
}

export const metadata: Metadata = {
  title: "Vehicle Rental & Travel Services in Nepal",
  description: `Top-rated vehicle rental & travel services in Nepal — Toyota Fortuner 4x4, BYD EV, Toyota Hiace & luxury tourist buses. 100% company-owned fleet with verified drivers.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/services",
    siteName: business.name,
    title: `${business.name} - Vehicle Rental Services & Fleet`,
    description: `Rent the best vehicles in Nepal — Toyota Fortuner, BYD Atto 3 EV, luxury buses & more. 100% company-owned fleet with professional drivers for any journey.`,
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
    title: `${business.name} - Vehicle Rental Services & Fleet`,
    description: `Rent the best vehicles in Nepal — Toyota Fortuner, BYD Atto 3 EV, luxury buses & more. 100% company-owned fleet with professional drivers for any journey.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

const typedServices = (services as Service[]).filter(s => s.id !== 'tour-packages' && s.id !== 'trekking');

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  Users
}

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://manoranjan.com.np/services" }
    ]
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What vehicles does M.R Travel and Tour offer for rent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a 100% owned fleet including Toyota Fortuner (6+1 seater 4x4 SUV), BYD Atto 3 EV (5+1 seater luxury electric SUV), Maruti Suzuki Brezza (5+1 seater SUV), Toyota Hiace (12+1 seater minibus), luxury tourist buses (30-40 seater), Scorpio (6+1 seater 4x4), and pickup trucks for cargo. All vehicles come with professional drivers."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide drivers with the rental vehicles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our vehicle rentals include a professional, trained driver. Our drivers are experienced, licensed, and know Nepal's roads and routes thoroughly, ensuring a safe and comfortable journey."
        }
      },
      {
        "@type": "Question",
        "name": "Can I rent a vehicle for multiple days or long-distance trips?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We offer flexible rental periods from single-day city trips to multi-week expeditions across Nepal. Whether you need a vehicle for Pokhara, Chitwan, Lumbini, or mountain regions, we can arrange it."
        }
      },
      {
        "@type": "Question",
        "name": "What areas of Nepal do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve all of Nepal including Kathmandu Valley, Pokhara, Chitwan, Lumbini, Mustang, Manang, Dolpo, and all trekking trailheads. Our fleet is equipped for both city roads and challenging mountain terrain."
        }
      }
    ]
  }

  return (
    <div className="pt-20 pb-24 w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/services-bg.jpg" 
            alt="Vehicle Fleet Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Vehicle Rental & Travel Services</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Experience comfort and safety with our 100% owned vehicle fleet. 
              From luxury SUVs for mountain adventures to comfortable buses for group travel, 
              we have the perfect ride for your journey in Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 sm:gap-12 lg:gap-16">
            {typedServices.map((service, idx) => {
              const Icon = iconMap[service.icon] || MapIcon
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="group flex flex-col gap-3 sm:gap-6 p-3 xs:p-4 sm:p-8 rounded-[1.25rem] sm:rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 scroll-mt-32"
                >
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="h-8 w-8 sm:h-14 sm:w-14 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5 shrink-0">
                        <Icon className="h-4 w-4 sm:h-7 sm:w-7" />
                      </div>
                      <div>
                        <h2 className="text-xs xs:text-sm sm:text-2xl font-bold tracking-tight line-clamp-1">{service.title}</h2>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-1 sm:mt-1.5">
                          {service.capacity && (
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                              <span className="font-bold text-[8px] sm:text-xs text-slate-600 uppercase tracking-wider">{service.capacity}</span>
                            </div>
                          )}
                          {service.recommendedFor && (
                            <div className="hidden xs:flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                              <span className="font-bold text-[8px] sm:text-[10px] uppercase tracking-wider">{service.recommendedFor}</span>
                            </div>
                          )}
                        </div>
                        {/* Mobile Starting Price */}
                        {service.startingPrice && (
                          <div className="sm:hidden mt-1.5">
                            <span className="text-[8px] font-bold uppercase tracking-widest text-primary block leading-none">Starting From</span>
                            <span className="text-[10px] xs:text-xs font-bold text-slate-900 leading-tight block mt-0.5">{service.startingPrice}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {service.startingPrice && (
                      <div className="hidden sm:block text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">Starting From</span>
                        <span className="text-xl font-bold text-slate-900 leading-tight block mt-0.5">{service.startingPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Visual Container */}
                  <div className="w-full relative h-[140px] xs:h-[180px] sm:h-[320px]">
                    <ImageSlideshow 
                      images={service.images || []} 
                      priority={idx < 2}
                    />
                  </div>

                  {/* Description & CTA */}
                  <div className="space-y-3 sm:space-y-6 flex flex-col flex-grow">
                    <p className="text-slate-600 leading-snug sm:leading-relaxed line-clamp-2 text-[10px] xs:text-xs sm:text-base mb-2 sm:mb-0">
                      {service.details || service.description}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-4 mt-auto">
                      <EnquireButton>Book {service.title.split(" ")[0]}</EnquireButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-12 sm:py-24 bg-slate-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">Request a Vehicle</h2>
            <p className="text-xs xs:text-sm sm:text-lg text-muted-foreground">Tell us your requirements and we will provide the best vehicle for your trip.</p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 sm:py-32 bg-slate-900 text-white overflow-hidden relative">
        {/* Background Map with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/nepal-map.jpg" 
            alt="Nepal Map"
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-slate-900" />
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -ml-64 -mb-64" />

        <DestinationsGrid />
      </section>
    </div>
  )
}
