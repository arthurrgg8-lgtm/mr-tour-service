import type { Metadata } from "next"
import business from "@/data/business.json"
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import QuickInquiryForm from "@/components/sections/QuickInquiryForm"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"
import { FadeIn } from "@/components/ui/MotionComponents"

export const metadata: Metadata = {
  title: `Contact Us | ${business.name} — Bookings & Inquiries`,
  description: `Contact ${business.name} for vehicle rental bookings and travel inquiries in Nepal. Phone, WhatsApp, email, and Kathmandu office location.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/contact",
    siteName: business.name,
    title: `Contact Us | ${business.name} — Bookings & Inquiries`,
    description: `Contact ${business.name} for vehicle rental bookings and travel inquiries in Nepal. Phone, WhatsApp, email, and Kathmandu office location.`,
    images: [
      {
        url: "https://manoranjan.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: `contact ${business.name} Nepal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${business.name} — Bookings & Inquiries`,
    description: `Contact ${business.name} for vehicle rental bookings and travel inquiries in Nepal. Phone, WhatsApp, email, and Kathmandu office location.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://manoranjan.com.np/contact" }
    ]
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How can I contact ${business.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reach us 24/7 via phone call, WhatsApp message, email, or by visiting our office at Kalopul, Kathmandu, Nepal. We respond to all inquiries within a few hours."
        }
      },
      {
        "@type": "Question",
        "name": "What are your office hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We operate 24 hours a day, 7 days a week, 365 days a year. Our team is always available to assist with bookings, inquiries, and emergency support for our clients."
        }
      },
      {
        "@type": "Question",
        "name": "Do you respond to WhatsApp messages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! WhatsApp is our fastest communication channel. You can send us a message anytime and our team will respond promptly with quotes, availability, and travel advice."
        }
      },
      {
        "@type": "Question",
        "name": "Can I visit your office in person?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our office is located at Kalopul, Kathmandu. You are welcome to visit us to discuss your travel plans, view our fleet options, and book your journey in person."
        }
      }
    ]
  }

  return (
    <div className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqJsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/contact-bg.jpg" 
            alt={`contact ${business.name} Nepal`}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up" className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">Contact {business.name}</h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
              Get in touch with us for vehicle rental bookings, custom itineraries, and travel support.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
            {/* Contact Info */}
            <FadeIn direction="right">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">Reach Us</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Contact Information</h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">Phone, WhatsApp, email, and office location in Kathmandu.</p>
              
              <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:space-y-8">
                <div className="flex flex-col xs:flex-row gap-2 xs:gap-6">
                  <div className="h-9 w-9 sm:h-14 sm:w-14 shrink-0 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold mb-0.5 sm:mb-2">Call or WhatsApp</h3>
                    <p className="text-[10px] sm:text-sm text-slate-500 mb-1.5 sm:mb-4">Feel free to call or message us anytime. We&apos;re on WhatsApp!</p>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <a href={`tel:${business.contact.phone}`} className="text-xs sm:text-lg font-bold hover:text-primary transition-colors">
                        {business.contact.phone}
                      </a>
                      <Link 
                        href={buildWhatsAppUrl(business.contact.whatsapp)} 
                        className="text-green-600 font-bold flex items-center gap-1 text-[10px] sm:text-base hover:underline"
                      >
                        <MessageCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /> Chat on WhatsApp
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 xs:gap-6">
                  <div className="h-9 w-9 sm:h-14 sm:w-14 shrink-0 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold mb-0.5 sm:mb-2">Email Us</h3>
                    <p className="text-[10px] sm:text-sm text-slate-500 mb-1.5 sm:mb-4">For formal inquiries, group bookings, or partnerships.</p>
                    <a 
                      href={`mailto:${business.contact.email}`}
                      className="text-xs sm:text-lg font-bold hover:text-primary transition-colors break-all"
                    >
                      {business.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 xs:gap-6">
                  <div className="h-9 w-9 sm:h-14 sm:w-14 shrink-0 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold mb-0.5 sm:mb-2">Our Office</h3>
                    <p className="text-[10px] sm:text-sm text-slate-500 mb-1.5 sm:mb-4">Visit us at our central office in Kathmandu.</p>
                    <p className="text-xs sm:text-lg font-bold leading-tight">{business.contact.location}</p>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 xs:gap-6">
                  <div className="h-9 w-9 sm:h-14 sm:w-14 shrink-0 rounded-lg sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl font-bold mb-0.5 sm:mb-2">Availability &amp; Quick Support</h3>
                    <p className="text-[10px] sm:text-sm text-slate-500 leading-relaxed">Direct phone and WhatsApp support for urgent travel assistance 24/7/365.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick Inquiry Form Component */}
            <FadeIn direction="left" delay={0.1}>
              <div className="mb-4">
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-1 block">Inquiry</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Send Us a Message</h2>
                <p className="text-xs sm:text-sm text-slate-500">Fill out the form below and our team will respond within a few hours.</p>
              </div>
              <QuickInquiryForm />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 pb-12">
        <FadeIn direction="up">
          <div className="mb-4 text-center">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-1 block">Find Us</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">Our Location</h2>
            <p className="text-xs sm:text-sm text-slate-500">Find our Kathmandu office on the map — walk-ins are welcome.</p>
          </div>
          <div className="h-[250px] xs:h-[320px] sm:h-[450px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-lg">
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
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-base text-muted-foreground">Find us at Kalopul, Kathmandu - 24/7 Service Available</p>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
