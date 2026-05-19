"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, CheckCircle2, Phone, MessageCircle, ArrowLeft, Clock, Mountain, Award, Banknote, Backpack, Tent, Info, Car } from "lucide-react"
import business from "@/data/business.json"
import fleet from "@/data/fleet.json"
import Image from "next/image"
import Link from "next/link"

interface ItineraryItem {
  day: string;
  title: string;
  desc: string;
}

interface SubPackage {
  name: string;
  duration: string;
  image: string;
  details: string;
  startingPrice?: string;
  maxAltitude?: string;
  difficulty?: string;
}

interface TourDetail {
  id: string;
  title: string;
  image?: string;
  tagline: string;
  highlights: string[];
  description: string;
  duration?: string;
  startingPrice?: string;
  maxAltitude?: string;
  difficulty?: string;
  recommendedTransport?: string[];
  itinerary?: ItineraryItem[];
  subPackages?: SubPackage[];
}

interface TourModalProps {
  tour: TourDetail | null;
  onClose: () => void;
  onSelectSubPackage?: (packageName: string) => void;
  onBack?: () => void;
}

export default function TourModal({ tour, onClose, onSelectSubPackage, onBack }: TourModalProps) {
  // Map difficulty string to a numeric value for the meter
  const getDifficultyScore = (diff?: string) => {
    const d = diff?.toLowerCase() || "";
    if (d.includes('hard') || d.includes('strenuous')) return 5;
    if (d.includes('moderate-hard')) return 4;
    if (d.includes('moderate')) return 3;
    if (d.includes('easy-moderate')) return 2;
    return 1;
  };

  const difficultyScore = tour ? getDifficultyScore(tour.difficulty) : 0;
  const isTrek = tour ? (tour.id.startsWith('trek-') || tour.title.toLowerCase().includes('trek')) : false;

  return (
    <AnimatePresence>
      {tour && (
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
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header with Full Background Image */}
            <div className="relative h-72 md:h-96 bg-slate-900 text-white shrink-0 overflow-hidden">
               {/* Background Image */}
               {tour.image && (
                 <Image 
                   src={tour.image} 
                   alt={tour.title}
                   fill
                   className="object-cover"
                   priority
                 />
               )}
               
               {/* Overlays for Readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
               <div className="absolute inset-0 bg-black/20" />
               
               <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                  {onBack && (
                    <button 
                      onClick={onBack}
                      className="absolute top-6 left-6 h-10 px-4 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center gap-2 transition-colors border border-white/20 text-white font-bold text-sm"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to Packages
                    </button>
                  )}
                  <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center transition-colors border border-white/20"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <div className="max-w-3xl mb-12">
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-2 block drop-shadow-md">{tour.tagline}</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-lg">{tour.title}</h2>
                  </div>
               </div>

               {/* Quick Info Bar */}
               {(tour.duration || tour.startingPrice || tour.maxAltitude || tour.difficulty) && (
                 <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-4 z-20">
                   <div className="container mx-auto px-8 md:px-12 flex flex-wrap gap-8 md:gap-16">
                     {tour.duration && (
                       <div className="flex flex-col">
                         <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Duration</span>
                         <div className="flex items-center gap-2">
                           <Clock className="h-4 w-4 text-primary" />
                           <span className="text-sm font-bold uppercase">{tour.duration}</span>
                         </div>
                       </div>
                     )}
                     {tour.maxAltitude && (
                       <div className="flex flex-col">
                         <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Max Alt</span>
                         <div className="flex items-center gap-2">
                           <Mountain className="h-4 w-4 text-primary" />
                           <span className="text-sm font-bold uppercase">{tour.maxAltitude}</span>
                         </div>
                       </div>
                     )}
                     {tour.difficulty && (
                       <div className="flex flex-col">
                         <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Difficulty</span>
                         <div className="flex items-center gap-2">
                           <Award className="h-4 w-4 text-primary" />
                           <div className="flex items-center gap-1">
                              <span className="text-sm font-bold uppercase mr-2">{tour.difficulty}</span>
                              <div className="flex gap-0.5">
                                 {[1, 2, 3, 4, 5].map((s) => (
                                   <div key={s} className={`h-1.5 w-3 rounded-full ${s <= difficultyScore ? 'bg-primary' : 'bg-white/20'}`} />
                                 ))}
                              </div>
                           </div>
                         </div>
                       </div>
                     )}
                     {tour.startingPrice && (
                       <div className="flex flex-col ml-auto">
                         <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 text-right">Estimate</span>
                         <div className="flex items-center gap-2">
                           <Banknote className="h-4 w-4 text-primary" />
                           <span className="text-lg font-bold">From {tour.startingPrice}</span>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               )}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 {/* Left Side: Overview & Highlights (7/12) */}
                 <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold flex items-center gap-3">
                         <Info className="h-6 w-6 text-primary" /> Journey Overview
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {tour.description}
                      </p>
                    </div>

                    {tour.itinerary ? (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                          <Calendar className="h-6 w-6 text-primary" /> Day-to-Day Itinerary
                        </h3>
                        <div className="space-y-8 relative">
                          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100" />
                          
                          {tour.itinerary.map((step, i) => (
                            <div key={i} className="relative pl-16 group">
                              <div className="absolute left-[1.125rem] top-1 h-3 w-3 rounded-full border-2 border-primary bg-white z-10 group-hover:bg-primary transition-colors" />
                              <div className="space-y-2">
                                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Day {step.day}</span>
                                  <h4 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors">{step.title}</h4>
                                  <p className="text-slate-600 leading-relaxed">
                                    {step.desc}
                                  </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : tour.subPackages ? (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                          <MapPin className="h-6 w-6 text-primary" /> Explore All Routes
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {tour.subPackages.map((pkg, i) => (
                            <div 
                              key={i} 
                              onClick={() => onSelectSubPackage?.(pkg.name)}
                              className="group/pkg relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                            >
                               <div className="aspect-[16/10] relative overflow-hidden">
                                 <Image 
                                   src={pkg.image} 
                                   alt={pkg.name}
                                   fill
                                   className="object-cover group-hover/pkg:scale-110 transition-transform duration-700"
                                 />
                                 <div className="absolute top-4 right-4 px-4 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-primary text-xs font-bold tracking-wider shadow-lg">
                                   {pkg.duration}
                                 </div>
                                 <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md p-3 flex gap-4">
                                    {pkg.maxAltitude && (
                                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase">
                                        <Mountain className="h-3.5 w-3.5 text-primary" /> {pkg.maxAltitude}
                                      </div>
                                    )}
                                    {pkg.difficulty && (
                                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase">
                                        <Award className="h-3.5 w-3.5 text-primary" /> {pkg.difficulty}
                                      </div>
                                    )}
                                 </div>
                               </div>
                               <div className="p-6">
                                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover/pkg:text-primary transition-colors">{pkg.name}</h4>
                                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                    {pkg.details}
                                  </p>
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                 </div>

                 {/* Right Side: Essentials & Contact (5/12) */}
                 <div className="lg:col-span-5 space-y-10">
                    {/* Highlights Card */}
                    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-6 shadow-sm">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                         <CheckCircle2 className="h-6 w-6 text-primary" /> Trip Highlights
                      </h3>
                      <ul className="space-y-4">
                        {tour.highlights.map((h, i) => (
                          <li key={i} className="flex gap-4 text-slate-700 font-medium leading-snug">
                             <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                             </div>
                             {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Trek/Tour Essentials Sidebar */}
                    {isTrek && (
                      <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-8">
                         <h3 className="text-xl font-bold flex items-center gap-3">
                            <Backpack className="h-6 w-6 text-primary" /> Trek Essentials
                         </h3>
                         
                         <div className="space-y-6">
                            <div className="flex gap-4">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                  <Award className="h-5 w-5" />
                               </div>
                               <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Permits Needed</p>
                                  <p className="text-sm font-bold text-slate-800">TIMS & National Park Entry</p>
                               </div>
                            </div>
                            <div className="flex gap-4">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                  <Tent className="h-5 w-5" />
                               </div>
                               <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Accommodation</p>
                                  <p className="text-sm font-bold text-slate-800">Teahouses & Mountain Lodges</p>
                               </div>
                            </div>
                            <div className="flex gap-4">
                               <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0">
                                  <Calendar className="h-5 w-5" />
                               </div>
                               <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Best Season</p>
                                  <p className="text-sm font-bold text-slate-800">Spring (Mar-May) & Autumn (Sep-Nov)</p>
                               </div>
                            </div>
                         </div>

                         <div className="pt-6 border-t border-primary/10">
                            <p className="text-sm font-medium text-slate-600 italic">
                               * We handle all permit processing and logistics for you.
                            </p>
                         </div>
                      </div>
                    )}

                    {/* Recommended Transport Card */}
                    <div className="p-8 rounded-[2rem] bg-slate-900 text-white space-y-6 shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                       <h3 className="text-xl font-bold flex items-center gap-3 relative z-10">
                          <Car className="h-6 w-6 text-primary" /> Recommended Transport
                       </h3>
                       <p className="text-slate-400 text-sm relative z-10">
                          Reach the trailhead in comfort with our premium owned fleet.
                       </p>
                       
                       <div className="space-y-3 relative z-10">
                          {isTrek ? (
                            <Link 
                              href="/services#jeep-rent"
                              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                            >
                               <div className="flex items-center gap-3">
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                  <span className="font-bold text-sm uppercase tracking-wide">4x4 Off-Road Jeep</span>
                               </div>
                               <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                            </Link>
                          ) : (
                            <Link 
                              href="/services#suv-rent"
                              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                            >
                               <div className="flex items-center gap-3">
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                  <span className="font-bold text-sm uppercase tracking-wide">Premium SUV Rental</span>
                               </div>
                               <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                            </Link>
                          )}
                          <Link 
                            href="/services#hiace-rent"
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                          >
                             <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                <span className="font-bold text-sm uppercase tracking-wide">Toyota Hiace (Group)</span>
                             </div>
                             <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                          </Link>
                       </div>
                    </div>

                    {/* Immediate Action Box */}
                    <div className="p-8 rounded-[2rem] bg-primary text-white space-y-6 shadow-2xl shadow-primary/30 text-center">
                       <h3 className="text-2xl font-bold">Ready to Explore?</h3>
                       <p className="text-white/80 font-medium">Get a personalized itinerary and custom quote within 24 hours.</p>
                       <div className="flex flex-col gap-3">
                          <a 
                            href={`https://wa.me/${business.contact.whatsapp}`}
                            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-white text-primary font-bold hover:bg-slate-100 transition-all shadow-lg"
                          >
                            <MessageCircle className="h-6 w-6" /> WhatsApp Inquiry
                          </a>
                          <a 
                            href={`tel:${business.contact.phone}`}
                            className="flex items-center justify-center gap-3 h-14 rounded-2xl bg-primary-foreground/10 text-white font-bold border border-white/20 hover:bg-white/10 transition-all"
                          >
                            <Phone className="h-6 w-6" /> Call Directly
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 p-6 md:px-12 bg-slate-50 border-t flex items-center justify-between">
               <p className="text-xs text-muted-foreground italic max-w-md">
                 * This trip can be redesigned as per your preferences. All itineraries are flexible.
               </p>
               <button 
                 onClick={onClose}
                 className="h-12 px-10 rounded-xl bg-white border border-slate-200 font-bold hover:bg-slate-100 transition-all shadow-sm"
               >
                 Close Window
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
