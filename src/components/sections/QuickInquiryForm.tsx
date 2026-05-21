"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import business from "@/data/business.json"
import { buildWhatsAppUrl } from "@/lib/utils"

export default function QuickInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Vehicle Rental",
    message: ""
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format the message for WhatsApp
    const text = `*New Quick Inquiry from Website*
----------------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Service Required:* ${formData.service}
*Message:* ${formData.message}
----------------------------------`
    
    // Redirect to WhatsApp
    const whatsappUrl = buildWhatsAppUrl(business.contact.whatsapp, text)
    window.open(whatsappUrl, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
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
  )
}
