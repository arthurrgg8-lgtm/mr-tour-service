"use client"

import { useState, useRef } from "react"
import { Mail, MessageCircle, ChevronDown, User, Phone } from "lucide-react"
import business from "@/data/business.json"
import { buildWhatsAppUrl, buildGmailUrl, sanitizeInput } from "@/lib/utils"
import { trackLeadConversion } from "@/lib/gtag"

export default function QuickInquiryForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Vehicle Rental",
    message: ""
  })

  const handleSendMessage = (e: React.FormEvent, channel: 'whatsapp' | 'gmail' = 'whatsapp') => {
    e.preventDefault()

    if (formRef.current && !formRef.current.reportValidity()) {
      return
    }

    if (/\d/.test(formData.name)) {
      alert("Name cannot contain numbers. Please enter a valid name.")
      return
    }

    if (formData.name.trim().length < 2) {
      alert("Please enter a valid full name.")
      return
    }
    
    // Track Google Ads lead conversion
    trackLeadConversion()
    
    // Format the message
    const sanitized = {
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      email: sanitizeInput(formData.email),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message),
    }
    const text = `*New Quick Inquiry from Website*
----------------------------------
*Name:* ${sanitized.name}
*Phone:* ${sanitized.phone || 'Not provided'}
*Email:* ${sanitized.email}
*Service Required:* ${sanitized.service}
*Message:* ${sanitized.message}
----------------------------------`
    
    if (channel === 'whatsapp') {
      const whatsappUrl = buildWhatsAppUrl(business.contact.whatsapp, text)
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    } else {
      const gmailUrl = buildGmailUrl(business.contact.email, "Quick Inquiry - Website", text)
      window.open(gmailUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let sanitizedValue = value
    if (name === "name") {
      sanitizedValue = value.replace(/[0-9]/g, "")
    }
    if (name === "phone") {
      sanitizedValue = value.replace(/[^0-9+\s\-()]/g, "")
    }
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  return (
    <div className="bg-slate-50 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Quick Inquiry</h3>
        <p className="text-xs sm:text-sm text-slate-500">Send us a message and we will respond within a few hours.</p>
      </div>

      <form ref={formRef} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <User className="h-3 w-3" /> Your Name
            </label>
            <input 
              type="text" 
              name="name"
              required
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Phone className="h-3 w-3" /> Phone Number
            </label>
            <input 
              type="tel" 
              name="phone"
              required
              maxLength={25}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone / WhatsApp"
              className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> Email Address
            </label>
            <input 
              type="email" 
              name="email"
              required
              maxLength={100}
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Service Required
            </label>
            <div className="relative">
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full h-11 sm:h-12 pl-3.5 sm:pl-4 pr-10 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer text-xs sm:text-sm text-slate-900"
              >
                <option value="Vehicle Rental" className="bg-white text-slate-900">Vehicle Rental</option>
                <option value="Corporate Rent" className="bg-white text-slate-900">Corporate Rent</option>
                <option value="Self Drive" className="bg-white text-slate-900">Self Drive</option>
                <option value="Tour Package" className="bg-white text-slate-900">Tour Package</option>
                <option value="Trekking" className="bg-white text-slate-900">Trekking</option>
                <option value="Airport Transfer" className="bg-white text-slate-900">Airport Transfer</option>
                <option value="Other" className="bg-white text-slate-900">Other</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Message / Special Requests
          </label>
          <textarea 
            name="message"
            required
            maxLength={1000}
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your travel dates, vehicle preference, or itinerary..."
            className="w-full p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-xs sm:text-sm text-slate-900"
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button 
            type="button"
            onClick={(e) => handleSendMessage(e, 'whatsapp')}
            className="flex-1 h-12 sm:h-14 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba5a] transition-all shadow-lg shadow-green-200/50 flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <span>Send WhatsApp</span>
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button 
            type="button"
            onClick={(e) => handleSendMessage(e, 'gmail')}
            className="flex-1 h-12 sm:h-14 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <span>Send Email</span>
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground pt-1">
          Instant response available 24/7. No spam guaranteed.
        </p>
      </form>
    </div>
  )
}

