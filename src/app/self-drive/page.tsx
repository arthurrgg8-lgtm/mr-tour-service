import type { Metadata } from "next"
import business from "@/data/business.json"
import { Car, ShieldCheck, Clock, Phone, MessageCircle, CheckCircle2, ChevronDown, Compass, Lock, Wallet, Route } from "lucide-react"
import Link from "next/link"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"
import SelfDriveShowcase from "./SelfDriveShowcase"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionComponents"

export const metadata: Metadata = {
  title: `Self Drive Car Rental in Nepal | Drive Yourself | ${business.name}`,
  description: `Rent a self-drive car in Nepal and explore at your own pace. Well-maintained vehicles, flexible rentals, and 24/7 support.`,
  alternates: {
    canonical: "/self-drive",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/self-drive",
    siteName: business.name,
    title: `Self Drive Car Rental in Nepal | Drive Yourself | ${business.name}`,
    description: `Rent a self-drive car in Nepal and explore at your own pace. Well-maintained vehicles, flexible rentals, and 24/7 support.`,
    images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: "self drive car rental Nepal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Self Drive Car Rental in Nepal | Drive Yourself | ${business.name}`,
    description: `Rent a self-drive car in Nepal and explore at your own pace. Well-maintained vehicles, flexible rentals, and 24/7 support.`,
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

const selfDrivePricing = [
  {
    tier: "Daily Self-Drive",
    rate: "From NPR 4,500 / day",
    desc: "Perfect for quick weekend trips, city errands, and day tours.",
    features: ["150 km daily allowance", "24/7 Roadside assistance", "Standard insurance coverage", "Full-to-full fuel policy"],
  },
  {
    tier: "Weekly Self-Drive",
    rate: "From NPR 28,000 / week",
    desc: "Ideal for road trips to Pokhara, Chitwan, or hill retreats.",
    features: ["Unlimited km in valley", "Discounted weekly pricing", "Free extra driver registration", "24/7 Priority support"],
  },
  {
    tier: "Monthly Flex Lease",
    rate: "Custom Quotation",
    desc: "Designed for expatriates, consultants, and extended Nepal stays.",
    features: ["Complimentary monthly maintenance", "Doorstep replacement vehicle", "Dedicated account manager", "Comprehensive zero-depreciation cover"],
  },
]

const documentsRequired = [
  {
    title: "Valid Driving License",
    desc: "National driving license (held for at least 1 year) or valid International Driving Permit (IDP) for foreign travelers.",
  },
  {
    title: "Identification Document",
    desc: "Nepali Citizenship card, Voter ID, or original Passport with valid Nepal entry visa for tourists.",
  },
  {
    title: "Refundable Security Deposit",
    desc: "Standard refundable security deposit via bank transfer, card pre-authorization, or cash receipt.",
  },
  {
    title: "No Paperwork for Chauffeur Rentals",
    desc: "If you choose a chauffeur-driven rental instead of self-drive, zero document verification is required.",
  },
]

const whereYouCanDrive = [
  {
    area: "Kathmandu Valley & Surrounding Hills",
    routes: "Nagarkot, Dhulikhel, Chandragiri, Godawari, Kakani",
    status: "Instant Access (All Vehicles)",
  },
  {
    area: "Prithvi Highway & Central Nepal",
    routes: "Kathmandu to Pokhara, Bandipur, Daman, Chitwan",
    status: "Highway Approved (Cars & SUVs)",
  },
  {
    area: "High-Altitude & Mountain Terrains",
    routes: "Upper Mustang, Manang, Rara Lake, Kalinchowk",
    status: "4WD Jeep Required & Prior Route Notice",
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
    <div className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      {/* Main Top Section: Heading + Slideshow + Quick Inquiry */}
      <SelfDriveShowcase />

      {/* Benefits of Self Drive */}
      <section className="py-24 bg-slate-50 scroll-mt-32">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Why Self Drive?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Benefits of Self Drive</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 max-w-2xl mx-auto text-base">Enjoy privacy, flexibility, and cost savings on longer journeys.</p>
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
                    <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Reasons to Choose Self Drive */}
      <section className="py-24 bg-white scroll-mt-32 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Why Us?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Reasons to Choose Self Drive</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 max-w-2xl mx-auto text-base">Well-maintained fleet, transparent booking, and 24/7 roadside support.</p>
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
                    <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Self Drive Rental Pricing */}
      <section className="py-24 bg-slate-50 scroll-mt-32 border-t border-slate-200/80">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Transparent Rates</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Self Drive Rental Pricing</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 max-w-2xl mx-auto text-base">Flexible daily, weekly, and monthly rates for every travel plan.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selfDrivePricing.map((price, idx) => (
              <Link
                key={idx}
                href={buildWhatsAppUrl(business.contact.whatsapp, `I want to book ${price.tier}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer block"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">{price.tier}</h3>
                  <p className="text-2xl font-black text-primary mb-4">{price.rate}</p>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">{price.desc}</p>
                  <ul className="space-y-3 mb-8 border-t border-slate-100 pt-6">
                    {price.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center group-hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  Book Package
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documents and Requirements & Where You Can Drive */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Documents */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Checklist</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Documents and Requirements for Self Drive</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Valid driving license and ID required — no paperwork for chauffeur-driven rentals.
              </p>
              <div className="space-y-4">
                {documentsRequired.map((doc, dIdx) => (
                  <div key={dIdx} className="p-4 rounded-xl bg-white border border-slate-100">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{doc.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Where You Can Drive */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Road Coverage</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Where You Can Drive Our Self Drive Vehicles</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Travel within Kathmandu Valley and select outstation routes with approval.
              </p>
              <div className="space-y-4">
                {whereYouCanDrive.map((route, rIdx) => (
                  <div key={rIdx} className="p-4 rounded-xl bg-white border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{route.area}</h3>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{route.status}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{route.routes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-24 bg-slate-50 scroll-mt-32 border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Got Questions?</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-base">Documents, age limit, fuel policy, mileage, breakdown support, and outstation travel.</p>
          </FadeIn>

          <SelfDriveFaqClient faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-slate-100">
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
