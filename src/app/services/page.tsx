"use client"

import services from "@/data/services.json"
import tourDetails from "@/data/tour_details.json"
import { Car, Map as MapIcon, Mountain, Bus, Users, ShieldCheck, Info } from "lucide-react"
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

const typedServices = services as Service[];

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Car,
  Map: MapIcon,
  Mountain,
  Bus,
  Users,
  ShieldCheck
}

export default function ServicesPage() {
  const [selectedTour, setSelectedTour] = useState<typeof tourDetails[0] | null>(null)

  const handleTourClick = (tourName: string) => {
    const detail = tourDetails.find(d => d.title === tourName || (d.id === 'trek-everest' && tourName === 'Everest Region'))
    if (detail) {
      setSelectedTour(detail)
    }
  }

  return (
    <div className="pt-20 pb-24">
      {/* Tour Detail Modal */}
      <TourModal 
        tour={selectedTour} 
        onClose={() => setSelectedTour(null)} 
        onSelectSubPackage={handleTourClick}
        onBack={selectedTour?.id.startsWith('trek-') && selectedTour.id !== 'trek-everest' ? () => handleTourClick('Everest Region') : undefined}
      />

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
          <div className="space-y-32">
            {typedServices.map((service, index) => {
              const Icon = iconMap[service.icon] || MapIcon
              const isEven = index % 2 === 0
              const displayImages = service.images?.slice(0, 4) || []
              
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className="group relative"
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                    {/* Text Side */}
                    <div className="lg:w-2/5 space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                          <Icon className="h-8 w-8" />
                        </div>
                        {service.startingPrice && (
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Starting From</span>
                            <span className="text-2xl font-bold text-slate-900">{service.startingPrice} <span className="text-sm font-medium text-muted-foreground">{service.id.includes('rent') ? '/ per day' : ''}</span></span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{service.title}</h2>
                        {service.capacity && (
                          <div className="flex items-center gap-2 mb-6">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="font-bold text-slate-700">Capacity: {service.capacity}</span>
                          </div>
                        )}
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          {service.details || service.description}
                        </p>
                      </div>
                      
                      <div className="pt-4">
                         <EnquireButton>Enquire for {service.title}</EnquireButton>
                      </div>
                    </div>

                    {/* Visual Side */}
                    <div className="lg:w-3/5 w-full h-[500px] md:h-[600px]">
                      {/* For Trekking and Tours: Restore the full container and specialized cards */}
                      {(service.id === 'trekking' || service.id === 'tour-packages') ? (
                        <div className={`p-8 md:p-12 rounded-[2.5rem] ${isEven ? 'bg-slate-50' : 'bg-primary/5'} border border-slate-100 relative overflow-hidden h-full flex flex-col`}>
                           {/* Background Decoration */}
                           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-20" />
                           
                           <div className="relative z-10 flex flex-col h-full">
                              <div className="flex-grow overflow-y-auto pr-4 mb-8 custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                  {(service.id === 'trekking' ? service.regions : service.subServices)?.map((item, idx: number) => (
                                    <div 
                                      key={idx} 
                                      onClick={() => (service.id === 'tour-packages' || item.name === 'Everest Region') && handleTourClick((item as any).name)}
                                      className={`relative group/item h-40 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 ${(service.id === 'tour-packages' || item.name === 'Everest Region') ? 'cursor-pointer' : ''}`}
                                    >
                                      {item.image && (
                                        <Image 
                                          src={item.image} 
                                          alt={(item as SubService | Region).name}
                                          fill
                                          className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                                        />
                                      )}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                      
                                      {/* Info Overlay for Tours and Everest Trek */}
                                      {(service.id === 'tour-packages' || item.name === 'Everest Region') && (
                                        <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                           <Info className="h-4 w-4 text-white" />
                                        </div>
                                      )}

                                      <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                        {service.id !== 'trekking' && (
                                          <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                              <MapIcon className="h-4 w-4 text-primary" />
                                              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                                                {(item as SubService).duration || 'Tour Package'}
                                              </span>
                                            </div>
                                            {(item as SubService).startingPrice && (
                                              <span className="text-xs font-bold text-white bg-primary px-2 py-0.5 rounded">
                                                {(item as SubService).startingPrice}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                        <span className="font-bold text-white text-base md:text-lg leading-tight group-hover/item:text-primary transition-colors">{(item as SubService | Region).name}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="shrink-0 pt-2 border-t border-slate-100">
                                <EnquireButton variant="full" />
                              </div>
                           </div>
                        </div>
                      ) : (
                        /* For Vehicles: Show the Image Slideshow */
                        <ImageSlideshow images={service.images || []} />
                      )}
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
