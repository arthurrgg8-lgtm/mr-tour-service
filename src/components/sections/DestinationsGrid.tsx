"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

const destinations = ["Kathmandu", "Chitwan", "Pokhara", "Lumbini", "Everest Region", "Annapurna", "Manaslu", "Langtang", "Upper Mustang", "Rara Lake"];

export default function DestinationsGrid() {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-20">
        <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our Coverage</span>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Explore Every Corner of Nepal</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          From the cultural heart of the Kathmandu Valley to the adventurous trails of the Everest and Annapurna regions.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {destinations.map((dest, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-500 text-center cursor-default"
          >
            <p className="text-lg font-bold group-hover:scale-110 transition-transform duration-500">{dest}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-4 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
             <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="pr-6 font-medium text-slate-300">All our tours include expert guides and 24/7 on-ground support.</p>
        </div>
      </div>
    </div>
  )
}
