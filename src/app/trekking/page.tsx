"use client"

import services from "@/data/services.json"
import tourDetails from "@/data/tour_details.json"
import { Award, ShieldCheck, Users, Clock, Compass } from "lucide-react"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import TourModal from "@/components/ui/TourModal"
import { useState, useEffect } from "react"

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
  regions?: Region[];
}

const trekkingService = (services as Service[]).find(s => s.id === 'trekking')

export default function TrekkingPage() {
  const [selectedTour, setSelectedTour] = useState<typeof tourDetails[0] | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = decodeURIComponent(window.location.hash.substring(1).toLowerCase())
      if (hash) {
        // Try to find an exact ID match first (highest priority)
        let detail = tourDetails.find(d => d.id.toLowerCase() === hash)
        
        if (!detail) {
          // If not exact ID, try region overrides
          if (hash === 'everest-region') {
            detail = tourDetails.find(d => d.id === 'trek-everest')
          } else if (hash === 'annapurna-region') {
            detail = tourDetails.find(d => d.id === 'trek-annapurna')
          }
        }

        if (!detail) {
          // Fallback to fuzzy matching if needed
          const searchHash = hash.replace(/-/g, ' ')
          detail = tourDetails.find(d => {
            const title = d.title.toLowerCase()
            const id = d.id.toLowerCase()
            return id.includes(hash) || title.includes(searchHash)
          })
        }

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
    // Normalize names to handle minor variations
    const normalizedName = tourName.toLowerCase()
    
    const detail = tourDetails.find(d => {
      const title = d.title.toLowerCase()
      const id = d.id.toLowerCase()
      
      // Exact ID match is highest priority
      if (id === normalizedName) return true
      
      // Specific hardcoded overrides for region matching
      if (d.id === 'trek-everest' && (normalizedName === 'everest region' || normalizedName === 'everest')) return true
      if (d.id === 'trek-annapurna' && (normalizedName === 'annapurna region' || normalizedName === 'annapurna')) return true
      
      // Generic title match
      return title === normalizedName
    })

    if (detail) {
      setSelectedTour(detail)
      // Update hash for deep linking when clicking manually
      const hash = getRegionId(tourName)
      window.history.pushState(null, "", `#${hash}`)
    }
  }

  const getRegionId = (name: string) => {
    const n = name.toLowerCase();
    
    // Explicitly handle all Annapurna sub-packages to have unique hashes
    if (n.includes('circuit with tilicho')) return 'trek-annapurna-circuit';
    if (n.includes('namun la')) return 'trek-namun-la';
    if (n.includes('lamjung himal')) return 'trek-lamjung-himal';
    if (n.includes('khopra ridge')) return 'trek-khopra-ridge';
    if (n.includes('mardi himal')) return 'trek-mardi-himal';
    if (n.includes('short trip') || (n.includes('abc') && n.includes('short'))) return 'trek-abc-short';
    if (n.includes('nar-phu')) return 'trek-nar-phu';
    if (n.includes('seven passes')) return 'trek-seven-passes';
    if (n.includes('abc via ghorepani') || (n.includes('annapurna base camp') && n.includes('ghorepani'))) return 'trek-annapurna-abc';

    // Everest Sub-packages
    if (n.includes('amadablam')) return 'trek-amadablam';
    if (n.includes('ebc') || n.includes('base camp and kala pathhar')) return 'trek-ebc-kala-pathar';
    if (n.includes('pikey peak')) return 'trek-pikey-peak';
    if (n.includes('three passes')) return 'trek-three-passes';
    if (n.includes('phaplu')) return 'trek-phaplu-ebc';

    // Langtang Sub-packages
    if (n.includes('langtang valley trek')) return 'trek-langtang-valley';
    if (n.includes('gosainkunda')) return 'trek-gosainkunda';
    if (n.includes('tamang heritage')) return 'trek-tamang-heritage';

    // Manaslu Sub-packages
    if (n.includes('manaslu circuit')) return 'trek-manaslu-circuit';
    if (n.includes('tsum valley')) return 'trek-tsum-valley';

    // Dhaulagiri Sub-packages
    if (n.includes('dhaulagiri circuit')) return 'trek-dhaulagiri-circuit';
    
    // Regions
    if (n === 'everest region' || n === 'everest') return 'everest-region';
    if (n === 'annapurna region' || n === 'annapurna') return 'annapurna-region';
    if (n === 'langtang region' || n === 'langtang') return 'langtang-region';
    if (n === 'manaslu & tsum valley' || n === 'manaslu region' || n === 'manaslu') return 'manaslu-trek';
    if (n === 'dhaulagiri trek' || n === 'dhaulagiri') return 'dhaulagiri-trek';
    
    // Fallback logic
    if (n.includes('everest')) return 'everest-region';
    if (n.includes('annapurna')) return 'annapurna-region';
    if (n.includes('langtang')) return 'langtang-region';
    if (n.includes('buddhist')) return 'buddhist-trekking';
    if (n.includes('dhaulagiri')) return 'dhaulagiri-trek';
    if (n.includes('far western')) return 'far-western';
    if (n.includes('dolpo')) return 'dolpo-trek';
    if (n.includes('makalu')) return 'makalu-trek';
    if (n.includes('ght')) return 'ght-trail';
    if (n.includes('mustang')) return 'upper-mustang';
    if (n.includes('manaslu')) return 'manaslu-trek';
    if (n.includes('kailash')) return 'kailash-trek';
    if (n.includes('kanchanjunga')) return 'kanchanjunga-trek';
    if (n.includes('rara')) return 'rara-trek';
    
    return n.split(' ')[0];
  }

  const getBackHandler = () => {
    if (!selectedTour) return undefined;
    
    // If it's an Annapurna sub-package, go back to Annapurna Region
    const annapurnaIds = ['trek-annapurna-abc', 'trek-annapurna-circuit', 'trek-khopra-ridge', 'trek-mardi-himal', 'trek-namun-la', 'trek-lamjung-himal', 'trek-nar-phu', 'trek-seven-passes', 'trek-abc-short'];
    if (selectedTour.id.startsWith('trek-annapurna-') || annapurnaIds.includes(selectedTour.id)) {
      return () => handleTourClick('Annapurna Region');
    }
    
    // If it's an Everest sub-package (not the main one), go back to Everest Region
    const everestIds = ['trek-amadablam', 'trek-ebc-kala-pathar', 'trek-pikey-peak', 'trek-three-passes', 'trek-phaplu-ebc'];
    if (selectedTour.id.startsWith('trek-everest-') || everestIds.includes(selectedTour.id)) {
      return () => handleTourClick('Everest Region');
    }

    // Langtang Sub-packages
    const langtangIds = ['trek-langtang-valley', 'trek-gosainkunda', 'trek-tamang-heritage'];
    if (langtangIds.includes(selectedTour.id)) {
      return () => handleTourClick('Langtang Region');
    }

    // Manaslu Sub-packages
    const manasluIds = ['trek-manaslu-circuit', 'trek-tsum-valley'];
    if (manasluIds.includes(selectedTour.id)) {
      return () => handleTourClick('Manaslu Region');
    }

    // Dhaulagiri Sub-packages
    if (selectedTour.id === 'trek-dhaulagiri-circuit') {
      return () => handleTourClick('Dhaulagiri Trek');
    }
    
    // Fallback for any other trek- starting ID that isn't a main region
    if (selectedTour.id.startsWith('trek-') && 
        selectedTour.id !== 'trek-everest' && 
        selectedTour.id !== 'trek-annapurna') {
      // Try to determine region from ID
      if (selectedTour.id.includes('annapurna')) return () => handleTourClick('Annapurna Region');
      if (selectedTour.id.includes('everest')) return () => handleTourClick('Everest Region');
      if (selectedTour.id.includes('langtang')) return () => handleTourClick('Langtang Region');
      if (selectedTour.id.includes('manaslu')) return () => handleTourClick('Manaslu Region');
      if (selectedTour.id.includes('dhaulagiri')) return () => handleTourClick('Dhaulagiri Trek');
    }
    
    return undefined;
  }

  if (!trekkingService) return null

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
        onBack={getBackHandler()}
      />

      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/hero-trek.jpeg" 
            alt="Trekking Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Himalayan Trekking</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Experience the majesty of the Himalayas with our expert-led trekking adventures. 
              From the iconic Everest Base Camp to remote forbidden kingdoms, we guide you through 
              the most breathtaking trails on Earth.
            </p>
          </div>
        </div>
      </section>

      {/* Trekking Regions Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Adventure Awaits</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Trekking Regions</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trekkingService.regions?.map((region, idx) => (
              <div 
                key={idx}
                id={getRegionId(region.name)}
                className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer scroll-mt-32"
                onClick={() => handleTourClick(region.name)}
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
      </section>

      {/* Why Trek With Us */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Safety & Expertise <br /> <span className="text-primary">In the Mountains</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Government Licensed Guides</h4>
                    <p className="text-slate-600">Every trek is led by a professional, English-speaking guide with years of high-altitude experience.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Comprehensive Insurance</h4>
                    <p className="text-slate-600">We prioritize your safety with full insurance coverage for our entire field staff and emergency support.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Award className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Sustainable Tourism</h4>
                    <p className="text-slate-600">We follow &quot;Leave No Trace&quot; principles and support local communities in every region we visit.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/hero/hero-nepal.jpeg" 
                alt="Trekking Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Your Adventure</h2>
            <p className="text-muted-foreground text-lg">Inquire now to get a customized trekking itinerary and quote.</p>
          </div>
          <ServiceInquiryForm />
        </div>
      </section>
    </div>
  )
}
