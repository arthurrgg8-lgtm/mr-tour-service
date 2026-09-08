"use client"

import { useState, useRef } from "react"
import { Mail, Car, Calendar, MapPin, Building2, Compass, MessageCircle, ChevronDown, Clock } from "lucide-react"
import business from "@/data/business.json"
import { buildGmailUrl, buildWhatsAppUrl, sanitizeInput, cn } from "@/lib/utils"
import { trackLeadConversion } from "@/lib/gtag"

export type ServiceMode = "Rent with Driver" | "Self Drive" | "Corporate Rent"

const DRIVER_VEHICLE_OPTIONS = [
  { value: "Car — 4 seater", match: ["car", "car-rent", "sedan"] },
  { value: "SUV — 4 seater", match: ["suv", "suv-rent"] },
  { value: "Jeep — 7 seater", match: ["jeep", "jeep-rent", "4x4", "scorpio"] },
  { value: "Hiace — 14 seater", match: ["hiace", "hiace-rent", "van"] },
  { value: "Coaster — 18-22 seater", match: ["minibus", "minibus-rent", "mini bus", "coaster", "coaster rent"] },
  { value: "Sutlej bus — 25-35 seater", match: ["bus", "bus-rent", "sutlej", "sutlej bus", "tourist bus"] },
  { value: "Premium fleet — 7-32 seater", match: ["premium", "premium-fleet", "luxury", "fortuner", "byd"] },
]

const SELF_DRIVE_VEHICLE_OPTIONS = [
  { value: "Car — 4 seater", match: ["car", "car-rent", "sedan"] },
  { value: "SUV — 4 seater", match: ["suv", "suv-rent"] },
  { value: "Jeep — 7 seater", match: ["jeep", "jeep-rent", "4x4", "scorpio"] },
]

const CORPORATE_VEHICLE_OPTIONS = DRIVER_VEHICLE_OPTIONS

function normalizeMode(input?: string): ServiceMode {
  if (!input) return "Rent with Driver"
  const clean = input.toLowerCase()
  if (clean.includes("self")) return "Self Drive"
  if (clean.includes("corporate") || clean.includes("b2b")) return "Corporate Rent"
  return "Rent with Driver"
}

function resolveVehicleType(input?: string, mode: ServiceMode = "Rent with Driver"): string {
  const options = mode === "Self Drive" 
    ? SELF_DRIVE_VEHICLE_OPTIONS 
    : mode === "Corporate Rent" 
      ? CORPORATE_VEHICLE_OPTIONS 
      : DRIVER_VEHICLE_OPTIONS

  if (!input) return options[0].value
  const clean = input.toLowerCase().trim()
  const found = options.find(
    (opt) =>
      opt.value.toLowerCase() === clean ||
      opt.match.some((m) => m === clean || clean.includes(m) || m.includes(clean))
  )
  return found ? found.value : options[0].value
}

interface ServiceInquiryFormProps {
  initialType?: string
  initialVehicleType?: string
  allowedTypes?: string[]
  compact?: boolean
  dark?: boolean
}

