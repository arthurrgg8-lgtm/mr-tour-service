"use client"

import business from "@/data/business.json"
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Vehicle Rental",
    message: ""
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format the message for WhatsApp
    const text = `*New Inquiry from Website*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Service:* ${formData.service}%0A` +
      `*Message:* ${formData.message}`
    
    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/${business.contact.whatsapp}?text=${text}`
    window.open(whatsappUrl, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
                    <p className="text-muted-foreground mb-4">Feel free to call or message us anytime. We're on WhatsApp!</p>
                    <div className="flex flex-col gap-2">
                      <a href={`tel:${business.contact.phone}`} className="text-lg font-bold hover:text-primary transition-colors">
                        {business.contact.phone}
                      </a>
                      <Link 
                        href={`https://wa.me/${business.contact.whatsapp}`} 
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
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${business.contact.email}`}
                      target="_blank"
                      rel="noopener noreferrer" 
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

            {/* Quick Inquiry Form */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-8">Quick Inquiry</h3>
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full h-12 px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Service Required</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-slate-900"
                  >
                    <option>Vehicle Rental</option>
                    <option>Tour Package</option>
                    <option>Trekking</option>
                    <option>Hotel Booking</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your travel plans..."
                    className="w-full p-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-slate-900"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Send Inquiry <Send className="h-5 w-5" />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  This will open WhatsApp to send your details.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4">
        <div className="h-[450px] w-full rounded-3xl overflow-hidden border shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.148671524317!2d85.3353!3d27.7118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x827102c6c7458d07%3A0x68a8193a22c56a7e!2sManoranjan%20Ramjham%20Travel%20and%20Tour%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1716000000000!5m2!1sen!2snp" 
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
