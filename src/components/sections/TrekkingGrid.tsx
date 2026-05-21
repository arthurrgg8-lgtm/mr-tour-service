"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, Compass } from "lucide-react"
import TourModal from "@/components/ui/TourModal"
import tourDetails from "@/data/tour_details.json"

interface Region {
  name: string;
  image: string;
}

interface TrekkingGridProps {
  regions: Region[];
}

export default function TrekkingGrid({ regions }: TrekkingGridProps) {
  const [selectedTour, setSelectedTour] = useState<typeof tourDetails[0] | null>(null)

  useEffect(() => {
    const handleHash = () => {
      const hash = decodeURIComponent(window.location.hash.substring(1).toLowerCase())
      if (hash) {
        let detail = tourDetails.find(d => d.id.toLowerCase() === hash)
        
        if (!detail) {
          if (hash === 'everest-region') {
            detail = tourDetails.find(d => d.id === 'trek-everest')
          } else if (hash === 'annapurna-region') {
            detail = tourDetails.find(d => d.id === 'trek-annapurna')
          }
        }

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
    const normalizedName = tourName.toLowerCase()
    
    const detail = tourDetails.find(d => {
      const title = d.title.toLowerCase()
      const id = d.id.toLowerCase()
      
      if (id === normalizedName) return true
      if (d.id === 'trek-everest' && (normalizedName === 'everest region' || normalizedName === 'everest')) return true
      if (d.id === 'trek-annapurna' && (normalizedName === 'annapurna region' || normalizedName === 'annapurna')) return true
      
      return title === normalizedName
    })

    if (detail) {
      setSelectedTour(detail)
      const hash = getRegionId(tourName)
      window.history.pushState(null, "", `#${hash}`)
    }
  }

  const getRegionId = (name: string) => {
    const n = name.toLowerCase();
    
    if (n.includes('circuit with tilicho')) return 'trek-annapurna-circuit';
    if (n.includes('namun la')) return 'trek-namun-la';
    if (n.includes('lamjung himal')) return 'trek-lamjung-himal';
    if (n.includes('khopra ridge')) return 'trek-khopra-ridge';
    if (n.includes('mardi himal')) return 'trek-mardi-himal';
    if (n.includes('short trip') || (n.includes('abc') && n.includes('short'))) return 'trek-abc-short';
    if (n.includes('nar-phu')) return 'trek-nar-phu';
    if (n.includes('seven passes')) return 'trek-seven-passes';
    if (n.includes('abc via ghorepani') || (n.includes('annapurna base camp') && n.includes('ghorepani'))) return 'trek-annapurna-abc';

    if (n.includes('amadablam')) return 'trek-amadablam';
    if (n.includes('ebc') || n.includes('base camp and kala pathhar')) return 'trek-ebc-kala-pathar';
    if (n.includes('pikey peak')) return 'trek-pikey-peak';
    if (n.includes('three passes')) return 'trek-three-passes';
    if (n.includes('phaplu')) return 'trek-phaplu-ebc';

    if (n.includes('langtang valley trek')) return 'trek-langtang-valley';
    if (n.includes('gosainkunda')) return 'trek-gosainkunda';
    if (n.includes('tamang heritage')) return 'trek-tamang-heritage';

    if (n.includes('manaslu circuit')) return 'trek-manaslu-circuit';
    if (n.includes('tsum valley')) return 'trek-tsum-valley';

    if (n.includes('dhaulagiri circuit')) return 'trek-dhaulagiri-circuit';
    
    if (n === 'everest region' || n === 'everest') return 'everest-region';
    if (n === 'annapurna region' || n === 'annapurna') return 'annapurna-region';
    if (n === 'langtang region' || n === 'langtang') return 'langtang-region';
    if (n === 'manaslu & tsum valley' || n === 'manaslu region' || n === 'manaslu') return 'manaslu-trek';
    if (n === 'dhaulagiri trek' || n === 'dhaulagiri') return 'dhaulagiri-trek';
    
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
    
    const annapurnaIds = ['trek-annapurna-abc', 'trek-annapurna-circuit', 'trek-khopra-ridge', 'trek-mardi-himal', 'trek-namun-la', 'trek-lamjung-himal', 'trek-nar-phu', 'trek-seven-passes', 'trek-abc-short'];
    if (selectedTour.id.startsWith('trek-annapurna-') || annapurnaIds.includes(selectedTour.id)) {
      return () => handleTourClick('Annapurna Region');
    }
    
    const everestIds = ['trek-amadablam', 'trek-ebc-kala-pathar', 'trek-pikey-peak', 'trek-three-passes', 'trek-phaplu-ebc'];
    if (selectedTour.id.startsWith('trek-everest-') || everestIds.includes(selectedTour.id)) {
      return () => handleTourClick('Everest Region');
    }

    const langtangIds = ['trek-langtang-valley', 'trek-gosainkunda', 'trek-tamang-heritage'];
    if (langtangIds.includes(selectedTour.id)) {
      return () => handleTourClick('Langtang Region');
    }

    const manasluIds = ['trek-manaslu-circuit', 'trek-tsum-valley'];
    if (manasluIds.includes(selectedTour.id)) {
      return () => handleTourClick('Manaslu Region');
    }

    if (selectedTour.id === 'trek-dhaulagiri-circuit') {
      return () => handleTourClick('Dhaulagiri Trek');
    }
    
    if (selectedTour.id.startsWith('trek-') && 
        selectedTour.id !== 'trek-everest' && 
        selectedTour.id !== 'trek-annapurna') {
      if (selectedTour.id.includes('annapurna')) return () => handleTourClick('Annapurna Region');
      if (selectedTour.id.includes('everest')) return () => handleTourClick('Everest Region');
      if (selectedTour.id.includes('langtang')) return () => handleTourClick('Langtang Region');
      if (selectedTour.id.includes('manaslu')) return () => handleTourClick('Manaslu Region');
      if (selectedTour.id.includes('dhaulagiri')) return () => handleTourClick('Dhaulagiri Trek');
    }
    
    return undefined;
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
        onBack={getBackHandler()}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regions.map((region, idx) => (
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
    </>
  )
}
