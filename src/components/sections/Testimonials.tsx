"use client"

import testimonials from "@/data/testimonials.json"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Travelers Say</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Here is what some of our 1000+ happy clients have to say about their journey with us.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "bg-white/5 border border-white/10 p-4 xs:p-6 sm:p-8 rounded-[1.25rem] sm:rounded-[2rem] relative group hover:bg-white/10 transition-all duration-500",
                idx === 2 && "col-span-2 md:col-span-1"
              )}
            >
              <Quote className="absolute top-4 right-6 sm:top-6 sm:right-8 h-8 w-8 sm:h-12 sm:w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-slate-300 mb-6 sm:mb-8 leading-snug sm:leading-relaxed italic text-[11px] xs:text-xs sm:text-base">
                &quot;{t.text}&quot;
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-base sm:text-xl shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-xs sm:text-base leading-tight">{t.name}</p>
                  <p className="text-[9px] sm:text-xs text-slate-500 uppercase tracking-widest leading-none mt-1 sm:mt-1.5">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
