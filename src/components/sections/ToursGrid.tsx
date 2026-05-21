"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, Compass } from "lucide-react"
import TourModal from "@/components/ui/TourModal"
import tourDetails from "@/data/tour_details.json"

interface SubService {
  name: string;
  image: string;
  duration?: string;
  startingPrice?: string;
}

interface ToursGridProps {
  subServices: SubService[];
}

export default function ToursGrid({ subServices }: ToursGridProps) {
  const [selectedTour, setSelectedTour] = useState<typeof tourDetails[0] | null>(null)

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
    
    return n
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-');
  }

  useEffect(() => {
    const handleHash = () => {
      const hash = decodeURIComponent(window.location.hash.substring(1).toLowerCase())
      if (hash) {
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
      const hash = getTourId(tourName)
      window.history.pushState(null, "", `#${hash}`)
    }
  }

  return (
    <>
      <TourModal 
        tour={selectedTour} 
        onClose={() => {
          setSelectedTour(null)
          window.history.pushState(null, "", window.location.pathname + window.location.search)
        }} 
        onSelectSubPackage={handleTourClick}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subServices.map((tour, idx) => (
          <div 
            key={idx}
            id={getTourId(tour.name)} 
            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer scroll-mt-32"
            onClick={() => handleTourClick(tour.name)}
          >
            <Image 
              src={tour.image} 
              alt={tour.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Compass className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Explore Destination</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">{tour.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                Experience the beauty and culture of {tour.name.toLowerCase()} with our curated itinerary. 
                Professional guides and premium transportation included.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-white font-bold text-sm uppercase tracking-widest">{tour.duration} Trip</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
