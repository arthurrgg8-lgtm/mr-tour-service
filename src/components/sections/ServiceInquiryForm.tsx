"use client"

import { useState } from "react"
import { User, Phone, Mail, Globe, Users, Car, Calendar, MapPin, Plus, FileText, Mountain, Map as MapIcon, MessageCircle } from "lucide-react"
import business from "@/data/business.json"
import fleet from "@/data/fleet.json"
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/utils"

export default function ServiceInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nationality: "",
    numPeople: "",
    inquiryType: "Rental",
    vehicleType: "Toyota Fortuner",
    pickupDate: "",
    dropDate: "",
    pickupLocation: "",
    dropLocation: "",
    destination: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent, channel: 'gmail' | 'whatsapp' = 'gmail') => {
    e.preventDefault()

    // Validation Logic for Rental
    if (formData.inquiryType === "Rental") {
      const today = new Date().toISOString().split('T')[0]
      if (formData.pickupDate && formData.pickupDate < today) {
        alert("Pickup date cannot be in the past.")
        return
      }

      if (formData.pickupDate && formData.dropDate && formData.dropDate < formData.pickupDate) {
        alert("Drop date cannot be earlier than the pickup date.")
        return
      }
    }

    const subject = `${formData.inquiryType} Inquiry - ${formData.name}`
    
    let rentalDetails = ""
    if (formData.inquiryType === "Rental") {
      rentalDetails = `
Vehicle Type: ${formData.vehicleType}
Pickup Date: ${formData.pickupDate}
Drop Date: ${formData.dropDate}
Pickup Location: ${formData.pickupLocation}
Drop Location: ${formData.dropLocation}`
    }

    const body = `*New ${formData.inquiryType} Inquiry Details*
----------------------------------
*Inquiry Type:* ${formData.inquiryType}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Nationality:* ${formData.nationality}
*Number of People:* ${formData.numPeople}${rentalDetails.replace(/\n/g, '\n')}
*Destination/Requests:* ${formData.destination}
----------------------------------`

    if (channel === 'whatsapp') {
      window.open(buildWhatsAppUrl(business.contact.whatsapp, body), '_blank')
    } else {
      window.location.href = buildMailtoUrl(business.contact.email, subject, body)
    }
  }

  const isRental = formData.inquiryType === "Rental"

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-4">Detailed Service Inquiry</h3>
          <p className="text-muted-foreground">Fill out the form below to get a customized quote for your travel plans.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inquiry Type Selection */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <FileText className="h-3 w-3" /> Inquiry For
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["Rental", "Tour", "Trek"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, inquiryType: type }))}
                    className={`h-12 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                      formData.inquiryType === type 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    {type === "Rental" && <Car className="h-4 w-4" />}
                    {type === "Tour" && <MapIcon className="h-4 w-4" />}
                    {type === "Trek" && <Mountain className="h-4 w-4" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <User className="h-3 w-3" /> Name
              </label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Phone className="h-3 w-3" /> Phone Number
              </label>
              <input 
                type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                placeholder="+977-..."
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Mail className="h-3 w-3" /> Email Address
              </label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                placeholder="email@example.com"
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Globe className="h-3 w-3" /> Nationality
              </label>
              <input 
                type="text" name="nationality" required value={formData.nationality} onChange={handleChange}
                placeholder="Country"
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Travel Details */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Users className="h-3 w-3" /> Number of People
              </label>
              <input 
                type="number" name="numPeople" required value={formData.numPeople} onChange={handleChange}
                placeholder="0" min="1"
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Rental Specific Fields */}
            {isRental && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Car className="h-3 w-3" /> Vehicle Type
                  </label>
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                  >
                    {fleet.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                    <option value="Other">Other / Custom</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Pickup Date
                  </label>
                  <input 
                    type="date" name="pickupDate" required={isRental} value={formData.pickupDate} onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Drop Date
                  </label>
                  <input 
                    type="date" name="dropDate" required={isRental} value={formData.dropDate} onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Pickup Location
                  </label>
                  <input 
                    type="text" name="pickupLocation" required={isRental} value={formData.pickupLocation} onChange={handleChange}
                    placeholder="Location"
                    className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Drop Location
                  </label>
                  <input 
                    type="text" name="dropLocation" required={isRental} value={formData.dropLocation} onChange={handleChange}
                    placeholder="Location"
                    className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Plus className="h-3 w-3" /> {isRental ? "Add Destination" : "Trek/Tour Destination & Requests"}
            </label>
            <textarea 
              name="destination" value={formData.destination} onChange={handleChange}
              rows={3}
              placeholder={isRental ? "List specific destinations or extra requests..." : "Specify which trek or tour you are interested in, and any special requests..."}
              className="w-full p-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button 
              type="button"
              onClick={(e) => handleSubmit(e, 'gmail')}
              className="h-20 rounded-2xl bg-slate-900 text-white font-black text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <Mail className="h-6 w-6" /> Gmail Inquiry
            </button>
            <button 
              type="button"
              onClick={(e) => handleSubmit(e, 'whatsapp')}
              className="h-20 rounded-2xl bg-[#25D366] text-white font-black text-lg hover:bg-[#20ba5a] transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <MessageCircle className="h-6 w-6" /> WhatsApp Inquiry
            </button>
          </div>
          
          <p className="text-center text-xs text-muted-foreground italic mt-6">
            Choose your preferred contact method. We typically respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  )
}
