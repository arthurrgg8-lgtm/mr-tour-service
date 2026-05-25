import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import business from "@/data/business.json"
import { buildWhatsAppUrl } from "@/lib/utils"

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 mb-6">
              <Image 
                src="/logo.jpg" 
                alt="M.R TRAVEL AND TOUR"
                width={64}
                height={64}
                className="rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-primary leading-none">M.R TRAVEL AND TOUR</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  FUEL YOUR FREEDOM
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              {business.tagline}. Providing premium vehicle rental and tour services in Nepal for over 5 years.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Registered under:</p>
              {business.registrations.map((reg, idx) => (
                <span key={idx} className="text-xs text-muted-foreground">• {reg}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vehicle Rentals
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/trekking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Himalayan Trekking
                </Link>
              </li>
              <li>
                <Link href="/services#premium-fleet" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Premium Fleet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={business.socials.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                  aria-label="View our office location on Google Maps"
                >
                  <MapPin className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors leading-relaxed">
                    {business.contact.location}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${business.contact.phone}`} 
                  className="flex items-center gap-3 group"
                  aria-label={`Call us at ${business.contact.phone}`}
                >
                  <Phone className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {business.contact.phone}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${business.contact.email}`}
                  className="flex items-center gap-3 group"
                  aria-label={`Send an email to ${business.contact.email}`}
                >
                  <Mail className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors break-all">
                    {business.contact.email}
                  </span>
                </a>
              </li>
              <li>
                <Link 
                  href={buildWhatsAppUrl(business.contact.whatsapp)}
                  target="_blank"
                  className="flex items-center gap-3 group"
                  aria-label="Chat with us on WhatsApp"
                >
                  <MessageCircle className="h-5 w-5 text-green-600 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    WhatsApp: {business.contact.whatsapp}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">
              Developed by <Link href="https://anuditk.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">LazZy</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
