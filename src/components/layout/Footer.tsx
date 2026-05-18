import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import business from "@/data/business.json"
import services from "@/data/services.json"

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 mb-6">
              <Image 
                src="/logo.jpg" 
                alt="MR TOUR SERVICE"
                width={64}
                height={64}
                className="rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-primary leading-none">MR TOUR SERVICE</span>
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
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://maps.app.goo.gl/YourMapLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors leading-relaxed">
                    {business.contact.location}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${business.contact.phone}`} className="flex items-center gap-3 group">
                  <Phone className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {business.contact.phone}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${business.contact.email}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <Mail className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors break-all">
                    {business.contact.email}
                  </span>
                </a>
              </li>
              <li>
                <Link 
                  href={`https://wa.me/${business.contact.whatsapp}`}
                  target="_blank"
                  className="flex items-center gap-3 group"
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
              Developed by <Link href="https://anuditk.vercel.app" target="_blank" className="font-bold hover:text-primary transition-colors">Anudit Khatri</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
