"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, MessageCircle, Menu, X, ChevronDown, Sparkles } from "lucide-react"
import business from "@/data/business.json"
import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { buildWhatsAppUrl, scrollToId, cn } from "@/lib/utils"

// Move navigation data outside component to prevent re-creation
const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "GALLERY", href: "/gallery" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
]

const VEHICLE_SERVICES = [
  { name: "CAR RENT", href: "/services#car-rent" },
  { name: "SUV RENT", href: "/services#suv-rent" },
  { name: "JEEP RENT", href: "/services#jeep-rent" },
  { name: "HIACE RENT", href: "/services#hiace-rent" },
  { name: "MINIBUS RENT", href: "/services#minibus-rent" },
  { name: "LARGE BUS RENT", href: "/services#bus-rent" },
  { name: "PREMIUM FLEET", href: "/services#premium-fleet" },
]

const TOUR_SERVICES = [
  { name: "KTM LOCAL TOUR (4 DAYS)", href: "/tours#tour-9" },
  { name: "KTM-PKR-CHITWAN (8 DAYS)", href: "/tours#tour-10" },
  { name: "KTM-PKR-CHITWAN-LUMBINI (10D)", href: "/tours#tour-11" },
  { name: "KTM-PKR-GHANDRUK-CHITWAN (9D)", href: "/tours#tour-12" },
  { name: "KTM-PKR-GHANDRUK (7 DAYS)", href: "/tours#tour-13" },
  { name: "KTM-NAGARKOT TOUR (5 DAYS)", href: "/tours#tour-14" },
  { name: "KTM-DHULIKHEL-NAMOBUDDHA (3D)", href: "/tours#tour-dhulikhel-3d" },
  { name: "KTM COUNTRYSIDE HIKE (5D)", href: "/tours#tour-1" },
  { name: "NEPAL UNESCO TOUR (8 DAYS)", href: "/tours#tour-27" },
  { name: "FAMILY HOLIDAY (12 DAYS)", href: "/tours#tour-2" },
  { name: "TOUR WITH KIDS (12 DAYS)", href: "/tours#tour-26" },
  { name: "ANNAPURNA-CHITWAN HOLIDAYS (12D)", href: "/tours#tour-24" },
  { name: "GORKHA-BANDIPUR-POKHARA (13D)", href: "/tours#tour-5" },
  { name: "NEPAL CULTURAL TOUR (7 DAYS)", href: "/tours#tour-16" },
  { name: "NEPAL SPIRITUAL TOUR (7 DAYS)", href: "/tours#tour-17" },
  { name: "YOGA AND MEDITATION TOUR (9D)", href: "/tours#tour-15" },
  { name: "BUDDHIST PILGRIMAGE TOUR (8D)", href: "/tours#tour-23" },
  { name: "MUKTINATH SPIRITUAL TOUR (7D)", href: "/tours#tour-18" },
  { name: "UPPER MUSTANG TOUR (9 DAYS)", href: "/tours#tour-25" },
  { name: "BADIMALIKA TOUR (16 DAYS)", href: "/tours#tour-6" },
  { name: "JEEP TOUR TO RARA (8 DAYS)", href: "/tours#tour-19" },
  { name: "CHITWAN JUNGLE SAFARI (3 DAYS)", href: "/tours#tour-4" },
  { name: "LUMBINI TOUR (3 DAYS)", href: "/tours#tour-3" },
  { name: "POKHARA ADVENTURE TOUR (3D)", href: "/tours#tour-pokhara-3d" },
  { name: "ONE DAY KTM TOUR", href: "/tours#tour-8" },
  { name: "BUNGEE JUMPING (1 DAY)", href: "/tours#tour-22" },
  { name: "BHOTEKOSHI RAFTING (2 DAYS)", href: "/tours#tour-20" },
  { name: "TRISHULI RAFTING (2 DAYS)", href: "/tours#tour-21" },
]

