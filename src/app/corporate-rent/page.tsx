import type { Metadata } from "next"
import business from "@/data/business.json"
import { 
  ArrowRight, 
  Percent, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  FileText, 
  ShieldCheck, 
  Receipt, 
  RotateCcw, 
  Sparkles,
  UserCheck,
  TrendingUp,
  CreditCard,
  Headphones,
  ClipboardList,
  FileCheck2,
  Send
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"
import { FadeIn, StaggerContainer, StaggerItem, Float } from "@/components/ui/MotionComponents"

const corporateFaqs = [
  {
    q: "How does monthly billing and tax invoicing work for corporate accounts?",
    a: "We provide complete VAT-compliant monthly tax invoices, consolidated billing reports, and standardized digital payment options tailored for corporate accounting.",
  },
  {
    q: "Will we have a dedicated account manager?",
    a: "Yes. Every corporate contract is assigned a dedicated account coordinator available 24/7 to manage bookings, fleet scaling, route changes, and special requests.",
  },
  {
    q: "What is the minimum contract duration for corporate vehicle hire?",
    a: "We offer flexible weekly, monthly, and multi-year lease agreements. Short-term rentals are also available for corporate conferences, summits, and executive visits.",
  },
  {
    q: "Are the drivers background-checked and trained for corporate staff transport?",
    a: "Absolutely. All corporate drivers are licensed, background-checked, and trained in defensive driving, punctuality, and professional etiquette.",
  },
]

export const metadata: Metadata = {
  title: `Corporate Vehicle Rental in Nepal | Business Fleet Hire | ${business.name}`,
  description: `${business.name} offers corporate vehicle rental in Nepal with weekly, monthly, and yearly plans — reliable fleet for business travel and events.`,
  alternates: {
    canonical: "/corporate-rent",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/corporate-rent",
    siteName: business.name,
    title: `Corporate Vehicle Rental in Nepal | Business Fleet Hire | ${business.name}`,
    description: `${business.name} offers corporate vehicle rental in Nepal with weekly, monthly, and yearly plans — reliable fleet for business travel and events.`,
    images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: "corporate vehicle rental Nepal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Corporate Vehicle Rental in Nepal | Business Fleet Hire | ${business.name}`,
    description: `${business.name} offers corporate vehicle rental in Nepal with weekly, monthly, and yearly plans — reliable fleet for business travel and events.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

const howItWorksSteps = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Submit Requirements",
    description: "Share your company's vehicle and travel requirements with our team.",
  },
  {
    step: 2,
    icon: FileText,
    title: "Get a Custom Quote",
    description: "Receive a tailored quote based on your fleet size and rental duration.",
  },
  {
    step: 3,
    icon: FileCheck2,
    title: "Sign Agreement",
    description: "Confirm terms and sign a simple corporate rental agreement.",
  },
  {
    step: 4,
    icon: Send,
    title: "Vehicle Deployed",
    description: "Your vehicles are deployed and ready, on schedule, every time.",
  },
]

const rentalPlans = [
  {
    tag: "Flexible",
    duration: "Daily",
    title: "Daily Rental",
    desc: "Flexible day-to-day vehicle hire with professional drivers for business meetings, airport VIP pick-ups, client visits, and single-day executive movements.",
    features: ["On-demand booking", "Airport & city transfers", "Professional chauffeur", "Zero long-term commitment"],
  },
  {
    tag: "Popular",
    duration: "Weekly",
    title: "Weekly Rental",
    desc: "Cost-efficient weekly rental packages designed for project audits, visiting international consultants, multi-day seminars, and regional field assignments.",
    features: ["Discounted weekly rate", "Dedicated vehicle & driver", "Inter-district permit support", "Flexible extension option"],
  },
  {
    tag: "Cost-Effective",
    duration: "Monthly",
    title: "Monthly Lease",
    desc: "Dedicated monthly leases tailored for executive transport and ongoing company operations with scheduled maintenance, fuel tracking, and priority replacement.",
    features: ["Substantial cost savings", "Routine vehicle maintenance", "Guaranteed backup vehicle", "Itemized monthly billing"],
  },
  {
    tag: "Enterprise",
    duration: "Annually",
    title: "Annual Contract",
    desc: "Comprehensive long-term corporate contracts with brand-new vehicle allocation, SLA guarantees, dedicated fleet manager, and full tax-compliant invoicing.",
    features: ["Maximum volume savings", "Custom fleet mix", "Dedicated account manager", "Comprehensive SLA guarantees"],
  },
]

export default function CorporateRentPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": corporateFaqs.map(faq => ({
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
      {/* ─── 1. TOP EXECUTIVE HERO SECTION ─── */}
      <section className="relative pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-20 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up" className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] mb-6">
              Corporate Vehicle Rental <br />
              <span className="text-primary">in Nepal</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8 font-medium">
              Reliable vehicle rental for companies — weekly, monthly, and yearly plans across Nepal.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 max-w-3xl mx-auto">
              {[
                { icon: Receipt, label: "100% Tax & VAT Invoiced" },
                { icon: RotateCcw, label: "Instant Priority Replacement" },
                { icon: ShieldCheck, label: "Fully Insured & GPS Tracked" },
                { icon: Sparkles, label: "Custom Service Agreements" },
              ].map((badge, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs text-xs font-bold text-slate-700 hover:border-primary/30 transition-colors"
                >
                  <badge.icon className="h-3.5 w-3.5 text-primary" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-primary text-white font-black text-sm sm:text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 uppercase tracking-wider group"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={buildWhatsAppUrl(business.contact.whatsapp, "Hello, I would like to request a corporate vehicle rental quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp Desk</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 2. WHY CORPORATES CHOOSE US (3-Column Showcase with BYD Car) ─── */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Enterprise Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Why Corporates Choose Us
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dedicated support, billing transparency, and fleet flexibility for business needs.
            </p>
          </FadeIn>

          {/* 3-Column Layout Matching Homepage with Center BYD Vehicle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* Left Column: 2 Features */}
            <FadeIn direction="right" delay={0.1} className="lg:col-span-4 space-y-8 sm:space-y-10">
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <UserCheck className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    Dedicated Point of Contact
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A single dedicated account manager handles your bookings, ensuring fast communication and consistent, reliable service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    Fleet Flexibility
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Scale your vehicle fleet up or down anytime, with a wide range of options suited to your changing business needs.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Center Column: Studio BYD Electric SUV + 24/7 Support Below */}
            <FadeIn direction="up" delay={0.2} className="lg:col-span-4 flex flex-col items-center justify-center py-4 lg:py-0">
              <Float duration={5} distance={10} className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] flex items-center justify-center">
                  <Image
                    src="/images/fleet/why-choose-car.jpg"
                    alt="corporate vehicle rental Nepal"
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </Float>

              {/* 24/7 Support Just Below Car Pic */}
              <div className="mt-2 w-full max-w-xs p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center hover:bg-white hover:border-primary/30 hover:shadow-md transition-all">
                <div className="h-11 w-11 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mb-2 shadow-md shadow-primary/20">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  24/7 Support
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Round-the-clock customer support keeps your corporate travel running smoothly, any time, any day.
                </p>
              </div>
            </FadeIn>

            {/* Right Column: 2 Features */}
            <FadeIn direction="left" delay={0.3} className="lg:col-span-4 space-y-8 sm:space-y-10">
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300 lg:order-last">
                  <CreditCard className="h-7 w-7" />
                </div>
                <div className="lg:text-right">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    Invoicing and Billing Support
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Transparent monthly invoicing and dedicated billing support make corporate accounting simple and hassle-free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300 lg:order-last">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div className="lg:text-right">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    Licensed, Insured Driver and Vehicle
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every driver is licensed and every vehicle fully insured, ensuring safe, compliant travel for your team.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 3. HOW TO REQUEST A CORPORATE QUOTE (4 Step Process) ─── */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              How to Request a Corporate Quote
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Share your requirements and get a custom quote from our team.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howItWorksSteps.map((step) => {
              const Icon = step.icon
              return (
                <StaggerItem 
                  key={step.step}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center relative group"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary text-white font-black text-lg flex items-center justify-center mb-5 shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">
                    Step 0{step.step}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── 5. CORPORATE RENTAL PLANS SECTION ─── */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Structured For Your Schedule
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Corporate Rental Plans (Weekly / Monthly / Yearly)
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Weekly, monthly, and yearly options tailored to your company&apos;s requirements.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rentalPlans.map((plan, idx) => (
              <StaggerItem 
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      {plan.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    {plan.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {plan.desc}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-2">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── 6. IDEAL USE CASES & FLEET OPTIONS FOR BUSINESS NEEDS ─── */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Application Scenarios</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Ideal Use Cases</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Staff transport, client travel, event logistics, and corporate outings.
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Daily Staff Transport</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">Punctual daily employee commute shuttles across Kathmandu Valley with route tracking.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Executive &amp; VIP Delegation Travel</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">Luxury Toyota Fortuner and BYD electric vehicles for visiting executives and diplomats.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Events, Summits &amp; Annual Outings</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">Coaster and luxury tourist buses coordinated for team-building retreats and conferences.</p>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Fleet Availability</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Fleet Options for Business Needs</h2>
              <div className="w-16 h-1 bg-primary rounded-full mb-6" />
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Sedans, SUVs, and vans available for every corporate travel scenario.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">Executive Sedans</span>
                  <span className="text-slate-600">City meetings &amp; airport VIP pick-ups</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">Premium SUVs</span>
                  <span className="text-slate-600">Inter-city travel &amp; site inspections</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">Toyota Hiace Vans</span>
                  <span className="text-slate-600">Project teams &amp; group field visits</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-100">
                  <span className="font-bold text-slate-900 block mb-1">Tourist &amp; Mini Buses</span>
                  <span className="text-slate-600">Conferences, AGMs &amp; corporate retreats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FREQUENTLY ASKED QUESTIONS ─── */}
      <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Corporate FAQ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Billing, account management, minimum duration, and staff transport drivers.
            </p>
          </FadeIn>

          <div className="space-y-4">
            {corporateFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-6 rounded-2xl bg-white border border-slate-200/80 open:border-primary/30 open:shadow-md transition-all cursor-pointer"
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

      {/* ─── 8. BULK / FLEET VOLUME DISCOUNT DISCLOSURE ─── */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn direction="up" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Percent className="h-3.5 w-3.5" />
                  <span>Bulk &amp; Multi-Vehicle Discount Policy</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                  Booking Multiple Vehicles? Special Fleet Discounts Apply
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  If your organization requires multiple vehicles for large conferences, international summits, 
                  nationwide NGO project rollouts, or regular employee shuttle routes, we provide 
                  <strong> tiered volume discounts</strong> and customized service agreements tailored to your fleet scale.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-[#00E53A] shrink-0" />
                    <span>Multi-vehicle booking discounts</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-[#00E53A] shrink-0" />
                    <span>Dedicated corporate coordinator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-[#00E53A] shrink-0" />
                    <span>Custom tax-compliant VAT billing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-[#00E53A] shrink-0" />
                    <span>Instant priority replacement backup</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary/90 transition-all uppercase tracking-wider text-center shadow-lg shadow-primary/20"
                >
                  <FileText className="h-4 w-4" />
                  <span>Request Bulk Quote</span>
                </Link>

                <Link
                  href={buildWhatsAppUrl(business.contact.whatsapp, "Hello, I am inquiring about corporate bulk fleet booking discounts.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba5a] transition-all uppercase tracking-wider text-center"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Corporate Desk</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 9. BOTTOM CONTACT / CTA BAR ─── */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <FadeIn direction="up" className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">
            Direct Corporate Desk
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Need a Custom RFP or Official Proposal?
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Our corporate accounts team is ready to draft custom agreements, schedule site inspections, and provide immediate quotations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all uppercase tracking-wider"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`tel:${business.contact.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>{business.contact.phone}</span>
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
