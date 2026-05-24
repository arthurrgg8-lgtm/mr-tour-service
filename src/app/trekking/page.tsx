import type { Metadata } from "next"
import services from "@/data/services.json"
import business from "@/data/business.json"
import { Award, ShieldCheck, Users } from "lucide-react"
import Image from "next/image"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"
import TrekkingGrid from "@/components/sections/TrekkingGrid"

interface SubPackage {
  name: string;
  duration: string;
  image: string;
}

interface SubService {
  name: string;
  image: string;
  duration?: string;
  startingPrice?: string;
}

interface Region {
  name: string;
  image: string;
  subPackages?: SubPackage[];
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
  subServices?: SubService[];
}

export const metadata: Metadata = {
  title: "Himalayan Trekking Adventures",
  description: `Join ${business.name} for expert-led trekking adventures in Nepal. Explore Everest Base Camp, Annapurna Circuit, Langtang Valley, and remote forbidden kingdoms with our professional guides.`,
  alternates: {
    canonical: "/trekking",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://mrtourservice.com.np/trekking",
    siteName: "MR Tour Service",
    title: "MR Tour Service",
    description: "Trek the Himalayas with MR Tour Service: Everest Base Camp, Annapurna Circuit, Langtang Valley, Manaslu, and more. Expert guides, safety-first approach.",
    images: [
      {
        url: "https://mrtourservice.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: "MR Tour Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MR Tour Service",
    description: "Trek the Himalayas with MR Tour Service: Everest Base Camp, Annapurna Circuit, Langtang Valley, Manaslu, and more. Expert guides, safety-first approach.",
    images: ["https://mrtourservice.com.np/logo.jpg"],
  },
}

const trekkingService = (services as Service[]).find(s => s.id === 'trekking')

export default function TrekkingPage() {
  if (!trekkingService) return null

  return (
    <div className="pt-20 pb-24">
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

      {/* Trekking Regions Grid Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Adventure Awaits</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Trekking Regions</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <TrekkingGrid regions={trekkingService.regions || []} />
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
