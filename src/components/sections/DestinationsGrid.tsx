"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

const destinations = ["Kathmandu", "Chitwan", "Pokhara", "Lumbini", "Everest Region", "Annapurna", "Manaslu", "Langtang", "Upper Mustang", "Rara Lake"];

export default function DestinationsGrid() {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-8 sm:mb-20">
        <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm mb-2 sm:mb-4 block">Our Coverage</span>
        <h2 className="text-2xl xs:text-3xl md:text-6xl font-bold mb-4 sm:mb-6">Explore Every Corner of Nepal</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-xs xs:text-sm sm:text-lg leading-relaxed px-4 sm:px-0">
          From the cultural heart of the Kathmandu Valley to the adventurous trails of the Everest and Annapurna regions.
        </p>
      </div>
      
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {destinations.map((dest, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group p-3 sm:p-6 rounded-xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-500 text-center cursor-default"
          >
            <p className="text-xs xs:text-sm sm:text-lg font-bold group-hover:scale-105 transition-transform duration-500">{dest}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 sm:mt-20 text-center">
        <div className="inline-flex items-center gap-3 sm:gap-4 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center shrink-0">
             <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <p className="pr-3 sm:pr-6 font-medium text-slate-300 text-[10px] xs:text-xs sm:text-base">All our tours include expert guides and 24/7 on-ground support.</p>
        </div>
      </div>
    </div>
  )
}