export default function ServiceInquiryForm({
  initialType = "Rent with Driver",
  initialVehicleType,
  allowedTypes,
  compact = false,
  dark = false,
}: ServiceInquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const initialMode = normalizeMode(initialType)
  const [activeMode, setActiveMode] = useState<ServiceMode>(initialMode)

  const normalizedAllowedTypes: ServiceMode[] = allowedTypes && allowedTypes.length > 0
    ? Array.from(new Set(allowedTypes.map(normalizeMode)))
    : ["Rent with Driver", "Self Drive", "Corporate Rent"]
  
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    vehicleType: resolveVehicleType(initialVehicleType, normalizeMode(initialType)),
    pickupDate: "",
    dropDate: "",
    pickupLocation: "",
    dropLocation: "",
    numDays: "",
    destination: "",
  })

  const handleModeSwitch = (mode: ServiceMode) => {
    setActiveMode(mode)
    setFormData(prev => ({
      ...prev,
      vehicleType: resolveVehicleType(undefined, mode)
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let sanitizedValue = value
    
    // Prevent typing or pasting numbers into the Name / Person fields
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

    if (formData.name.trim().length < 2) {
      alert("Please enter a valid full name.")
      return
    }

    if (/\d/.test(formData.name)) {
      alert("Name cannot contain numbers. Please enter a valid name.")
      return
    }

    if (activeMode === "Corporate Rent" && !formData.companyName.trim()) {
      alert("Please enter your company name.")
      return
    }

    if (activeMode === "Corporate Rent" && !formData.email.trim()) {
      alert("Please enter your official email address.")
      return
    }

    if (activeMode === "Rent with Driver") {
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

    if (activeMode === "Self Drive" && (!formData.numDays || parseInt(formData.numDays) < 1)) {
      alert("Please specify the required number of days.")
      return
    }

    trackLeadConversion()

    const s = {
      name: sanitizeInput(formData.name),
      companyName: sanitizeInput(formData.companyName),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      vehicleType: sanitizeInput(formData.vehicleType || ''),
      pickupDate: sanitizeInput(formData.pickupDate || ''),
      dropDate: sanitizeInput(formData.dropDate || ''),
      pickupLocation: sanitizeInput(formData.pickupLocation || ''),
      dropLocation: sanitizeInput(formData.dropLocation || ''),
      numDays: sanitizeInput(formData.numDays || ''),
      destination: sanitizeInput(formData.destination || ''),
    }

    let subject = ""
    let body = ""

    if (activeMode === "Self Drive") {
      subject = `Self-Drive Car Rental Inquiry - ${s.name}`
      body = `*New Self-Drive Rental Inquiry*\n----------------------------------\n*Service:* Self Drive Rental\n*Full Name:* ${s.name}\n*Contact No:* ${s.phone}\n*Email:* ${s.email || 'N/A'}\n*Vehicle Type:* ${s.vehicleType}\n*Pickup Location:* MR Vehicle Rental, Kalopul (Fixed)\n*Required No. of Days:* ${s.numDays} Days\n*Additional Information:* ${s.destination || 'None'}\n----------------------------------`
    } else if (activeMode === "Corporate Rent") {
      subject = `Corporate Fleet Rental Inquiry - ${s.companyName}`
      body = `*New Corporate Rental Inquiry*\n----------------------------------\n*Service:* Corporate Vehicle Rental\n*Company Name:* ${s.companyName}\n*Contact Person:* ${s.name}\n*Contact No:* ${s.phone}\n*Official Email:* ${s.email}\n*Vehicle / Fleet Type:* ${s.vehicleType}\n*Additional Requirements:* ${s.destination || 'None'}\n----------------------------------`
    } else {
      subject = `Rent with Driver Inquiry - ${s.name}`
      body = `*New Rent with Driver Inquiry*\n----------------------------------\n*Service:* Rent with Driver\n*Full Name:* ${s.name}\n*Contact No:* ${s.phone}\n*Email:* ${s.email || 'N/A'}\n*Vehicle Type:* ${s.vehicleType}\n*Pickup Date:* ${s.pickupDate || 'Flexible'}\n*Drop Date:* ${s.dropDate || 'Flexible'}\n*Pickup Location:* ${s.pickupLocation || 'Kathmandu'}\n*Drop Location:* ${s.dropLocation || 'N/A'}\n*Additional Requests:* ${s.destination || 'None'}\n----------------------------------`
    }

    if (channel === 'whatsapp') {
      window.open(buildWhatsAppUrl(business.contact.whatsapp, body), '_blank', 'noopener,noreferrer')
    } else {
      window.open(buildGmailUrl(business.contact.email, subject, body), '_blank', 'noopener,noreferrer')
    }
  }

  // ─── COMPACT MODE (Hero / Sticky Sidebars) ───
  if (compact) {
    const wrapperCls = dark
      ? "bg-black/20 backdrop-blur-sm border-white/10 shadow-2xl"
      : "bg-white border border-slate-200/90 shadow-2xl"
    const inputCls = dark
      ? "bg-black/15 border-white/10 text-white placeholder-white/40 focus:ring-primary/40 focus:border-white/20 focus:bg-black/30"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-primary/30 focus:border-primary focus:bg-white"
    const selectCls = dark
      ? "bg-black/15 border-white/10 text-white focus:ring-primary/40 focus:border-white/20 focus:bg-slate-950"
      : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-primary/30 focus:border-primary focus:bg-white"
    const optionCls = dark ? "bg-slate-900 text-white" : "bg-white text-slate-900"

    const currentVehicleOptions = activeMode === "Self Drive"
      ? SELF_DRIVE_VEHICLE_OPTIONS
      : activeMode === "Corporate Rent"
        ? CORPORATE_VEHICLE_OPTIONS
        : DRIVER_VEHICLE_OPTIONS

    return (
      <div className={`${wrapperCls} p-4 sm:p-6 rounded-2xl border relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-16 -mt-16 ${dark ? "bg-primary/10" : "bg-primary/5"}`} />
        
        <div className="relative z-10">
          {/* 3 Service Switching Tabs */}
          {normalizedAllowedTypes.length > 1 && (
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/10 gap-1 mb-3.5">
              {[
                { id: "Rent with Driver", label: "Rent with Driver", icon: Car },
                { id: "Self Drive", label: "Self Drive", icon: Compass },
                { id: "Corporate Rent", label: "Corporate", icon: Building2 },
              ].filter(t => normalizedAllowedTypes.includes(t.id as ServiceMode)).map((tab) => {
                const isSelected = activeMode === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleModeSwitch(tab.id as ServiceMode)}
                    className={cn(
                      "flex-1 py-1.5 px-1 xs:px-1.5 text-[10px] xs:text-[11px] sm:text-xs font-bold rounded-lg transition-all text-center flex items-center justify-center gap-1 leading-tight",
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          )}

          <form ref={formRef} className="space-y-3">
            {/* ─── 1. SELF DRIVE FIELDS ─── */}
            {activeMode === "Self Drive" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                  <input 
                    type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                    placeholder="Contact No"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <select 
                      name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                      className={`w-full h-9 pl-3 pr-8 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${selectCls}`}
                    >
                      {currentVehicleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className={optionCls}>{opt.value}</option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown className={`h-3.5 w-3.5 ${dark ? "text-white/70" : "text-slate-500"}`} />
                    </div>
                  </div>

                  <div className="relative">
                    <input 
                      type="number" name="numDays" required min="1" max="90" value={formData.numDays} onChange={handleChange}
                      placeholder="Required Days"
                      className={`w-full h-9 pl-3 pr-2 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                    />
                  </div>
                </div>

                {/* Fixed Pickup Location Badge */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <div className="text-[11px] leading-tight truncate">
                    <span className="font-bold">Pickup: </span>
                    <span className="font-semibold">MR Vehicle Rental, Kalopul (Fixed)</span>
                  </div>
                </div>

                <input 
                  type="email" name="email" maxLength={100} value={formData.email} onChange={handleChange}
                  placeholder="Email (optional)"
                  className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                />

                <textarea
                  name="destination" value={formData.destination} onChange={handleChange}
                  rows={2}
                  placeholder="Additional information (e.g. travel destination or driving route)..."
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all resize-none ${inputCls}`}
                />
              </>
            )}

            {/* ─── 2. CORPORATE RENT FIELDS ─── */}
            {activeMode === "Corporate Rent" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" name="companyName" required maxLength={100} value={formData.companyName} onChange={handleChange}
                    placeholder="Company Name"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                  <input 
                    type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                    placeholder="Contact No"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                  <input 
                    type="email" name="email" required maxLength={100} value={formData.email} onChange={handleChange}
                    placeholder="Official Email"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                </div>

                <div className="relative">
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                    className={`w-full h-9 pl-3 pr-8 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${selectCls}`}
                  >
                    {currentVehicleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className={optionCls}>{opt.value}</option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown className={`h-3.5 w-3.5 ${dark ? "text-white/70" : "text-slate-500"}`} />
                  </div>
                </div>

                <textarea
                  name="destination" value={formData.destination} onChange={handleChange}
                  rows={2}
                  placeholder="Additional requirements (e.g. lease duration, fleet size, shuttle route)..."
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all resize-none ${inputCls}`}
                />
              </>
            )}

            {/* ─── 3. RENT WITH DRIVER FIELDS (Standard) ─── */}
            {activeMode === "Rent with Driver" && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                  <input 
                    type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                    placeholder="Contact No"
                    className={`w-full h-9 px-3 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all ${inputCls}`}
                  />
                </div>

                <div className="relative">
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                    className={`w-full h-9 pl-3 pr-8 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer ${selectCls}`}
                  >
                    {currentVehicleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className={optionCls}>{opt.value}</option>
                    ))}
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
                  placeholder="Additional information (e.g. travel destination, route, or special requests)..."
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 transition-all resize-none ${inputCls}`}
                />
              </>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, 'whatsapp')}
                className="h-10 rounded-lg bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-green-600/20"
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

  // ─── FULL DETAILED INQUIRY MODE (Bottom of Pages) ───
  const currentVehicleOptions = activeMode === "Self Drive"
    ? SELF_DRIVE_VEHICLE_OPTIONS
    : activeMode === "Corporate Rent"
      ? CORPORATE_VEHICLE_OPTIONS
      : DRIVER_VEHICLE_OPTIONS

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 xs:p-6 sm:p-12 rounded-2xl sm:rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Detailed Service Inquiry</h3>
          <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">Select your service type and receive a customized quote within 24 hours.</p>
        </div>

        {/* 3 Tab Mode Switcher */}
        {normalizedAllowedTypes.length > 1 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
            {[
              { id: "Rent with Driver", label: "Rent with Driver", icon: Car },
              { id: "Self Drive", label: "Self Drive", icon: Compass },
              { id: "Corporate Rent", label: "Corporate Rent", icon: Building2 },
            ].filter(t => normalizedAllowedTypes.includes(t.id as ServiceMode)).map((tab) => {
              const isSelected = activeMode === tab.id
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleModeSwitch(tab.id as ServiceMode)}
                  className={cn(
                    "h-12 sm:h-14 rounded-xl sm:rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 uppercase tracking-wide",
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              )
            })}
          </div>
        )}

        <form ref={formRef} className="space-y-4 sm:space-y-6">
          {/* ─── FULL MODE: SELF DRIVE ─── */}
          {activeMode === "Self Drive" && (
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input 
                  type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact No</label>
                <input 
                  type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Vehicle Type</label>
                <div className="relative">
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                    className="w-full h-10 sm:h-12 pl-3 sm:pl-4 pr-10 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {currentVehicleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.value}</option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary" /> Required No. of Days
                </label>
                <input 
                  type="number" name="numDays" required min="1" max="90" value={formData.numDays} onChange={handleChange}
                  placeholder="e.g. 3 Days"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Pickup Location</label>
                <div className="flex items-center gap-2 h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-bold">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>MR Vehicle Rental, Kalopul (Fixed)</span>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address (Optional)</label>
                <input 
                  type="email" name="email" maxLength={100} value={formData.email} onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          {/* ─── FULL MODE: CORPORATE RENT ─── */}
          {activeMode === "Corporate Rent" && (
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Company Name</label>
                <input 
                  type="text" name="companyName" required maxLength={100} value={formData.companyName} onChange={handleChange}
                  placeholder="Organization or Enterprise Name"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact Person (Full Name)</label>
                <input 
                  type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact No</label>
                <input 
                  type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Official Email</label>
                <input 
                  type="email" name="email" required maxLength={100} value={formData.email} onChange={handleChange}
                  placeholder="corporate@company.com"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Vehicle / Fleet Category</label>
                <div className="relative">
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                    className="w-full h-10 sm:h-12 pl-3 sm:pl-4 pr-10 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {currentVehicleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.value}</option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── FULL MODE: RENT WITH DRIVER ─── */}
          {activeMode === "Rent with Driver" && (
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input 
                  type="text" name="name" required maxLength={100} value={formData.name} onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact No</label>
                <input 
                  type="tel" name="phone" required maxLength={25} value={formData.phone} onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Vehicle Type</label>
                <div className="relative">
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleChange}
                    className="w-full h-10 sm:h-12 pl-3 sm:pl-4 pr-10 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    {currentVehicleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.value}</option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address (Optional)</label>
                <input 
                  type="email" name="email" maxLength={100} value={formData.email} onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Pickup Date</label>
                <input 
                  type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange}
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Drop Date</label>
                <input 
                  type="date" name="dropDate" value={formData.dropDate} onChange={handleChange}
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Pickup Location</label>
                <input 
                  type="text" name="pickupLocation" maxLength={100} value={formData.pickupLocation} onChange={handleChange}
                  placeholder="Pickup Location"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2 col-span-1">
                <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Drop Location</label>
                <input 
                  type="text" name="dropLocation" maxLength={100} value={formData.dropLocation} onChange={handleChange}
                  placeholder="Drop Location"
                  className="w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
          )}

          {/* Common Textarea for additional info / requirements */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {activeMode === "Corporate Rent" ? "Additional Corporate Requirements" : "Additional Information or Special Requests"}
            </label>
            <textarea 
              name="destination" maxLength={1000} value={formData.destination} onChange={handleChange}
              rows={2}
              placeholder={
                activeMode === "Corporate Rent"
                  ? "Describe your company requirements (e.g. lease duration, fleet quantity, custom billing)..."
                  : activeMode === "Self Drive"
                    ? "Specify your destination, travel route, or preferred pickup time (e.g. Pokhara, Chitwan)..."
                    : "Additional information (e.g. travel destination, route, or special requests)..."
              }
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

