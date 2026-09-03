"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import business from "@/data/business.json"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"

const TICKER_ITEMS = [
  { name: "Car", href: "/vehicles/car-rent" },
  { name: "Jeep", href: "/vehicles/jeep-rent" },
  { name: "SUV", href: "/vehicles/suv-rent" },
  { name: "Premium Fleet", href: "/vehicles/premium-fleet" },
  { name: "Hiace", href: "/vehicles/hiace-rent" },
  { name: "Sutlej Bus", href: "/vehicles/bus-rent" },
  { name: "Mini Bus", href: "/vehicles/minibus-rent" },
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
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-0 overflow-hidden bg-slate-900"
    >
      {/* Background Image (single, no slideshow) */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero/hero-nepal.jpeg" 
          alt={`Premium vehicle rental service - ${business.name}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/60" />
      </div>

      <div className="container mx-auto px-4 z-10 flex-1 flex flex-col justify-center pb-8 pt-4">
        {/* Top: Title + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Title + Subtitle */}
          <div className="max-w-2xl">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-md"
            >
              {business.slogan} <br />
              <span className="text-primary">with Premium Service</span>
            </h1>

            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-slate-300 max-w-xl mb-8 leading-relaxed drop-shadow-sm"
            >
              {business.tagline}. From luxury vehicle rentals to corporate solutions, 
              we own our fleet to ensure the highest standards of safety and comfort.
            </p>

            {/* Quick Stats */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5"
            >
              <div className="text-center">
                <p className="text-xl font-black text-primary">20+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-primary">100%</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Owned Fleet</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-primary">24/7</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">Support</p>
              </div>
            </div>
          </div>

          {/* Right: Service Inquiry Form */}
          <div className="hidden lg:block lg:pt-4">
            <ServiceInquiryForm initialType="Rental" allowedTypes={["Rental"]} compact dark />
          </div>
        </div>

        {/* Mobile: Inquiry form below */}
        <div className="lg:hidden mt-12">
          <ServiceInquiryForm initialType="Rental" allowedTypes={["Rental"]} compact dark />
        </div>

        {/* Steps Flow — Responsive Grid */}
        <div ref={ctaRef} className="mt-10 border-t border-white/10 pt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {[
              { num: "01", title: "Find Your Perfect Ride", desc: "Browse our full fleet of well-maintained cars, SUVs, and buses for rent. Filter by type, capacity, and price." },
              { num: "02", title: "Choose Date & Location", desc: "Select your pickup date, return date, and preferred location. Real-time availability guaranteed." },
              { num: "03", title: "Book With Ease", desc: "Secure your rental in minutes. Transparent pricing, instant confirmation, no hidden fees." },
              { num: "04", title: "Hit the Road", desc: "Pick up and go. Safety-checked rides with 24/7 support, anywhere you travel." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-[10px] font-black text-primary mb-1.5 font-mono">{step.num}</div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-tight">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
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
