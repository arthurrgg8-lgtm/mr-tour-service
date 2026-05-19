import Hero from "@/components/sections/Hero"
import FeaturedServices from "@/components/sections/FeaturedServices"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import ScrollAnimation from "@/components/ui/ScrollAnimation"
import Link from "next/link"
import Image from "next/image"
import { Map as MapIcon, MessageCircle, Phone } from "lucide-react"
import business from "@/data/business.json"

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollAnimation>
        <FeaturedServices />
      </ScrollAnimation>
      <ScrollAnimation>
        <WhyChooseUs />
      </ScrollAnimation>
      
      {/* Fleet Teaser Section */}
      <ScrollAnimation>
        <section className="py-24 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Premium Fleet</h2>
              <p className="text-muted-foreground text-lg">
                We own a diverse fleet of well-maintained vehicles to suit every group size and terrain. 
                From luxury sedans to powerful 4x4 jeeps and spacious buses.
              </p>
            </div>
            <Link 
              href="/fleet"
              className="text-primary font-bold inline-flex items-center gap-2 text-lg border-b-2 border-primary"
            >
              View Full Fleet
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group overflow-hidden rounded-2xl border bg-slate-50">
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image 
                  src="/images/fleet/fortuner-new.jpg" 
                  alt="Toyota Fortuner"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Toyota Fortuner</h3>
                <p className="text-sm text-muted-foreground mb-4">Ultimate luxury for all terrains.</p>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Premium SUV</span>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border bg-slate-50">
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image 
                  src="/images/fleet/byd-atto3.jpg" 
                  alt="Electric Vehicles"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Electric Vehicles</h3>
                <p className="text-sm text-muted-foreground mb-4">Eco-friendly premium electric SUV.</p>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Electric Luxury</span>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border bg-slate-50">
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image 
                  src="/images/fleet/hiace-fleet.jpg" 
                  alt="Toyota Hiace"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Toyota Hiace</h3>
                <p className="text-sm text-muted-foreground mb-4">Comfortable group travel gold standard.</p>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Group Travel</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollAnimation>

      {/* Gallery Teaser Section */}
      <ScrollAnimation>
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Journey in Pictures</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Explore our collection of travel memories, professional fleet, and happy customers across the diverse landscapes of Nepal.
            </p>
            <Link 
              href="/gallery"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-10 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              View Full Gallery
            </Link>
          </div>
        </section>
      </ScrollAnimation>

      {/* Map Section */}
      <ScrollAnimation>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Visit Our Office</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Find Us in <br /> <span className="text-primary">Kathmandu</span></h2>
                <div className="space-y-6">
                   <div className="flex gap-4">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                       <MapIcon className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="font-bold text-lg">Our Location</p>
                       <p className="text-muted-foreground">{business.contact.location}</p>
                     </div>
                   </div>
                   <div className="flex gap-4">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                       <Phone className="h-6 w-6" />
                     </div>
                     <div>
                       <p className="font-bold text-lg">Call Us</p>
                       <p className="text-muted-foreground">{business.contact.phone}</p>
                     </div>
                   </div>
                   <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                     <p className="text-sm font-medium text-slate-600 italic">&quot;We are available 24/7 at our office and online to assist with your travel needs across Nepal.&quot;</p>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-2 h-[450px] w-full rounded-3xl overflow-hidden border shadow-2xl relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.148671524317!2d85.3353!3d27.7118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x827102c6c7458d07%3A0x68a8193a22c56a7e!2sManoranjan%20Ramjham%20Travel%20and%20Tour%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1716000000000!5m2!1sen!2snp" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation>
        <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Contact us today for a personalized quote or to book your vehicle. 
            We are available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href={`https://wa.me/${business.contact.whatsapp}`}
              className="inline-flex items-center justify-center gap-3 h-14 px-10 rounded-xl bg-white text-primary font-bold text-lg hover:bg-slate-100 transition-all shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
              WhatsApp Us
            </Link>
            <Link 
              href={`tel:${business.contact.phone}`}
              className="inline-flex items-center justify-center gap-3 h-14 px-10 rounded-xl bg-primary-foreground/10 text-white font-bold text-lg border border-white/20 hover:bg-white/10 transition-all"
            >
              <Phone className="h-6 w-6" />
              Call Now
            </Link>
          </div>
        </div>
      </section>
      </ScrollAnimation>
    </>
  )
}
