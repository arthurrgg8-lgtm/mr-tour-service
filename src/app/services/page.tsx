import services from "@/data/services.json"
import business from "@/data/business.json"
import { Car, Map as MapIcon, Mountain, Hotel, Calendar, Plane, Heart, ChevronRight, MessageCircle, Bus, Users, ShieldCheck, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ImageSlider from "@/components/ui/ImageSlider"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import EnquireButton from "@/components/ui/EnquireButton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our premium travel services in Nepal: Car and SUV rentals, 4x4 Jeep expeditions, luxury bus hire, cultural tours, and Himalayan trekking.",
}

const iconMap: { [key: string]: any } = {
  Car,
  Map: MapIcon,
  Mountain,
  Hotel,
  Calendar,
  Plane,
  Heart,
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
            alt="Services Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              From the highest peaks of the Himalayas to the bustling streets of Kathmandu, 
              we provide complete travel solutions to make your visit to Nepal unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon]
              const isEven = index % 2 === 0
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="group relative"
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                    <div className="lg:w-2/5">
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{service.title}</h2>
                      
                      <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {service.details || service.description}
                      </p>
                      
                      <EnquireButton>Enquire Now</EnquireButton>
                    </div>

                    <div className="lg:w-3/5 w-full">
                      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 relative group/slider aspect-[16/10]">
                        <ImageSlider 
                          images={(service as any).images || [(service as any).image]} 
                          alt={service.title} 
                        />
                      </div>
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
