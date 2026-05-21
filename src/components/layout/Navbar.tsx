"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react"
import business from "@/data/business.json"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { buildWhatsAppUrl, scrollToId } from "@/lib/utils"

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

  const trekkingRegions = [
    { name: "EVEREST REGION", href: "/trekking#everest-region" },
    { name: "ANNAPURNA REGION", href: "/trekking#annapurna-region" },
    { name: "LANGTANG REGION", href: "/trekking#langtang-region" },
    { name: "BUDDHIST PILGRIMAGE TREKKING", href: "/trekking#buddhist-trekking" },
    { name: "DHAULAGIRI TREK", href: "/trekking#dhaulagiri-trek" },
    { name: "FAR WESTERN NEPAL", href: "/trekking#far-western" },
    { name: "UPPER & LOWER DOLPO", href: "/trekking#dolpo-trek" },
    { name: "MAKALU", href: "/trekking#makalu-trek" },
    { name: "GHT TRAIL", href: "/trekking#ght-trail" },
    { name: "UPPER MUSTANG", href: "/trekking#upper-mustang" },
    { name: "MANASLU & TSUM VALLEY", href: "/trekking#manaslu-trek" },
    { name: "KAILASH MANSAROVAR", href: "/trekking#kailash-trek" },
    { name: "KANCHANJUNGA", href: "/trekking#kanchanjunga-trek" },
    { name: "RARA", href: "/trekking#rara-trek" },
  ]

  const dropdowns = [
    { id: "vehicle", name: "VEHICLE", items: vehicleServices },
    { id: "tour", name: "TOUR", items: tourServices },
    { id: "trekking", name: "TREKKING", items: trekkingRegions },
  ]

  useEffect(() => {
    const handleScrollToHash = (retryCount = 0) => {
      const hash = window.location.hash.substring(1)
      if (hash) {
        setTimeout(() => {
          const success = scrollToId(hash, 100, true)
          if (!success && retryCount < 5) {
            handleScrollToHash(retryCount + 1)
          }
        }, 300)
      }
    }

    handleScrollToHash()
    const handleHashChange = () => handleScrollToHash()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [pathname])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    setActiveDropdown(null)
    
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      
      // If we're already on the target page
      if (pathname === path) {
        e.preventDefault()
        window.history.pushState(null, "", href)
        scrollToId(hash, 100, true)
        
        // Manually trigger hashchange event for other components (like ToursPage modal)
        window.dispatchEvent(new HashChangeEvent('hashchange'))
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
              <Link
                href={dropdown.id === 'vehicle' ? '/services' : dropdown.id === 'tour' ? '/tours' : '/trekking'}
                onClick={(e) => handleLinkClick(e, dropdown.id === 'vehicle' ? '/services' : dropdown.id === 'tour' ? '/tours' : '/trekking')}
                className="flex items-center gap-1 text-sm font-bold hover:text-primary transition-colors cursor-pointer uppercase"
              >
                {dropdown.name}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === dropdown.id ? 'rotate-180' : ''}`} />
              </Link>
              
              <AnimatePresence>
                {activeDropdown === dropdown.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-64 rounded-xl bg-white border shadow-xl py-2 z-50"
                  >
                    {(dropdown.id === 'tour' ? dropdown.items.slice(0, 9) : dropdown.items).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="block px-4 py-2 text-[11px] font-bold text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {dropdown.id === 'tour' && dropdown.items.length > 9 && (
                      <Link
                        href="/tours"
                        onClick={(e) => handleLinkClick(e, '/tours')}
                        className="block px-4 py-2 text-[11px] font-black text-primary hover:bg-primary/5 transition-colors border-t border-slate-50 mt-1 uppercase"
                      >
                        SEE MORE TOURS →
                      </Link>
                    )}
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
            href={buildWhatsAppUrl(business.contact.whatsapp)}
            target="_blank"
            className="hidden sm:flex h-9 items-center justify-center rounded-full bg-green-500 px-4 text-sm font-bold text-white hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Book Now
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden shadow-inner"
            role="navigation"
            aria-label="Mobile menu"
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
                  <Link
                    href={dropdown.id === 'vehicle' ? '/services' : dropdown.id === 'tour' ? '/tours' : '/trekking'}
                    onClick={(e) => {
                      handleLinkClick(e, dropdown.id === 'vehicle' ? '/services' : dropdown.id === 'tour' ? '/tours' : '/trekking')
                      setIsOpen(false)
                    }}
                    className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest mb-1 border-b pb-1 flex justify-between items-center transition-colors"
                  >
                    <span>{dropdown.name}</span>
                    <span className="text-[9px] font-semibold text-primary">VIEW ALL →</span>
                  </Link>
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {(dropdown.id === 'tour' ? dropdown.items.slice(0, 9) : dropdown.items).map((item) => (
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
                    {dropdown.id === 'tour' && dropdown.items.length > 9 && (
                      <Link 
                        href="/tours" 
                        onClick={(e) => {
                          handleLinkClick(e, '/tours')
                          setIsOpen(false)
                        }}
                        className="text-xs font-black text-primary py-2 border-t border-slate-50 mt-1 uppercase tracking-wider"
                      >
                        SEE MORE TOURS →
                      </Link>
                    )}
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
                  href={buildWhatsAppUrl(business.contact.whatsapp)}
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
