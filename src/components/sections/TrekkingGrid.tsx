"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, Compass } from "lucide-react"
import TourModal from "@/components/ui/TourModal"
import tourDetails from "@/data/tour_details.json"

interface SubPackage {
  name: string;
  duration: string;
  image: string;
}

interface Region {
  name: string;
  image: string;
  subPackages?: SubPackage[];
}

interface TrekkingGridProps {
  regions: Region[];
}

export default function TrekkingGrid({ regions }: TrekkingGridProps) {
  const [selectedTour, setSelectedTour] = useState<typeof tourDetails[0] | null>(null)
  const [activeRegion, setActiveRegion] = useState<Region | null>(null)

  const getRegionId = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }

  useEffect(() => {
    const handleHash = () => {
      const hash = decodeURIComponent(window.location.hash.substring(1).toLowerCase())
      if (hash) {
        // Try to find if it's a region first
        const region = regions.find(r => getRegionId(r.name) === hash)
        if (region) {
          setActiveRegion(region)
          setSelectedTour(null)
          return
        }

        // Try to find if it's a specific trek
        let detail = tourDetails.find(d => d.id.toLowerCase() === hash)
        
        if (!detail) {
          const searchHash = hash.replace(/-/g, ' ')
          detail = tourDetails.find(d => {
            const title = d.title.toLowerCase()
            const id = d.id.toLowerCase()
            return id.includes(hash) || title.includes(searchHash)
          })
        }

        if (detail) {
          setSelectedTour(detail)
          // Find which region this trek belongs to
          const region = regions.find(r => 
            r.subPackages?.some(sp => sp.name.toLowerCase() === detail?.title.toLowerCase())
          )
          if (region) setActiveRegion(region)
        }
      } else {
        setSelectedTour(null)
        setActiveRegion(null)
      }
    }
    
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [regions])

  const handleRegionClick = (region: Region) => {
    setActiveRegion(region)
    setSelectedTour(null)
    const hash = getRegionId(region.name)
    window.history.pushState(null, "", `#${hash}`)
    
    // Scroll to the grid top
    const element = document.getElementById('trekking-top')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleTourClick = (tourName: string) => {
    const normalizedName = tourName.toLowerCase()
    
    const detail = tourDetails.find(d => {
      const title = d.title.toLowerCase()
      const id = d.id.toLowerCase()
      return id === normalizedName || title === normalizedName || id.includes(normalizedName)
    })

    if (detail) {
      setSelectedTour(detail)
      window.history.pushState(null, "", `#${detail.id}`)
    }
  }

  const getBackHandler = () => {
    if (selectedTour && activeRegion) {
      return () => {
        setSelectedTour(null)
        window.history.pushState(null, "", `#${getRegionId(activeRegion.name)}`)
      }
    }
    if (activeRegion) {
      return () => {
        setActiveRegion(null)
        window.history.pushState(null, "", window.location.pathname)
      }
    }
    return undefined;
  }

  if (activeRegion && !selectedTour) {
    return (
      <div id="trekking-top" className="scroll-mt-32">
        <button 
          onClick={() => {
            setActiveRegion(null)
            window.history.pushState(null, "", window.location.pathname)
          }}
          className="flex items-center gap-2 text-primary font-bold mb-8 hover:gap-4 transition-all"
        >
          <Compass className="h-5 w-5 rotate-180" />
          Back to Regions
        </button>

        <div className="mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{activeRegion.name}</h3>
          <p className="text-muted-foreground text-lg">Select a trekking package to view detailed itinerary.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeRegion.subPackages?.map((pkg, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleTourClick(pkg.name)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={pkg.image} 
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{pkg.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <span className="text-primary font-bold text-sm">View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div id="trekking-top" className="scroll-mt-32">
      <TourModal 
        tour={selectedTour} 
        onClose={() => {
          setSelectedTour(null)
          if (activeRegion) {
            window.history.pushState(null, "", `#${getRegionId(activeRegion.name)}`)
          } else {
            window.history.pushState(null, "", window.location.pathname)
          }
        }} 
        onSelectSubPackage={handleTourClick}
        onBack={getBackHandler()}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regions.map((region, idx) => (
          <div 
            key={idx}
            id={getRegionId(region.name)}
            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer scroll-mt-32"
            onClick={() => handleRegionClick(region)}
          >
            <Image 
              src={region.image} 
              alt={region.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Compass className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Explore Region</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{region.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                Discover legendary trails and breathtaking peaks in the {region.name}. 
                Professional guides and complete logistics included.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-white font-bold text-sm uppercase tracking-widest">View Packages</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
