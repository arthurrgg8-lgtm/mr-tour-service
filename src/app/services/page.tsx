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
  title: "Vehicle Rental Services & Fleet",
  description: `Rent the best vehicles in Nepal — Toyota Fortuner, BYD Atto 3 EV, Suzuki Brezza & luxury buses. 100% owned fleet with professional drivers for any journey.`,
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
    <div className="pt-20 pb-24">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Premium Fleet</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {typedServices.map((service, idx) => {
              const Icon = iconMap[service.icon] || MapIcon
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="group flex flex-col gap-6 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 scroll-mt-32"
                >
                  {/* Header Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        <Icon className="h-6 w-6 md:h-7 md:w-7" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{service.title}</h2>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          {service.capacity && (
                            <div className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-primary" />
                              <span className="font-bold text-[10px] md:text-xs text-slate-600 uppercase tracking-wider">{service.capacity}</span>
                            </div>
                          )}
                          {service.recommendedFor && (
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                              <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-widest">{service.recommendedFor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {service.startingPrice && (
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">Starting From</span>
                        <span className="text-lg md:text-xl font-bold text-slate-900">{service.startingPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Visual Container */}
                  <div className="w-full relative h-[280px] md:h-[320px]">
                    <ImageSlideshow 
                      images={service.images || []} 
                      priority={idx < 2}
                    />
                  </div>

                  {/* Description & CTA */}
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed line-clamp-3 min-h-[4.5em]">
                      {service.details || service.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <EnquireButton>Book {service.title}</EnquireButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-24 bg-slate-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Request a Vehicle</h2>
            <p className="text-muted-foreground text-lg">Tell us your requirements and we will provide the best vehicle for your trip.</p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
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
