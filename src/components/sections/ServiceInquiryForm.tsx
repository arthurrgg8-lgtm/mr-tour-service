"use client"

import { useState, useRef } from "react"
import { User, Phone, Mail, Globe, Users, Car, Calendar, MapPin, Plus, FileText, Mountain, Map as MapIcon, MessageCircle, ChevronDown } from "lucide-react"
import business from "@/data/business.json"
import { buildGmailUrl, buildWhatsAppUrl, sanitizeInput } from "@/lib/utils"
import { trackLeadConversion } from "@/lib/gtag"

interface ServiceInquiryFormProps {
  initialType?: "Rental" | "Tour" | "Trek"
  allowedTypes?: ("Rental" | "Tour" | "Trek")[]
  compact?: boolean
  dark?: boolean
}

export default function ServiceInquiryForm({
  initialType = "Rental",
  allowedTypes = ["Rental"],
  compact = false,
  dark = false,
}: ServiceInquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nationality: "",
    numPeople: "",
    inquiryType: initialType,
    vehicleType: "SUV — 4 seater",
    pickupDate: "",
    dropDate: "",
    pickupLocation: "",
    dropLocation: "",
    destination: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let sanitizedValue = value
    
    // Prevent typing or pasting numbers into the Name field
    if (name === "name") {
      sanitizedValue = value.replace(/[0-9]/g, "")
    }
    // Only allow digits and phone characters in phone field
    if (name === "phone") {
      sanitizedValue = value.replace(/[^0-9+\s\-()]/g, "")
    }

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }))
  }

  const handleSubmit = (e: React.FormEvent, channel: 'gmail' | 'whatsapp' = 'gmail') => {
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

    trackLeadConversion()

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

    const s = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      nationality: sanitizeInput(formData.nationality),
      numPeople: sanitizeInput(formData.numPeople),
      destination: sanitizeInput(formData.destination || ''),
      inquiryType: sanitizeInput(formData.inquiryType),
      vehicleType: sanitizeInput(formData.vehicleType || ''),
      pickupDate: sanitizeInput(formData.pickupDate || ''),
      dropDate: sanitizeInput(formData.dropDate || ''),
      pickupLocation: sanitizeInput(formData.pickupLocation || ''),
      dropLocation: sanitizeInput(formData.dropLocation || ''),
    }
    const subject = `${s.inquiryType} Inquiry - ${s.name}`
    
    let rentalDetails = ""
    if (s.inquiryType === "Rental") {
      rentalDetails = `\nVehicle Type: ${s.vehicleType}\nPickup Date: ${s.pickupDate}\nDrop Date: ${s.dropDate}\nPickup Location: ${s.pickupLocation}\nDrop Location: ${s.dropLocation}`
    }

    const body = `*New ${s.inquiryType} Inquiry Details*\n----------------------------------\n*Inquiry Type:* ${s.inquiryType}\n*Name:* ${s.name}\n*Phone:* ${s.phone}\n*Email:* ${s.email}\n*Nationality:* ${s.nationality}\n*Number of People:* ${s.numPeople}${rentalDetails.replace(/\n/g, '\n')}\n*Destination/Requests:* ${s.destination}\n----------------------------------`

    if (channel === 'whatsapp') {
      window.open(buildWhatsAppUrl(business.contact.whatsapp, body), '_blank', 'noopener,noreferrer')
    } else {
      window.open(buildGmailUrl(business.contact.email, subject, body), '_blank', 'noopener,noreferrer')
    }
  }

  const isRental = formData.inquiryType === "Rental"

  // ─── COMPACT MODE (for hero / vehicle pages) ───
  if (compact) {
    const wrapperCls = dark
      ? "bg-black/20 backdrop-blur-sm border-white/10 shadow-2xl"
      : "bg-slate-50 border-slate-200 shadow-lg"
    const inputCls = dark
      ? "bg-black/15 border-white/10 text-white placeholder-white/40 focus:ring-primary/40 focus:border-white/20 focus:bg-black/30"
      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-primary/30 focus:border-primary"
    const selectCls = dark
      ? "bg-black/15 border-white/10 text-white focus:ring-primary/40 focus:border-white/20 focus:bg-slate-950"
      : "bg-white border-slate-200 text-slate-900 focus:ring-primary/30 focus:border-primary"
    const headingCls = dark ? "text-white" : "text-slate-900"
    const subCls = dark ? "text-white/60" : "text-slate-500"
    const optionCls = dark ? "bg-slate-900 text-white" : "bg-white text-slate-900"

    return (
      <div className={`${wrapperCls} p-5 sm:p-6 rounded-2xl border relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-16 -mt-16 ${dark ? "bg-primary/10" : "bg-primary/5"}`} />
        
        <div className="relative z-10">
          <div className="mb-4">
            <h3 className={`text-base sm:text-lg font-bold mb-1 ${headingCls}`}>Quick Inquiry</h3>
            <p className={`text-[10px] sm:text-xs ${subCls}`}>Get a personalized quote within 24 hours.</p>
          </div>

          <form ref={formRef} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                placeholder="Full Name"
                className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
              />
              <input 
                type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
              />
            </div>

            <div className="relative">
              <select 
                name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                className={`w-full h-9 pl-3 pr-8 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${selectCls}`}
              >
                <option value="Car — 4 seater" className={optionCls}>Car — 4 seater</option>
                <option value="SUV — 4 seater" className={optionCls}>SUV — 4 seater</option>
                <option value="Jeep — 7 seater" className={optionCls}>Jeep — 7 seater</option>
                <option value="Hiace — 14 seater" className={optionCls}>Hiace — 14 seater</option>
                <option value="Mini bus — 18-22 seater" className={optionCls}>Mini bus — 18-22 seater</option>
                <option value="Sutlej bus — 25-35 seater" className={optionCls}>Sutlej bus — 25-35 seater</option>
                <option value="Premium fleet — 7-32 seater" className={optionCls}>Premium fleet — 7-32 seater</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className={`h-3.5 w-3.5 ${dark ? "text-white/70" : "text-slate-500"}`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={`relative flex items-center gap-1.5 h-9 px-2.5 rounded-lg border text-xs ${inputCls}`}>
                <Calendar className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-white/60" : "text-slate-400"}`} />
                <span className={`text-[11px] truncate select-none ${formData.pickupDate ? (dark ? "text-white font-medium" : "text-slate-900 font-medium") : (dark ? "text-white/50" : "text-slate-400")}`}>
                  {formData.pickupDate || "Pickup Date"}
                </span>
                <input 
                  type="date" 
                  name="pickupDate" 
                  value={formData.pickupDate} 
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>

              <div className={`relative flex items-center gap-1.5 h-9 px-2.5 rounded-lg border text-xs ${inputCls}`}>
                <Calendar className={`h-3.5 w-3.5 shrink-0 ${dark ? "text-white/60" : "text-slate-400"}`} />
                <span className={`text-[11px] truncate select-none ${formData.dropDate ? (dark ? "text-white font-medium" : "text-slate-900 font-medium") : (dark ? "text-white/50" : "text-slate-400")}`}>
                  {formData.dropDate || "Drop Date"}
                </span>
                <input 
                  type="date" 
                  name="dropDate" 
                  value={formData.dropDate} 
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text" name="pickupLocation" maxLength={100} value={formData.pickupLocation} onChange={handleChange}
                placeholder="Pickup Location"
                className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
              />
              <input 
                type="text" name="dropLocation" maxLength={100} value={formData.dropLocation} onChange={handleChange}
                placeholder="Drop Location"
                className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
              />
            </div>

            <input 
              type="email" name="email" maxLength={100} value={formData.email} onChange={handleChange}
              placeholder="Email (optional)"
              className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
            />

            <textarea
              name="destination" value={formData.destination} onChange={handleChange}
              rows={2}
              placeholder="Additional information or special requests..."
              className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all resize-none ${inputCls}`}
            />

            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, 'whatsapp')}
                className="h-10 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </button>
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, 'gmail')}
                className={`h-10 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${dark ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-slate-900 text-white hover:bg-slate-800"}`}
              >
                <Mail className="h-3.5 w-3.5" /> Gmail
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // ─── FULL MODE ───
  return (
    <div className="max-w-4xl mx-auto bg-white p-4 xs:p-6 sm:p-12 rounded-2xl sm:rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="relative z-10">
        <div className="text-center mb-6 sm:mb-10">
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Detailed Service Inquiry</h3>
          <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">Fill out the form below to get a customized quote for your travel plans.</p>
        </div>

        <form ref={formRef} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {allowedTypes.length > 1 && (
              <div className="space-y-1.5 sm:space-y-2 col-span-2">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                  <FileText className="h-3 w-3" /> Inquiry For
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {allowedTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, inquiryType: type }))}
                      className={`h-10 sm:h-12 rounded-lg sm:rounded-xl border-2 font-bold text-xs sm:text-base transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                        formData.inquiryType === type 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                      }`}
                    >
                      {type === "Rental" && <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                      {type === "Tour" && <MapIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                      {type === "Trek" && <Mountain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <User className="h-3 w-3" /> Name
              </label>
              <input 
                type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Phone className="h-3 w-3" /> Phone Number
              </label>
              <input 
                type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Mail className="h-3 w-3" /> Email Address
              </label>
              <input 
                type="email" name="email" required maxLength={100} value={formData.email} onChange={handleChange}
                placeholder="email@example.com"
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2 col-span-1">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Globe className="h-3 w-3" /> Nationality
              </label>
              <input 
                type="text" name="nationality" required maxLength={50} value={formData.nationality} onChange={handleChange}
                placeholder="Country"
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2 col-span-1">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Users className="h-3 w-3" /> Pax
              </label>
              <input 
                type="number" name="numPeople" required min="1" max="500" value={formData.numPeople} onChange={handleChange}
                placeholder="0"
                className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {isRental && (
              <>
                <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                    <Car className="h-3 w-3" /> Vehicle Type
                  </label>
                  <div className="relative">
                    <select 
                      name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                      className="w-full h-10 sm:h-12 pl-3 sm:pl-4 pr-10 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="Car — 4 seater">Car — 4 seater</option>
                      <option value="SUV — 4 seater">SUV — 4 seater</option>
                      <option value="Jeep — 7 seater">Jeep — 7 seater</option>
                      <option value="Hiace — 14 seater">Hiace — 14 seater</option>
                      <option value="Mini bus — 18-22 seater">Mini bus — 18-22 seater</option>
                      <option value="Sutlej bus — 25-35 seater">Sutlej bus — 25-35 seater</option>
                      <option value="Premium fleet — 7-32 seater">Premium fleet — 7-32 seater</option>
                      <option value="Other">Other / Custom</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3 w-3" /> Pickup Date
                  </label>
                  <input 
                    type="date" name="pickupDate" required={isRental} value={formData.pickupDate} onChange={handleChange}
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2 col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3 w-3" /> Drop Date
                  </label>
                  <input 
                    type="date" name="dropDate" required={isRental} value={formData.dropDate} onChange={handleChange}
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div className="space-y-1.5 sm:space-y-2 col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                    <MapPin className="h-3 w-3" /> Pickup Location
                  </label>
                  <input 
                    type="text" name="pickupLocation" required={isRental} maxLength={100} value={formData.pickupLocation} onChange={handleChange}
                    placeholder="Location"
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2 col-span-1">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                    <MapPin className="h-3 w-3" /> Drop Location
                  </label>
                  <input 
                    type="text" name="dropLocation" required={isRental} maxLength={100} value={formData.dropLocation} onChange={handleChange}
                    placeholder="Location"
                    className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 sm:gap-2">
              <Plus className="h-3 w-3" /> {isRental ? "Add Destination" : "Trek/Tour Destination & Requests"}
            </label>
            <textarea 
              name="destination" maxLength={1000} value={formData.destination} onChange={handleChange}
              rows={2}
              placeholder={isRental ? "List specific destinations or extra requests..." : "Specify which trek or tour you are interested in, and any special requests..."}
              className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button 
              type="button"
              onClick={(e) => handleSubmit(e, 'gmail')}
              className="h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-900 text-white font-bold sm:font-black text-xs sm:text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-wider group"
            >
              <Mail className="h-4 w-4 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform shrink-0" /> 
              <span>Submit via Gmail</span>
            </button>
            <button 
              type="button"
              onClick={(e) => handleSubmit(e, 'whatsapp')}
              className="h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-[#25D366] text-white font-bold sm:font-black text-xs sm:text-lg hover:bg-[#20ba5a] transition-all shadow-xl flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-wider group"
            >
              <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform shrink-0" /> 
              <span>Submit via WhatsApp</span>
            </button>
          </div>
          
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground italic mt-4 sm:mt-6">
            Please fill in all required fields. We typically respond within 24 hours.
          </p>
        </form>
      </div>
    </div>
  )
}