const TREKKING_REGIONS = [
  { name: "EVEREST REGION", href: "/trekking#everest-region" },
  { name: "ANNAPURNA REGION", href: "/trekking#annapurna-region" },
  { name: "LANGTANG REGION", href: "/trekking#langtang-region" },
  { name: "KAILASH MANSAROVAR", href: "/trekking#kailash-region" },
  { name: "BUDDHIST PILGRIMAGE TREKKING", href: "/trekking#buddhist-pilgrimage" },
  { name: "UPPER MUSTANG", href: "/trekking#upper-mustang-region" },
  { name: "KANCHANJUNGA", href: "/trekking#kanchanjunga-region" },
  { name: "MAKALU", href: "/trekking#makalu-region" },
  { name: "MANASLU & TSUM VALLEY", href: "/trekking#manaslu-and-tsum-valley-region" },
  { name: "UPPER & LOWER DOLPO", href: "/trekking#upper---lower-dolpo-region" },
  { name: "GHT TRAIL", href: "/trekking#great-himalayan-trail" },
  { name: "DHAULAGIRI REGION", href: "/trekking#dhaulagiri-region" },
  { name: "FAR WESTERN NEPAL", href: "/trekking#far-western-trek-region" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const dropdowns = useMemo(() => [
    { id: "vehicle", name: "VEHICLE", items: VEHICLE_SERVICES, baseHref: "/services" },
    { id: "tour", name: "TOUR", items: TOUR_SERVICES, baseHref: "/tours" },
    { id: "trekking", name: "TREKKING", items: TREKKING_REGIONS, baseHref: "/trekking" },
  ], [])

  // Handle scroll state for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Improved stable redirect logic for hash links
  const handleHashNavigation = useCallback((retryCount = 0) => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      // Use requestAnimationFrame for smoother synchronization with browser render
      requestAnimationFrame(() => {
        setTimeout(() => {
          const success = scrollToId(hash, 100, true)
          if (!success && retryCount < 10) {
            handleHashNavigation(retryCount + 1)
          }
        }, 100 * (retryCount + 1)) // Incremental delay if not found
      })
    }
  }, [])

  useEffect(() => {
    handleHashNavigation()
    window.addEventListener("hashchange", () => handleHashNavigation())
    return () => window.removeEventListener("hashchange", () => handleHashNavigation())
  }, [pathname, handleHashNavigation])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    setActiveDropdown(null)
    
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      
      // If we're already on the target page, intercept for smooth scroll
      if (pathname === path || (pathname === "/" && path === "")) {
        e.preventDefault()
        window.history.pushState(null, "", href)
        scrollToId(hash, 100, true)
        
        // Ensure event triggers for other listeners
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled 
        ? "bg-background/90 backdrop-blur-md shadow-[0_4px_20px_-5px_rgba(var(--primary),0.1)] py-1" 
        : "bg-background py-3"
    )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image 
                src="/logo.jpg" 
                alt="MR TOUR SERVICE"
                width={44}
                height={44}
                className="rounded-lg object-contain bg-white border border-slate-100 shadow-sm transition-transform group-hover:scale-105"
                priority
              />
              {isScrolled && (
                <motion.div 
                  layoutId="logo-glow"
                  className="absolute -inset-1 bg-primary/20 blur-md rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-primary leading-none group-hover:text-primary/80 transition-colors">
                MR TOUR SERVICE
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                FUEL YOUR FREEDOM
              </span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link 
            href="/" 
            onClick={(e) => handleLinkClick(e, "/")}
            className={cn(
              "relative px-4 py-2 text-xs font-black transition-all uppercase tracking-wider",
              pathname === "/" ? "text-primary" : "text-slate-600 hover:text-primary"
            )}
          >
            HOME
            {pathname === "/" && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute inset-0 bg-primary/5 rounded-lg -z-10 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>

          {dropdowns.map((dropdown) => (
            <div 
              key={dropdown.id}
              className="relative group px-1"
              onMouseEnter={() => setActiveDropdown(dropdown.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={dropdown.baseHref}
                onClick={(e) => handleLinkClick(e, dropdown.baseHref)}
                className={cn(
                  "relative flex items-center gap-1 px-3 py-2 text-xs font-black transition-all uppercase tracking-wider",
                  isActive(dropdown.baseHref) ? "text-primary" : "text-slate-600 hover:text-primary"
                )}
              >
                {dropdown.name}
                <ChevronDown className={cn(
                  "h-3 w-3 transition-transform duration-300",
                  activeDropdown === dropdown.id && "rotate-180"
                )} />
                {isActive(dropdown.baseHref) && (
                  <motion.div 
                    layoutId="nav-glow"
                    className="absolute inset-0 bg-primary/5 rounded-lg -z-10 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
              
              <AnimatePresence>
                {activeDropdown === dropdown.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-1 w-72 rounded-2xl bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-3 z-50 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
                    <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                      {(dropdown.id === 'tour' ? dropdown.items.slice(0, 12) : dropdown.items).map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="group flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold text-slate-600 hover:bg-primary/5 hover:text-primary transition-all"
                        >
                          <div className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-primary group-hover:scale-150 transition-all" />
                          {item.name}
                        </Link>
                      ))}
                      {dropdown.id === 'tour' && dropdown.items.length > 12 && (
                        <Link
                          href="/tours"
                          onClick={(e) => handleLinkClick(e, '/tours')}
                          className="flex items-center justify-center gap-2 mx-4 mt-2 py-3 text-[11px] font-black text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-all uppercase tracking-widest border border-primary/10"
                        >
                          EXPLORE ALL TOURS <Sparkles className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {NAV_LINKS.filter(link => link.name !== "HOME").map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={cn(
                "relative px-4 py-2 text-xs font-black transition-all uppercase tracking-wider",
                pathname === link.href ? "text-primary" : "text-slate-600 hover:text-primary"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute inset-0 bg-primary/5 rounded-lg -z-10 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${business.contact.phone}`}
            className="hidden lg:flex items-center gap-2 text-xs font-black text-slate-700 hover:text-primary transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Phone className="h-4 w-4" />
            </div>
            {business.contact.phone}
          </a>
          <Link
            href={buildWhatsAppUrl(business.contact.whatsapp)}
            target="_blank"
            className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-green-500 px-5 text-xs font-black text-white hover:bg-green-600 transition-all shadow-lg shadow-green-200 hover:scale-105 active:scale-95 uppercase tracking-wider"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Book Now
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-all focus:outline-none bg-slate-50 rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
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
            className="md:hidden bg-white border-t overflow-hidden shadow-inner"
          >
            <div className="flex flex-col p-6 gap-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-black transition-colors uppercase tracking-widest pb-2 border-b",
                  pathname === "/" ? "text-primary border-primary/20" : "text-slate-700 border-slate-50"
                )}
              >
                HOME
              </Link>

              {dropdowns.map((dropdown) => (
                <div key={dropdown.id} className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{dropdown.name}</span>
                    <Link
                      href={dropdown.baseHref}
                      onClick={() => setIsOpen(false)}
                      className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full"
                    >
                      VIEW ALL →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-2 pl-2">
                    {(dropdown.id === 'tour' ? dropdown.items.slice(0, 10) : dropdown.items).map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        onClick={(e) => {
                          handleLinkClick(e, item.href)
                          setIsOpen(false)
                        }}
                        className="text-sm font-bold text-slate-600 hover:text-primary py-1 flex items-center gap-2"
                      >
                         <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                        {item.name}
                      </Link>
                    ))}
                    {dropdown.id === 'tour' && dropdown.items.length > 10 && (
                      <Link 
                        href="/tours" 
                        onClick={() => setIsOpen(false)}
                        className="text-xs font-black text-primary py-3 bg-primary/5 rounded-xl text-center mt-2 uppercase tracking-widest border border-primary/10"
                      >
                        EXPLORE ALL TOURS
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {NAV_LINKS.filter(link => link.name !== "HOME").map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-black transition-colors uppercase tracking-widest pb-2 border-b",
                    pathname === link.href ? "text-primary border-primary/20" : "text-slate-700 border-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex flex-col gap-4 pt-4">
                <a
                  href={`tel:${business.contact.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 text-slate-900 font-black"
                >
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  {business.contact.phone}
                </a>
                <Link
                  href={buildWhatsAppUrl(business.contact.whatsapp)}
                  target="_blank"
                  className="flex h-14 items-center justify-center rounded-2xl bg-green-500 text-white font-black text-lg shadow-lg shadow-green-100"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
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

