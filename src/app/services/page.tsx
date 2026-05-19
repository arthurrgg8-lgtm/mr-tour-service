"use client"

import services from "@/data/services.json"
import tourDetails from "@/data/tour_details.json"
import business from "@/data/business.json"
import { Car, Map as MapIcon, Mountain, Bus, Users, ShieldCheck, Award } from "lucide-react"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import EnquireButton from "@/components/ui/EnquireButton"
import TourModal from "@/components/ui/TourModal"
import { useState } from "react"

import ImageSlideshow from "@/components/ui/ImageSlideshow"

interface SubService {
  name: string;
  image: string;
  duration?: string;
  startingPrice?: string;
}

interface Region {
  name: string;
  image: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  images?: string[];
  featured: boolean;
  details: string;
  capacity?: string;
  startingPrice?: string;
  subServices?: SubService[];
  regions?: Region[];
}

const typedServices = (services as Service[]).filter(s => s.id !== 'tour-packages' && s.id !== 'trekking');

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  Users,
  ShieldCheck
}

export default function ServicesPage() {
  return (
    <div className="pt-20 pb-24">
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/services-bg.jpg" 
            alt="Vehicle Fleet Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Premium Fleet</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Experience comfort and safety with our 100% owned vehicle fleet. 
              From luxury SUVs for mountain adventures to comfortable buses for group travel, 
              we have the perfect ride for your journey in Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {typedServices.map((service) => {
              const Icon = iconMap[service.icon] || MapIcon
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="group flex flex-col gap-6 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 scroll-mt-32"
                >
                  {/* Header Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        <Icon className="h-6 w-6 md:h-7 md:w-7" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{service.title}</h2>
                        {service.capacity && (
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Users className="h-3.5 w-3.5 text-primary" />
                            <span className="font-bold text-xs text-slate-600">Capacity: {service.capacity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {service.startingPrice && (
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">Starting From</span>
                        <span className="text-lg md:text-xl font-bold text-slate-900">{service.startingPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Visual Container */}
                  <div className="w-full relative h-[280px] md:h-[320px]">
                    <ImageSlideshow images={service.images || []} />
                  </div>

                  {/* Description & CTA */}
                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed line-clamp-3 min-h-[4.5em]">
                      {service.details || service.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <EnquireButton>Book {service.title}</EnquireButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-24 bg-slate-50 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Request a Vehicle</h2>
            <p className="text-muted-foreground text-lg">Tell us your requirements and we will provide the best vehicle for your trip.</p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        {/* Background Map with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/nepal-map.jpg" 
            alt="Nepal Map"
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-slate-900" />
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our Coverage</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Explore Every Corner of Nepal</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              From the cultural heart of the Kathmandu Valley to the adventurous trails of the Everest and Annapurna regions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {["Kathmandu", "Chitwan", "Pokhara", "Lumbini", "Everest Region", "Annapurna", "Manaslu", "Langtang", "Upper Mustang", "Rara Lake"].map((dest, idx) => (
              <div 
                key={idx}
                className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all duration-500 text-center"
              >
                <p className="text-lg font-bold group-hover:scale-110 transition-transform duration-500">{dest}</p>
              </div>
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
      </section>
    </div>
  )
}
