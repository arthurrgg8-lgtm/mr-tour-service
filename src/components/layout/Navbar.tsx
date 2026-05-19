"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react"
import business from "@/data/business.json"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "GALLERY", href: "/gallery" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ]

  const vehicleServices = [
    { name: "CAR RENT", href: "/services#car-rent" },
    { name: "SUV RENT", href: "/services#suv-rent" },
    { name: "JEEP RENT", href: "/services#jeep-rent" },
    { name: "HIACE RENT", href: "/services#hiace-rent" },
    { name: "MINIBUS RENT", href: "/services#minibus-rent" },
    { name: "LARGE BUS RENT", href: "/services#bus-rent" },
    { name: "PREMIUM FLEET", href: "/services#premium-fleet" },
  ]

  const tourServices = [
    { name: "KTM COUNTRYSIDE HIKE", href: "/tours#ktm" },
    { name: "FAMILY HOLIDAY", href: "/tours#family" },
    { name: "LUMBINI TOUR", href: "/tours#lumbini" },
    { name: "CHITWAN JUNGLE SAFARI", href: "/tours#chitwan" },
    { name: "GORKHA-BANDIPUR-PKR", href: "/tours#gorkha" },
    { name: "BADIMALIKA TOUR", href: "/tours#badimalika" },
    { name: "JEEP TOUR TO RARA", href: "/tours#jeep" },
    { name: "KTM CITY TOUR (1 DAY)", href: "/tours#ktm" },
  ]

  const trekkingRegions = [
    { name: "EVEREST REGION", href: "/trekking#everest" },
    { name: "ANNAPURNA REGION", href: "/trekking#annapurna" },
    { name: "LANGTANG REGION", href: "/trekking#langtang" },
    { name: "BUDDHIST PILGRIMAGE TREKKING", href: "/trekking#buddhist" },
    { name: "DHAULAGIRI TREK", href: "/trekking#dhaulagiri" },
    { name: "FAR WESTERN NEPAL", href: "/trekking#far" },
    { name: "UPPER & LOWER DOLPO", href: "/trekking#upper" },
    { name: "MAKALU", href: "/trekking#makalu" },
    { name: "GHT TRAIL", href: "/trekking#ght" },
    { name: "UPPER MUSTANG", href: "/trekking#mustang" },
    { name: "MANASLU & TSUM VALLEY", href: "/trekking#manaslu" },
    { name: "KAILASH MANSAROVAR", href: "/trekking#kailash" },
    { name: "KANCHANJUNGA", href: "/trekking#kanchanjunga" },
    { name: "RARA", href: "/trekking#rara" },
  ]

  const dropdowns = [
    { id: "vehicle", name: "VEHICLE", items: vehicleServices },
    { id: "tour", name: "TOUR", items: tourServices },
    { id: "trekking", name: "TREKKING", items: trekkingRegions },
  ]

  useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash.substring(1)
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            const offset = 100 // Increased offset for better visibility
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })

            // Add glow animation
            element.classList.remove('animate-section-glow')
            void element.offsetWidth // trigger reflow
            element.classList.add('animate-section-glow')
          }, 300) 
        }
      }
    }

    handleScrollToHash()
    window.addEventListener('hashchange', handleScrollToHash)
    return () => window.removeEventListener('hashchange', handleScrollToHash)
  }, [pathname])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    setActiveDropdown(null)
    
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      
      // If we're already on the target page
      if (pathname === path) {
        // Update hash without full reload if it's different, 
        // but still allow it to trigger hashchange or manual effect
        if (window.location.hash !== `#${hash}`) {
          // Standard navigation handles this
        } else {
          // If hash is same, manually trigger scroll/glow
          const element = document.getElementById(hash)
          if (element) {
            e.preventDefault()
            const offset = 100
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })

            element.classList.remove('animate-section-glow')
            void element.offsetWidth
            element.classList.add('animate-section-glow')
          }
        }
      }
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.jpg" 
              alt="MR TOUR SERVICE"
              width={48}
              height={48}
              className="rounded-lg object-contain bg-white border border-slate-100 shadow-sm"
              priority
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-primary leading-none">MR TOUR SERVICE</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                FUEL YOUR FREEDOM
              </span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-bold hover:text-primary transition-colors uppercase"
          >
            HOME
          </Link>

          {dropdowns.map((dropdown) => (
            <div 
              key={dropdown.id}
              className="relative group py-4"
              onMouseEnter={() => setActiveDropdown(dropdown.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-bold hover:text-primary transition-colors cursor-pointer uppercase">
                {dropdown.name}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === dropdown.id ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === dropdown.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-64 rounded-xl bg-white border shadow-xl py-2 z-50"
                  >
                    {dropdown.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="block px-4 py-2 text-[11px] font-bold text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {navLinks.filter(link => link.name !== "HOME").map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${business.contact.phone}`}
            className="hidden lg:flex items-center gap-2 text-sm font-bold text-primary"
          >
            <Phone className="h-4 w-4" />
            {business.contact.phone}
          </a>
          <Link
            href={`https://wa.me/${business.contact.whatsapp}`}
            target="_blank"
            className="hidden sm:flex h-9 items-center justify-center rounded-full bg-green-500 px-4 text-sm font-bold text-white hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Book Now
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4 max-h-[80vh] overflow-y-auto">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-slate-700 hover:text-primary border-b border-slate-50 pb-2 uppercase tracking-widest pt-2"
              >
                HOME
              </Link>

              {dropdowns.map((dropdown) => (
                <div key={dropdown.id} className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 border-b pb-1">
                    {dropdown.name}
                  </p>
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {dropdown.items.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        onClick={(e) => {
                          handleLinkClick(e, item.href)
                          setIsOpen(false)
                        }}
                        className="text-sm font-bold text-slate-700 hover:text-primary py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {navLinks.filter(link => link.name !== "HOME").map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-slate-700 hover:text-primary border-b border-slate-50 pb-2 uppercase tracking-widest pt-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                <a
                  href={`tel:${business.contact.phone}`}
                  className="flex items-center gap-3 text-primary font-bold"
                >
                  <Phone className="h-5 w-5" />
                  {business.contact.phone}
                </a>
                <Link
                  href={`https://wa.me/${business.contact.whatsapp}`}
                  target="_blank"
                  className="flex h-12 items-center justify-center rounded-xl bg-green-500 text-white font-bold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
