"use client"

import services from "@/data/services.json"
import tourDetails from "@/data/tour_details.json"
import { Map as MapIcon, Users, Clock } from "lucide-react"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import TourModal from "@/components/ui/TourModal"
import { useState, useEffect } from "react"

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

const tourService = (services as Service[]).find(s => s.id === 'tour-packages')

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<typeof tourDetails[0] | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = decodeURIComponent(window.location.hash.substring(1).toLowerCase())
      if (hash) {
        // Try to find a tour that matches the hash with high precision
        const searchHash = hash.replace(/-/g, ' ')
        const firstWord = hash.split('-')[0]
        
        const detail = tourDetails.find(d => {
          const title = d.title.toLowerCase()
          const id = d.id.toLowerCase()
          return id === hash || 
                 title.includes(searchHash) || 
                 (firstWord.length > 3 && title.includes(firstWord)) ||
                 id.includes(hash)
        })
        if (detail) {
          setSelectedTour(detail)
        }
      } else {
        setSelectedTour(null)
      }
    }
    
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const handleTourClick = (tourName: string) => {
    const detail = tourDetails.find(d => d.title === tourName)
    if (detail) {
      setSelectedTour(detail)
      // Update hash for deep linking when clicking manually
      const hash = getTourId(tourName)
      window.history.pushState(null, "", `#${hash}`)
    }
  }

  const getTourId = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('countryside')) return 'countryside-hike';
    if (n.includes('family') && !n.includes('holidays in nepal')) return 'family-holiday';
    if (n.includes('lumbini') && !n.includes('chitwan') && !n.includes('pilgrimage') && !n.includes('spiritual')) return 'lumbini-tour';
    if (n.includes('chitwan') && !n.includes('lumbini') && !n.includes('ghandruk') && !n.includes('holidays')) return 'chitwan-safari';
    if (n.includes('gorkha')) return 'gorkha-bandipur';
    if (n.includes('badimalika')) return 'badimalika-tour';
    if (n.includes('rara') && !n.includes('8 days')) return 'rara-jeep';
    if (n.includes('city tour')) return 'kathmandu-city';
    
    // Dynamic slug fallback for new tours
    return n
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .trim()
      .replace(/[\s-]+/g, '-');    // replace spaces/dashes with a single dash
  }

  if (!tourService) return null

  return (
    <div className="pt-20 pb-24">
      <TourModal 
        tour={selectedTour} 
        onClose={() => {
          setSelectedTour(null)
          // Clear hash on close to allow re-opening same tour from navbar
          window.history.pushState(null, "", window.location.pathname + window.location.search)
        }} 
        onSelectSubPackage={handleTourClick}
      />

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

      {/* Tours Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Curated Experiences</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Popular Tours</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tourService.subServices?.map((tour, idx) => (
              <div 
                key={idx}
                id={getTourId(tour.name)} 
                className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden scroll-mt-32"
              >
                <div 
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => handleTourClick(tour.name)}
                >
                  <Image 
                    src={tour.image} 
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-wider bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <Clock className="h-3 w-3" />
                      {tour.duration}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 h-14">{tour.name}</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                        <Users className="h-4 w-4" />
                      </div>
                      <span>Small & Large Groups</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary">
                        <MapIcon className="h-4 w-4" />
                      </div>
                      <span>Professional Guides</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button 
                      onClick={() => handleTourClick(tour.name)}
                      className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
