import type { Metadata } from "next"
import business from "@/data/business.json"
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import QuickInquiryForm from "@/components/sections/QuickInquiryForm"
import { buildWhatsAppUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${business.name} for premium vehicle rentals, tour packages, and trekking in Nepal. We are available 24/7 at our Kathmandu office and online via WhatsApp and Email.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/contact",
    siteName: business.name,
    title: business.name,
    description: `Get in touch with ${business.name} for vehicle rentals, tour packages, and trekking adventures in Nepal. Available 24/7 via phone, WhatsApp, and email.`,
    images: [
      {
        url: "https://manoranjan.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: `Get in touch with ${business.name} for vehicle rentals, tour packages, and trekking adventures in Nepal. Available 24/7 via phone, WhatsApp, and email.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20 pb-24">
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/contact-bg.jpg" 
            alt="Contact Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Have questions about our services or need a customized quote? 
              Our team is available 24/7 to help you plan your perfect trip to Nepal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-10">Get in Touch</h2>
              
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Call or WhatsApp</h3>
                    <p className="text-muted-foreground mb-4">Feel free to call or message us anytime. We&apos;re on WhatsApp!</p>
                    <div className="flex flex-col gap-2">
                      <a href={`tel:${business.contact.phone}`} className="text-lg font-bold hover:text-primary transition-colors">
                        {business.contact.phone}
                      </a>
                      <Link 
                        href={buildWhatsAppUrl(business.contact.whatsapp)} 
                        className="text-green-600 font-bold flex items-center gap-2 hover:underline"
                      >
                        <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-4">For formal inquiries, group bookings, or business partnerships.</p>
                    <a 
                      href={`mailto:${business.contact.email}`}
                      className="text-lg font-bold hover:text-primary transition-colors break-all"
                    >
                      {business.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Office</h3>
                    <p className="text-muted-foreground mb-4">Visit us at our central office in Kathmandu.</p>
                    <p className="text-lg font-bold leading-tight">{business.contact.location}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Availability</h3>
                    <p className="text-muted-foreground">We operate 24 hours a day, 365 days a year to support your travel needs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form Component */}
            <QuickInquiryForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4">
        <div className="h-[450px] w-full rounded-3xl overflow-hidden border shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.148671524317!2d85.3353!3d27.7118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x827102c6c7458d07%3A0x68a8193a22c56a7e!2sM.R%20Travel%20and%20Tour!5e0!3m2!1sen!2snp!4v1716000000000!5m2!1sen!2snp" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="text-center mt-6">
          <p className="text-muted-foreground">Find us at Kalopul, Kathmandu - 24/7 Service Available</p>
        </div>
      </section>
    </div>
  )
}
