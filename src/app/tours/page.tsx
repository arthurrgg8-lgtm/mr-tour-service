import type { Metadata } from "next"
import services from "@/data/services.json"
import business from "@/data/business.json"
import { Users, Map as MapIcon, Compass } from "lucide-react"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import ToursGrid from "@/components/sections/ToursGrid"

interface SubService {
  name: string;
  image: string;
  duration?: string;
  startingPrice?: string;
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
}

export const metadata: Metadata = {
  title: "Tour Packages in Nepal",
  description: `Experience the best of Nepal with ${business.name}. From Kathmandu city tours to luxury jungle safaris in Chitwan and pilgrimage tours to Lumbini, our curated tour packages offer something for everyone.`,
}

const tourService = (services as Service[]).find(s => s.id === 'tour-packages')

export default function ToursPage() {
  if (!tourService) return null

  return (
    <div className="pt-20 pb-24">
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/hero-triple-tour.jpeg" 
            alt="Tours Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Nepal Tour Packages</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Discover the cultural richness and natural beauty of Nepal through our curated tour packages. 
              From ancient heritage sites to lush jungles, we take you to the heart of the Himalayas.
            </p>
          </div>
        </div>
      </section>

      {/* Tours Grid Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Curated Experiences</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Popular Tours</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <ToursGrid subServices={tourService.subServices || []} />
        </div>
      </section>

      {/* Why Tour With Us */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Comfort & Heritage <br /> <span className="text-primary">The MR Tour Experience</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Professional Guides</h4>
                    <p className="text-slate-600">Our tours are led by knowledgeable local guides who bring history and culture to life with fascinating stories.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Curated Itineraries</h4>
                    <p className="text-slate-600">We carefully design our tour routes to balance iconic landmarks with hidden gems and local experiences.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Compass className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Premium Comfort</h4>
                    <p className="text-slate-600">Travel in style with our 100% company-owned fleet of luxury vehicles and hand-picked accommodations.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/hero/hero-triple-tour.jpeg" 
                alt="Tour Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 relative overflow-hidden text-white text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em]">EXCLUSIVE OFFERS COMING SOON!</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Planning Your Trip</h2>
            <p className="text-muted-foreground text-lg">Send us an inquiry and our experts will get back to you within 24 hours.</p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>
    </div>
  )
}
