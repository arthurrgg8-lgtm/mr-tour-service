"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import business from "@/data/business.json"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"

const TICKER_ITEMS = [
  { name: "Car", href: "/vehicles/car-rent" },
  { name: "Jeep", href: "/vehicles/jeep-rent" },
  { name: "SUV", href: "/vehicles/suv-rent" },
  { name: "Premium Fleet", href: "/vehicles/premium-fleet" },
  { name: "Hiace", href: "/vehicles/hiace-rent" },
  { name: "Sutlej Bus", href: "/vehicles/bus-rent" },
  { name: "Coaster", href: "/vehicles/minibus-rent" },
  { name: "Self Drive", href: "/self-drive" },
  { name: "Sedan", href: "/vehicles/car-rent" },
  { name: "4x4 Off-Road", href: "/vehicles/jeep-rent" },
  { name: "Corporate Fleet", href: "/corporate-rent" },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      ctaRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      statsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.2"
    )
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col justify-between pt-8 sm:pt-12 lg:pt-16 pb-0 overflow-hidden bg-slate-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero/hero-main.png" 
          alt={`Vehicle rental in Nepal - ${business.name}`}
          fill
          className="object-cover object-bottom"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-950/70" />
      </div>

      <div className="container mx-auto px-4 z-10 flex-1 flex flex-col justify-center pb-8 pt-3 sm:pt-6">
        {/* Top: Title + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left: Title + Stats */}
          <div className="max-w-2xl">
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.15] mb-4 sm:mb-8 drop-shadow-md"
            >
              Choose the Vehicle, <br />
              <span className="text-primary">Travel with Ease</span>
            </h1>

            {/* Quick Stats */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/15 pt-4 sm:pt-6 max-w-lg"
            >
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-black text-primary">20+</p>
                <p className="text-xs text-slate-300 font-semibold uppercase tracking-wide">Years Experience</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-black text-primary">100%</p>
                <p className="text-xs text-slate-300 font-semibold uppercase tracking-wide">Owned Fleet</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-black text-primary">24/7</p>
                <p className="text-xs text-slate-300 font-semibold uppercase tracking-wide">Support</p>
              </div>
            </div>
          </div>

          {/* Right: Service Inquiry Form (Pure White Background) */}
          <div className="hidden lg:block lg:pt-2">
            <ServiceInquiryForm compact />
          </div>
        </div>

        {/* Mobile: Inquiry form below (Pure White Background) */}
        <div className="lg:hidden mt-6">
          <ServiceInquiryForm compact />
        </div>

        {/* Steps Flow — How Vehicle Rental Works (Enhanced Font Sizes & Lighter Card Opacity) */}
        <div ref={ctaRef} className="mt-12 border-t border-white/15 pt-8">
          <div className="mb-5 max-w-3xl">
            <h2 className="text-base sm:text-xl font-black uppercase tracking-wider text-primary mb-1">How Vehicle Rental Works</h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">Choose your vehicle, select dates and location, confirm your booking, and hit the road — all in a few simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {[
              { num: "01", title: "Choose Your Vehicle", desc: "Browse our full fleet of well-maintained cars, SUVs, jeeps, and buses. Filter by type and budget." },
              { num: "02", title: "Select Dates & Location", desc: "Specify your pickup date, drop-off time, and route anywhere in Nepal." },
              { num: "03", title: "Confirm Your Booking", desc: "Secure your reservation instantly with clear pricing and dedicated assistance." },
              { num: "04", title: "Hit the Road", desc: "Pick up and go. Enjoy safety-inspected vehicles and 24/7 roadside assistance." },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col justify-between bg-white/[0.06] p-4 sm:p-5 rounded-2xl border border-white/10 backdrop-blur-xs hover:bg-white/[0.1] hover:border-primary/30 transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-black text-primary font-mono">{step.num}</span>
                    {i < 3 && (
                      <span className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Running Marquee Banner (Right to Left with Light Glassmorphism) */}
      <div className="w-full bg-black/20 backdrop-blur-md border-t border-white/10 py-3.5 sm:py-4 overflow-hidden z-20 relative select-none shadow-[0_-5px_20px_rgba(0,0,0,0.2)]">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="flex items-center">
              <Link 
                href={item.href}
                className="text-primary hover:text-white font-black text-sm sm:text-base tracking-wider uppercase transition-colors duration-200"
              >
                {item.name}
              </Link>
              <span className="text-white/20 font-bold mx-4 sm:mx-6">–</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
