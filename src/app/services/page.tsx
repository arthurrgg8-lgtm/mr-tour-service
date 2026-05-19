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
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
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
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center lg:items-start`}>
                    <div className="lg:w-2/5">
                      <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                        <Icon className="h-10 w-10" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{service.title}</h2>
                      
                      {/* Service Image Slider */}
                      <ImageSlider 
                        images={(service as any).images || [(service as any).image]} 
                        alt={service.title} 
                      />

                      <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {service.details || service.description}
                      </p>
                      
                      <EnquireButton>Enquire Now</EnquireButton>
                    </div>

                    <div className="lg:w-3/5 w-full">
                      <div className={`p-8 md:p-12 rounded-[2.5rem] ${isEven ? 'bg-slate-50' : 'bg-primary/5'} border border-slate-100 relative overflow-hidden`}>
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        
                        <div className="relative z-10">
                          {(service as any).subServices && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {(service as any).subServices.map((sub: any, idx: number) => (
                                typeof sub === 'string' ? (
                                  <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                                    <span className="font-bold text-slate-800">{sub}</span>
                                  </div>
                                ) : (
                                  <div 
                                    key={idx} 
                                    className="relative group/sub h-32 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
                                  >
                                    <Image 
                                      src={sub.image} 
                                      alt={sub.name}
                                      fill
                                      className="object-cover group-hover/sub:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                      <span className="font-bold text-white text-sm md:text-base leading-tight group-hover/sub:text-primary transition-colors">{sub.name}</span>
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          )}

                          {(service as any).regions && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              {(service as any).regions.map((region: any, idx: number) => (
                                <div 
                                  key={idx} 
                                  className="relative group/item h-40 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                  {region.image && (
                                    <Image 
                                      src={region.image} 
                                      alt={region.name}
                                      fill
                                      className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <div className="flex items-center gap-2 mb-1">
                                      <MapIcon className="h-4 w-4 text-primary" />
                                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Trek Route</span>
                                    </div>
                                    <span className="font-bold text-white text-base md:text-lg leading-tight group-hover/item:text-primary transition-colors">{region.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {!(service as any).subServices && !(service as any).regions && (
                            <div className="h-full min-h-[250px] rounded-3xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center p-12 text-center">
                              <div>
                                <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-muted-foreground font-medium italic">Detailed itinerary and seasonal packages coming soon. <br /> Contact us for custom planning.</p>
                              </div>
                            </div>
                          )}

                          {/* Price/Details Note */}
                          <EnquireButton variant="full" />
                        </div>
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
