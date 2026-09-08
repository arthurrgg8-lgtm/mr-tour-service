import type { Metadata } from "next"
import Hero from "@/components/sections/Hero"
import WhyChooseSummary from "@/components/sections/WhyChooseSummary"
import Testimonials from "@/components/sections/Testimonials"
import ScrollAnimation from "@/components/ui/ScrollAnimation"
import Link from "next/link"
import Image from "next/image"
import { Phone, MessageCircle, Map as MapIcon, Car, Building2, Compass, ArrowRight } from "lucide-react"
import business from "@/data/business.json"
import services from "@/data/services.json"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"
import { FadeIn, HoverCard } from "@/components/ui/MotionComponents"

export const metadata: Metadata = {
  title: `Vehicle Rental in Nepal | Car, SUV, Jeep, Hiace, Coaster & Bus Rental | ${business.name}`,
  description: `${business.name} offers vehicle rental across Nepal — cars, SUVs, vans, and buses with safe, well-maintained fleet and easy booking.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np",
    siteName: business.name,
    title: `Vehicle Rental in Nepal | Car, SUV, Jeep, Hiace, Coaster & Bus Rental | ${business.name}`,
    description: `${business.name} offers vehicle rental across Nepal — cars, SUVs, vans, and buses with safe, well-maintained fleet and easy booking.`,
    images: [{ url: "/logo.jpg", width: 800, height: 800, alt: "vehicle rental service in Nepal" }],
  },
}

const rentalServices = [
  {
    title: "Rent with Driver",
    subtitle: "Chauffeur-Driven City & Highway Rides",
    desc: "Hire a well-maintained car, SUV, jeep, or bus with a licensed driver for city tours, airport transfers, and outstation trips across Nepal.",
    href: "/vehicles",
    icon: Car,
    badge: "Most Popular",
    image: "/images/home/rent-with-driver.png",
  },
  {
    title: "Corporate Rental",
    subtitle: "Enterprise Leasing & Staff Transport",
    desc: "Reliable vehicle rental plans for companies — weekly, monthly, and yearly fleet contracts with dedicated account managers.",
    href: "/corporate-rent",
    icon: Building2,
    badge: "B2B Solutions",
    image: "/images/home/corporate-rent.png",
  },
  {
    title: "Self-Drive",
    subtitle: "Drive Yourself Across Nepal",
    desc: "Take the wheel and explore Nepal at your own pace with our flexible, driverless car and SUV hire packages.",
    href: "/self-drive",
    icon: Compass,
    badge: "Full Freedom",
    image: "/images/home/self-drive.png",
  },
]

const popularDestinations = [
  {
    name: "Pokhara",
    desc: "Scenic lakeside city, adventure gateway, and Annapurna views.",
    time: "6-7 hrs from KTM",
    recommended: "SUV / Car / Hiace",
    image: "/images/hero/hero-nepal.jpeg",
  },
  {
    name: "Chitwan National Park",
    desc: "Wildlife safari, rhinos, jungle lodges, and Tharu culture.",
    time: "5-6 hrs from KTM",
    recommended: "Car / SUV / Hiace",
    image: "/images/hero/contact-bg.jpg",
  },
  {
    name: "Lumbini",
    desc: "Sacred birthplace of Lord Buddha and global peace monasteries.",
    time: "8-9 hrs from KTM",
    recommended: "SUV / Bus / Hiace",
    image: "/images/fleet/fleet-bg.jpg",
  },
  {
    name: "Mustang & Manang",
    desc: "Ancient high-altitude Himalayan kingdom and rugged mountain passes.",
    time: "Off-Road Expedition",
    recommended: "4WD Jeep Rental",
    image: "/images/fleet/why-choose-car.jpg",
  },
  {
    name: "Nagarkot & Dhulikhel",
    desc: "Panoramic sunrise Himalayan vistas and tranquil hill escapes.",
    time: "1.5 hrs from KTM",
    recommended: "Sedan / SUV",
    image: "/images/hero/hero-nepal.jpeg",
  },
  {
    name: "Bandipur",
    desc: "Preserved Newari hilltop heritage town with sweeping valley views.",
    time: "4-5 hrs from KTM",
    recommended: "Car / SUV",
    image: "/images/hero/contact-bg.jpg",
  },
]

const homepageFaqs = [
  {
    q: "What types of vehicles are available for rent in Nepal?",
    a: "We offer a 100% company-owned fleet including compact sedans, luxury SUVs (Toyota Fortuner, BYD EV), 4WD off-road Jeeps (Scorpio), 12-seater Toyota Hiace vans, 20+ seater Coaster buses, and 35+ seater luxury Sutlej coaches.",
  },
  {
    q: "How does the vehicle booking process work?",
    a: "Booking is simple and fast. Choose your vehicle, select your travel dates and route, and confirm online or via WhatsApp. Our team provides instant confirmation and coordinates driver details.",
  },
  {
    q: "Are one-way rental services available across Nepal?",
    a: "Yes! We provide one-way drop services between Kathmandu, Pokhara, Chitwan, Lumbini, Biratnagar, and major airports across Nepal.",
  },
  {
    q: "What is your fuel policy?",
    a: "Chauffeur-driven rentals typically include vehicle, fuel, driver allowance, and road tolls. For self-drive rentals, we offer both fuel-included and fuel-excluded options to match your preference.",
  },
  {
    q: "Do your vehicle rentals come with professional drivers?",
    a: "Yes, all our standard rentals include licensed, experienced, and background-checked drivers trained for Nepal's highways and mountain terrains. Self-drive options are also available for qualified drivers.",
  },
]

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      
      <Hero />

      {/* ─── PRIMARY SEO INTRO SECTION (Mobile & Desktop) ─── */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn direction="up" className="text-center">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Trusted Since 2003 • Government Certified
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Vehicle Rental Service in Nepal
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Rent cars, SUVs, vans, and buses across Nepal with {business.name}. Safe, well-maintained vehicles and easy online booking for every journey.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Choose Your Rental Service Section */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Flexible Rental Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Choose Your Rental Service
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-4 mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Select from Rent with Driver, Corporate Fleet, or Self-Drive — whatever suits your travel style and budget.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {rentalServices.map((srv, idx) => {
              const Icon = srv.icon
              return (
                <HoverCard key={idx} className="h-full">
                  <Link
                    href={srv.href}
                    className="relative h-full min-h-[380px] p-7 sm:p-8 rounded-3xl overflow-hidden border border-slate-700/60 shadow-lg hover:shadow-2xl hover:border-primary/60 transition-all flex flex-col justify-between group block cursor-pointer bg-slate-900 text-white"
                  >
                    {/* Background Image with Ambient Overlay */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={srv.image}
                        alt={srv.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/15" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 backdrop-blur-md">
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/20 border border-primary/30 px-3 py-1 rounded-full backdrop-blur-md">
                          {srv.badge}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs font-semibold text-primary mb-3">
                        {srv.subtitle}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                        {srv.desc}
                      </p>
                    </div>

                    <div
                      className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto pt-4 border-t border-white/10"
                    >
                      <span>Learn More &amp; Book</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                </HoverCard>
              )
            })}
          </div>
        </div>
      </section>

      <ScrollAnimation>
        <WhyChooseSummary />
      </ScrollAnimation>

      {/* Our Vehicle Fleet Preview Section */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Company-Owned Fleet
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Our Vehicle Fleet
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-4 mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From sedans to buses, explore a fleet built for city rides, hill routes, and long-distance travel.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((vehicle) => (
              <HoverCard key={vehicle.id}>
                <Link
                  href={`/vehicles/${vehicle.id}`}
                  className="rounded-3xl bg-slate-50 border border-slate-200/80 overflow-hidden group hover:border-primary/40 hover:shadow-lg transition-all flex flex-col h-full block cursor-pointer"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={vehicle.images?.[0] || "/images/hero/hero-nepal.jpeg"}
                      alt={`${vehicle.title} in Nepal`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {vehicle.capacity}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                        {vehicle.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">{vehicle.startingPrice}</span>
                      <div
                        className="text-xs font-bold text-slate-900 group-hover:text-primary flex items-center gap-1"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              </HoverCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
            >
              Explore Full Vehicle Fleet ({services.length} Categories) <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations We Serve Section */}
      <section className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Nationwide Coverage
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Popular Destinations We Serve
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-4 mb-4" />
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Travel confidently to Pokhara, Chitwan, Lumbini, and beyond with our reliable vehicle rental service.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((dest, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/20 px-2.5 py-0.5 rounded-full">
                    {dest.time}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {dest.desc}
                </p>
                <div className="text-[11px] text-slate-400 border-t border-white/10 pt-3 flex items-center justify-between">
                  <span>Recommended:</span>
                  <span className="font-semibold text-white">{dest.recommended}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ScrollAnimation>
        <Testimonials />
      </ScrollAnimation>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn direction="up" className="text-center mb-12 sm:mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Help &amp; Information
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-4 mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Quick answers on booking, fuel policy, vehicle types, and rental terms.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {homepageFaqs.map((faq, idx) => (
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

      {/* Map Section */}
      <ScrollAnimation>
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Visit Our Office</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Find Us in <br /> <span className="text-primary">Kathmandu</span></h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                       <MapIcon className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="font-bold text-lg">Our Location</p>
                       <p className="text-muted-foreground">{business.contact.location}</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                       <Phone className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="font-bold text-lg">Call Us</p>
                       <p className="text-muted-foreground">{business.contact.phone}</p>
                     </div>
                   </div>
                   <div className="p-6 rounded-2xl bg-white border border-slate-200">
                     <p className="text-sm font-medium text-slate-600 italic">&quot;We are available 24/7 at our office and online to assist with your travel needs across Nepal.&quot;</p>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-2 h-[250px] xs:h-[320px] sm:h-[450px] w-full rounded-3xl overflow-hidden border shadow-2xl relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.148671524317!2d85.3353!3d27.7118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x827102c6c7458d07%3A0x68a8193a22c56a7e!2sM.R%20Travel%20and%20Tour!5e0!3m2!1sen!2snp!4v1716000000000!5m2!1sen!2snp" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation>
        <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Contact us today for a personalized quote or to book your vehicle. 
            We are available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href={buildWhatsAppUrl(business.contact.whatsapp)}
              className="inline-flex items-center justify-center gap-3 h-14 px-10 rounded-xl bg-white text-primary font-bold text-lg hover:bg-slate-100 transition-all shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
              WhatsApp Us
            </Link>
            <Link 
              href={`tel:${business.contact.phone}`}
              className="inline-flex items-center justify-center gap-3 h-14 px-10 rounded-xl bg-primary-foreground/10 text-white font-bold text-lg border border-white/20 hover:bg-white/10 transition-all"
            >
              <Phone className="h-6 w-6" />
              Call Now
            </Link>
          </div>
        </div>
      </section>
      </ScrollAnimation>
    </>
  )
}
