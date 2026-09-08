"use client"

import Image from "next/image"
import { Headphones, ShieldCheck, Wrench, MapPin } from "lucide-react"
import { FadeIn, Float } from "@/components/ui/MotionComponents"

export default function WhyChooseSummary() {
  const leftFeatures = [
    {
      icon: Headphones,
      title: "24-hour Customer Service",
      description:
        "We promise impeccable service by promptly addressing your queries and requests through our dedicated 24/7 customer support team.",
    },
    {
      icon: ShieldCheck,
      title: "100% Owned Fleet & Safety",
      description:
        "We operate a fully company-owned fleet with comprehensive insurance, experienced drivers, and verified government registration in Nepal.",
    },
  ]

  const rightFeatures = [
    {
      icon: Wrench,
      title: "Dedicated Fleet Maintenance",
      description:
        "We ensure impeccable fleet reliability with regular technical inspections before every trip for optimal safety and smooth travel.",
    },
    {
      icon: MapPin,
      title: "All Over Nepal Service",
      description:
        "Our service spans all 7 provinces and major tourist hubs across Nepal, ensuring reliable transportation for all your journeys.",
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <FadeIn direction="up" className="text-center mb-12 sm:mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
            Trust &amp; Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose Us for <span className="text-primary">Vehicle Rental in Nepal</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-4 mb-4" />
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Wide vehicle range, safety-checked fleet, easy booking, and nationwide coverage make us Nepal&apos;s trusted rental choice.
          </p>
        </FadeIn>

        {/* 3-Column Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column (2 items) */}
          <FadeIn direction="right" delay={0.1} className="lg:col-span-4 space-y-8 sm:space-y-10">
            {leftFeatures.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-start gap-4 sm:gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </FadeIn>

          {/* Center Column (Car Cutout) */}
          <FadeIn direction="up" delay={0.2} className="lg:col-span-4 flex items-center justify-center py-4 lg:py-0">
            <Float duration={5} distance={10} className="w-full flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] flex items-center justify-center">
                <Image
                  src="/images/fleet/why-choose-car.jpg"
                  alt="MR Vehicle Rental Fleet"
                  fill
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </Float>
          </FadeIn>

          {/* Right Column (2 items) */}
          <FadeIn direction="left" delay={0.3} className="lg:col-span-4 space-y-8 sm:space-y-10">
            {rightFeatures.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-start gap-4 sm:gap-5 group">
                  <div className="h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300 lg:order-last">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="lg:text-right">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

