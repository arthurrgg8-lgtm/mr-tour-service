"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MessageCircle, Car, Map as MapIcon, ShieldCheck } from "lucide-react"
import gsap from "gsap"
import business from "@/data/business.json"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const heroImages = [
  "/images/hero/hero-nepal.jpeg",
  "/images/hero/hero-trek.jpeg",
  "/images/hero/hero-triple-tour.jpeg",
  "/images/hero/hero-pashupati.webp",
  "/images/hero/hero-tibet.jpeg",
  "/images/hero/hero-1.jpg",
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
      className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-slate-900"
    >
      {/* Background Image Slider with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={heroImages[currentImage]} 
              alt={`Slide ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/20 to-transparent" />
        {/* <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" /> */}
        
        {/* Slider Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentImage ? "w-8 bg-primary" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted Travel Partner in Nepal
          </div>

          <h1 
            ref={titleRef}
            className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6"
          >
            {business.slogan} <br />
            <span className="text-primary">with Premium Service</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed"
          >
            {business.tagline}. From luxury vehicle rentals to custom tour packages and trekking, 
            we own our fleet to ensure the highest standards of safety and comfort.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              href="/services#inquiry-form"
              className="group flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            >
              Enquire Now
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          <div 
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-white/10 pt-10"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                <Car className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Fully Owned</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Vehicle Fleet</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                <MapIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Custom Tours</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Across Nepal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Professional</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Trained Drivers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
