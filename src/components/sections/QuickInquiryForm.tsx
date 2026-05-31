"use client"

import { useState, useRef } from "react"
import { Mail, MessageCircle } from "lucide-react"
import business from "@/data/business.json"
import { buildWhatsAppUrl, buildGmailUrl } from "@/lib/utils"
import { sanitizeInput } from "@/lib/utils"

export default function QuickInquiryForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Vehicle Rental",
    message: ""
  })

  const handleSendMessage = (e: React.FormEvent, channel: 'whatsapp' | 'gmail' = 'whatsapp') => {
    e.preventDefault()

    if (formRef.current && !formRef.current.reportValidity()) {
      return
    }
    
    // Format the message
    // Sanitize all user inputs before constructing message
    const sanitized = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message),
    }
    const text = `*New Quick Inquiry from Website*
----------------------------------
*Name:* ${sanitized.name}
*Email:* ${sanitized.email}
*Service Required:* ${sanitized.service}
*Message:* ${sanitized.message}
----------------------------------`
    
    if (channel === 'whatsapp') {
      const whatsappUrl = buildWhatsAppUrl(business.contact.whatsapp, text)
      window.open(whatsappUrl, "_blank")
    } else {
      const gmailUrl = buildGmailUrl(business.contact.email, "Quick Inquiry - Website", text)
      window.open(gmailUrl, "_blank")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-slate-50 p-4 xs:p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm">
      <h3 className="text-lg xs:text-2xl font-bold mb-4 sm:mb-8">Quick Inquiry</h3>
      <form ref={formRef} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Name</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xs sm:text-sm text-slate-900"
            />
          </div>
        </div>
        
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Service Required</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-xs sm:text-sm text-slate-900"
          >
            <option>Vehicle Rental</option>
            <option>Tour Package</option>
            <option>Trekking</option>
            <option>Hotel Booking</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
          <textarea 
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your travel plans..."
            className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-xs sm:text-sm text-slate-900"
          ></textarea>
        </div>

        <div className="flex flex-col xs:flex-row gap-3">
          <button 
            type="button"
            onClick={(e) => handleSendMessage(e, 'whatsapp')}
            className="flex-1 h-11 sm:h-14 rounded-lg sm:rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-lg hover:bg-[#20ba5a] transition-all shadow-lg shadow-green-200/50 flex items-center justify-center gap-1.5 sm:gap-2"
          >
            WhatsApp <MessageCircle className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>
          <button 
            type="button"
            onClick={(e) => handleSendMessage(e, 'gmail')}
            className="flex-1 h-11 sm:h-14 rounded-lg sm:rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-lg hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-1.5 sm:gap-2"
          >
            Gmail <Mail className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          Choose your preferred method. Please fill required fields.
        </p>
      </form>
    </div>
  )
}
