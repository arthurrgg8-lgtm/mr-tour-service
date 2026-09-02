"use client"

import { useState } from "react"
import { CheckCircle2, ChevronDown, HelpCircle, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import ImageSlideshow from "@/components/ui/ImageSlideshow"
import vehicleFaqs from "@/data/vehicle-faqs.json"
import vehicleSeo from "@/data/vehicle-seo.json"

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionComponents"

interface SeoPoint { title: string; description: string }
interface SeoStep { step: number; title: string; description: string }
interface SeoRoute { name: string; duration: string; highlight: string }
interface VehicleSeo {
  whyRentWithUs: { headline: string; description: string; points: SeoPoint[] }
  howItWorks: { headline: string; steps: SeoStep[] }
  popularRoutes: { headline: string; routes: SeoRoute[] }
}

interface VehicleDetailProps {
  slug: string
  service: {
    title: string
    capacity?: string
    startingPrice?: string
    recommendedFor?: string
    details: string
    subServices?: unknown[]
    images: string[]
  }
}

interface FaqItem {
  q: string
  a: string
}

interface FaqData {
  title: string
  questions: FaqItem[]
}

export default function VehicleDetailClient({ slug, service }: VehicleDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const faqData = (vehicleFaqs as Record<string, FaqData>)[slug]
  const seo = (vehicleSeo as Record<string, VehicleSeo>)[slug]

  return (
    <>
      {/* Top Section: Showcase (Image & Details) + Sticky Quick Inquiry */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Images + Info */}
            <FadeIn direction="up" className="lg:col-span-8 space-y-8">
              {/* Image Slideshow */}
              <div className="relative h-[320px] sm:h-[450px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
                <ImageSlideshow images={service.images} priority />
              </div>

              {/* Price Bar */}
              {service.startingPrice && (
                <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary block">Starting From</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">{service.startingPrice}</span>
                  </div>
                  {service.recommendedFor && (
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-xl">
                      {service.recommendedFor}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">About This Vehicle</h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{service.details}</p>
              </div>

              {/* Use Cases & Standard Inclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.subServices && Array.isArray(service.subServices[0]) && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <h3 className="text-lg font-bold mb-4 text-slate-900">Best Used For</h3>
                    <div className="space-y-2.5">
                      {(service.subServices as unknown as string[]).map((use, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{use}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="text-lg font-bold mb-4 text-primary">All Vehicles Include</h3>
                  <div className="space-y-2.5">
                    {["Professional Driver", "Full Insurance", "24/7 Support", "Clean & Maintained"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right: Sticky Quick Inquiry */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <FadeIn direction="left" delay={0.1}>
                  <ServiceInquiryForm initialType="Rental" allowedTypes={["Rental"]} compact />
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH SECTIONS (Spanning 100% of container width) ─── */}

      {seo && (
        <>
          {/* 1. Why Rent With Us (Full Width 4-column / 2-column grid) */}
          <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4">
              <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">Why Choose Us</span>
                <h2 className="text-2xl sm:text-4xl font-bold mb-4">{seo.whyRentWithUs.headline}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{seo.whyRentWithUs.description}</p>
              </FadeIn>

              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {seo.whyRentWithUs.points.map((point, i) => (
                  <StaggerItem key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mb-4">
                      0{i + 1}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{point.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{point.description}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* 2. How It Works (Full Width 4-step flow) */}
          <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4">
              <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">Simple Booking</span>
                <h2 className="text-2xl sm:text-4xl font-bold mb-4">{seo.howItWorks.headline}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              </FadeIn>

              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {seo.howItWorks.steps.map((step) => (
                  <StaggerItem key={step.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center relative group hover:bg-primary/5 hover:border-primary/20 transition-all">
                    <div className="h-14 w-14 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                      0{step.step}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* 3. Popular Routes (Full Width 3-column / 2-column grid) */}
          <section className="py-20 sm:py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4">
              <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">Top Destinations</span>
                <h2 className="text-2xl sm:text-4xl font-bold mb-4">{seo.popularRoutes.headline}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
              </FadeIn>

              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {seo.popularRoutes.routes.map((route, i) => (
                  <StaggerItem key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-base mb-1">{route.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-primary font-bold mb-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{route.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{route.highlight}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </>
      )}

      {/* 4. FAQ Section (Full Width with max-w-4xl centered container) */}
      {faqData && (
        <section className="py-20 sm:py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">FAQ</span>
              <div className="flex items-center justify-center gap-3 mb-3">
                <HelpCircle className="h-7 w-7 text-primary" />
                <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">{faqData.title}</h2>
              </div>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="space-y-3">
              {faqData.questions.map((faq, i) => (
                <div 
                  key={i} 
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-slate-300 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-900 font-bold text-sm transition-all"
              >
                ← Back to All Vehicles
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
