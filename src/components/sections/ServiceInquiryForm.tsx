"use client"

import { useState } from "react"
import { Send, User, Phone, Mail, Globe, Users, Car, Calendar, MapPin, Plus } from "lucide-react"
import business from "@/data/business.json"
import fleet from "@/data/fleet.json"

export default function ServiceInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    nationality: "",
    numPeople: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation Logic
    const today = new Date().toISOString().split('T')[0]
    if (formData.pickupDate < today) {
      alert("Pickup date cannot be in the past.")
      return
    }

    if (formData.dropDate < formData.pickupDate) {
      alert("Drop date cannot be earlier than the pickup date.")
      return
    }

    const subject = `Service Inquiry - ${formData.name}`
    const body = `New Service Inquiry Details:
----------------------------------
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Nationality: ${formData.nationality}
Number of People: ${formData.numPeople}
Vehicle Type: ${formData.vehicleType}
Pickup Date: ${formData.pickupDate}
Drop Date: ${formData.dropDate}
Pickup Location: ${formData.pickupLocation}
Drop Location: ${formData.dropLocation}
Add Destination: ${formData.destination}
----------------------------------`

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${business.contact.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-4">Detailed Service Inquiry</h3>
          <p className="text-muted-foreground">Fill out the form below to get a customized quote for your travel plans.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                type="date" name="pickupDate" required value={formData.pickupDate} onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Calendar className="h-3 w-3" /> Drop Date
              </label>
              <input 
                type="date" name="dropDate" required value={formData.dropDate} onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Pickup Location
              </label>
              <input 
                type="text" name="pickupLocation" required value={formData.pickupLocation} onChange={handleChange}
                placeholder="Location"
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Drop Location
              </label>
              <input 
                type="text" name="dropLocation" required value={formData.dropLocation} onChange={handleChange}
                placeholder="Location"
                className="w-full h-12 px-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Plus className="h-3 w-3" /> Add Destination
            </label>
            <textarea 
              name="destination" value={formData.destination} onChange={handleChange}
              rows={3}
              placeholder="List specific destinations or extra requests..."
              className="w-full p-4 rounded-xl border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-8"
          >
            Enquire Now <Send className="h-6 w-6" />
          </button>
          
          <p className="text-center text-xs text-muted-foreground italic">
            This will open Gmail in your browser with your inquiry details pre-filled.
          </p>
        </form>
      </div>
    </div>
  )
}
