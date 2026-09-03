import type { Metadata } from "next"
import business from "@/data/business.json"
import { Car, ShieldCheck, Clock, Phone, MessageCircle, CheckCircle2, ChevronDown, Compass, Lock, Wallet, Route } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"
import SelfDriveShowcase from "./SelfDriveShowcase"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionComponents"

export const metadata: Metadata = {
  title: "Self-Drive Car Rental in Nepal | Rent Cars & SUVs Without a Driver",
  description: `Self-drive car rental Nepal — rent cars, SUVs, and jeeps without a driver. Complete freedom, flexible duration, and 24/7 roadside support. Book online today.`,
  alternates: {
    canonical: "/self-drive",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/self-drive",
    siteName: business.name,
    title: `${business.name} - Self-Drive Car Rental Nepal`,
    description: `Self-drive car rental Nepal — rent cars, SUVs, and jeeps without a driver. Complete freedom, flexible duration, and 24/7 roadside support.`,
    images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} - Self-Drive Car Rental Nepal`,
    description: `Self-drive car rental Nepal — rent cars, SUVs, and jeeps without a driver. Complete freedom and 24/7 roadside support.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

const benefits = [
  {
    icon: Compass,
    title: "Complete Freedom",
    description: "Drive at your own pace, stop wherever you like, and explore Nepal without depending on a driver's schedule.",
  },
  {
    icon: Lock,
    title: "Privacy on Your Journey",
    description: "Enjoy your trip without a third person in the vehicle — ideal for families, couples, or solo travelers.",
  },
  {
    icon: Wallet,
    title: "Cost-Effective for Longer Trips",
    description: "Skip the daily chauffeur charge and save more on extended rentals or multi-day journeys.",
  },
  {
    icon: Route,
    title: "Learn Nepal's Roads Your Way",
    description: "Take detours, explore hidden spots, and experience the country at your own rhythm.",
  },
]

const reasons = [
  {
    icon: Car,
    title: "Wide Range of Well-Maintained Vehicles",
    description: "Choose from a fleet of reliable, regularly serviced cars and SUVs built for self-drive comfort.",
  },
  {
    icon: CheckCircle2,
    title: "Simple, Transparent Booking",
    description: "Book online in minutes with clear pricing — no hidden charges, no last-minute surprises.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Roadside Support",
    description: "Drive with confidence knowing our support team is available anytime, anywhere in Nepal.",
  },
  {
    icon: Clock,
    title: "Flexible Rental Duration",
    description: "From a single day to a full month, choose a rental period that fits your travel plan.",
  },
]

const faqs = [
  {
    q: "What documents do I need for self-drive car rental?",
    a: "You'll need a valid driving license, citizenship or passport (for foreign nationals), and a security deposit. These documents are required only for self-drive bookings, not chauffeur-driven rentals.",
  },
  {
    q: "What is the minimum age requirement for self-drive rental?",
    a: "Renters must be at least 21 years old and hold a valid driving license to book a self-drive vehicle.",
  },
  {
    q: "Is fuel included in self-drive rental?",
    a: "We offer both fuel-included and fuel-excluded packages for self-drive, though most customers choose the fuel-included option for convenience.",
  },
  {
    q: "Is there a mileage limit on self-drive rentals?",
    a: "Self-drive rentals come with a standard daily mileage limit; additional charges apply if you exceed it. Contact us for exact limits based on your rental duration.",
  },
  {
    q: "What happens if the vehicle breaks down or is involved in an accident?",
    a: "Our 24/7 support team assists with breakdowns and accidents. Insurance coverage details and your responsibility will be explained clearly at the time of booking.",
  },
  {
    q: "Can I take a self-drive rental outside Kathmandu Valley?",
    a: "Yes, self-drive rentals can be taken outside the valley, but some destinations may require prior approval — check with us before booking for out-of-valley trips.",
  },
]

export default function SelfDrivePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div className="pt-20 pb-24 w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/fleet/selfdrive-bg.jpg" 
            alt="Self Drive Car Rental Nepal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Self-Drive Rental</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Take the wheel yourself. Rent a car, SUV, or Jeep and explore Nepal 
              at your own pace — no driver needed, just pure freedom.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase: Slideshow + Quick Inquiry Form */}
      <SelfDriveShowcase />

      {/* Benefits of Self Drive */}
      <section className="py-24 bg-slate-50 scroll-mt-32">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Why Self Drive?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Benefits of Self Drive</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((item, i) => {
              const Icon = item.icon
              return (
                <StaggerItem key={i} className="flex items-start gap-5 p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Reasons to Choose Self Drive */}
      <section className="py-24 bg-white scroll-mt-32">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Why Us?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Reasons to Choose Self Drive</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {reasons.map((item, i) => {
              const Icon = item.icon
              return (
                <StaggerItem key={i} className="flex items-start gap-5 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Self Drive Rental FAQ */}
      <section className="py-24 bg-white scroll-mt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Got Questions?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Self Drive Rental FAQ</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </FadeIn>

          <SelfDriveFaqClient faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="max-w-2xl mx-auto bg-slate-900 rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden text-center">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Drive?</h3>
              <p className="text-slate-400 mb-8">
                Contact us to check availability and book your self-drive vehicle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={buildWhatsAppUrl(business.contact.whatsapp, "I'm interested in self-drive rental")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#20ba5a] transition-all"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp Us
                </Link>
                <a
                  href={`tel:${business.contact.phone}`}
                  className="flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all"
                >
                  <Phone className="h-5 w-5" /> Call Now
                </a>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

/* Client component for FAQ accordion */
function SelfDriveFaqClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <SelfDriveFaqAccordion faqs={faqs} />
}

function SelfDriveFaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details key={i} className="group rounded-xl border border-slate-200 overflow-hidden">
          <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
            <span className="font-bold text-sm sm:text-base text-slate-900 pr-4">{faq.q}</span>
            <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-slate-600 leading-relaxed">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  )
}
