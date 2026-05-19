"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, CheckCircle2, Phone, MessageCircle } from "lucide-react"
import business from "@/data/business.json"

interface ItineraryItem {
  day: string;
  title: string;
  desc: string;
}

interface TourDetail {
  id: string;
  title: string;
  tagline: string;
  highlights: string[];
  description: string;
  itinerary: ItineraryItem[];
}

interface TourModalProps {
  tour: TourDetail | null;
  onClose: () => void;
}

export default function TourModal({ tour, onClose }: TourModalProps) {
  if (!tour) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="relative h-48 md:h-64 bg-slate-900 text-white shrink-0 overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-blue-600/40 opacity-50" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
             
             <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2">{tour.tagline}</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{tour.title}</h2>
             </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               {/* Left Side: Overview & Highlights */}
               <div className="lg:col-span-1 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       <MapPin className="h-5 w-5 text-primary" /> Trip Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       <CheckCircle2 className="h-5 w-5 text-primary" /> Trip Highlights
                    </h3>
                    <ul className="space-y-3">
                      {tour.highlights.map((h, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700 font-medium">
                           <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                           </span>
                           {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Contact Box */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                     <p className="font-bold">Book this Trip</p>
                     <div className="space-y-3">
                        <a 
                          href={`https://wa.me/${business.contact.whatsapp}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all text-sm"
                        >
                          <MessageCircle className="h-5 w-5" /> WhatsApp Us
                        </a>
                        <a 
                          href={`tel:${business.contact.phone}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all text-sm"
                        >
                          <Phone className="h-5 w-5" /> Call Directly
                        </a>
                     </div>
                  </div>
               </div>

               {/* Right Side: Detailed Itinerary */}
               <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" /> Detailed Itinerary
                  </h3>
                  <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100" />
                    
                    {tour.itinerary.map((step, i) => (
                      <div key={i} className="relative pl-16 group">
                         {/* Circle Indicator */}
                         <div className="absolute left-[1.125rem] top-1 h-3 w-3 rounded-full border-2 border-primary bg-white z-10 group-hover:bg-primary transition-colors" />
                         
                         <div className="space-y-2">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Day {step.day}</span>
                            <h4 className="text-lg font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">{step.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                               {step.desc}
                            </p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 p-6 md:px-12 bg-slate-50 border-t flex items-center justify-between">
             <p className="text-xs text-muted-foreground italic max-w-md">
               This trip can be redesigned or redeveloped as per your taste. 
               Contact us for custom itineraries.
             </p>
             <button 
               onClick={onClose}
               className="h-12 px-8 rounded-xl bg-white border border-slate-200 font-bold hover:bg-slate-100 transition-colors shadow-sm"
             >
               Close
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
