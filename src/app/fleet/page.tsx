import type { Metadata } from "next"
import fleet from "@/data/fleet.json"
import business from "@/data/business.json"
import { Check, MessageCircle, Users, Luggage, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { buildWhatsAppUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Our Premium Fleet - Toyota & More",
  description: `Your ride across Nepal — Toyota Fortuner SUVs, BYD Atto 3 EV, Toyota Hiace & luxury buses. All 100% owned, meticulously maintained, with professional drivers.`,
  alternates: {
    canonical: "/fleet",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/fleet",
    siteName: business.name,
    title: `${business.name} - Premium Vehicle Fleet`,
    description: `Your ride across Nepal — Toyota Fortuner SUVs, BYD Atto 3 EV, Suzuki Brezza, Toyota Hiace & luxury tourist buses. 100% owned, meticulously maintained, professional drivers.`,
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
    title: `${business.name} - Premium Vehicle Fleet`,
    description: `Your ride across Nepal — Toyota Fortuner SUVs, BYD Atto 3 EV, Suzuki Brezza, Toyota Hiace & luxury tourist buses. 100% owned, meticulously maintained, professional drivers.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

export default function FleetPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://manoranjan.com.np/fleet" }
    ]
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "M.R Travel and Tour Vehicle Fleet",
    "description": "Our 100% owned fleet of premium vehicles for rent in Nepal",
    "numberOfItems": fleet.length,
    "itemListElement": fleet.map((vehicle, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Vehicle",
        "name": vehicle.name,
        "description": vehicle.description,
        "bodyType": vehicle.category,
        "numberOfPassengers": parseInt(vehicle.capacity.split('-')[0].split('+')[0]),
        "image": vehicle.image || undefined
      }
    }))
  }

  return (
    <div className="pt-20 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/fleet-bg.jpg" 
            alt="Fleet Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Premium Fleet</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We own 100% of our fleet, ensuring that every vehicle you book 
              meets our high standards for safety, cleanliness, and comfort. 
              All rentals include professional, trained drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Catalog */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {fleet.map((vehicle) => (
              <div 
                key={vehicle.id}
                className="group flex flex-col md:flex-row bg-slate-50 rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:w-1/2 relative bg-slate-200 aspect-[4/3] md:aspect-auto overflow-hidden">
                   {vehicle.image ? (
                     <Image 
                       src={vehicle.image} 
                       alt={vehicle.name}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-xl uppercase tracking-widest">
                       {vehicle.name}
                     </div>
                   )}
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <Shield className="h-3 w-3" />
                        {vehicle.category}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {vehicle.description}
                    </p>
                    
                    <div className="flex items-center gap-6 mb-8 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {vehicle.capacity}
                      </div>
                      <div className="flex items-center gap-2">
                        <Luggage className="h-4 w-4 text-primary" />
                        Premium Setup
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 py-2 px-3 rounded-lg bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest text-center">
                    Contact for more details and prices
                  </div>

                  <Link 
                    href={buildWhatsAppUrl(business.contact.whatsapp, `I'm interested in booking the ${vehicle.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Book This Vehicle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Info Banner */}
      <section className="container mx-auto px-4 mb-24">
        <div className="bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Driver Standards</h4>
              <p className="text-sm text-slate-300">
                All our drivers are trained, licensed, and have extensive experience 
                handling international tourists and navigating diverse terrains.
              </p>
            </div>
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Maintenance</h4>
              <p className="text-sm text-slate-300">
                Our vehicles undergo regular servicing and pre-trip inspections to 
                ensure maximum safety and zero breakdowns.
              </p>
            </div>
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Custom Rental</h4>
              <p className="text-sm text-slate-300">
                Need a vehicle for a specific duration or a special event like a wedding? 
                We offer flexible rental periods and decorations.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        </div>
      </section>
    </div>
  )
}
