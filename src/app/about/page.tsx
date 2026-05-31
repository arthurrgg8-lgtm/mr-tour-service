import type { Metadata } from "next"
import team from "@/data/team.json"
import business from "@/data/business.json"
import { Award, Users, ShieldCheck, Map as MapIcon, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Since 2003",
  description: `Trusted since 2003 — 20+ years of safe, reliable travel across Nepal. 100% owned fleet, government-certified, with a team that knows every road and trail.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/about",
    siteName: business.name,
    title: `${business.name} - About Our Story Since 2003`,
    description: `Trusted by travelers since 2003 — 20+ years of safe, reliable travel across Nepal. 100% company-owned fleet, government-certified, and a team that knows every road and trail.`,
    images: [
      {
        url: "https://manoranjan.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} - About Our Story Since 2003`,
    description: `Trusted by travelers since 2003 — 20+ years of safe, reliable travel across Nepal. 100% company-owned fleet, government-certified, and a team that knows every road and trail.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  website?: string;
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://manoranjan.com.np/about" }
    ]
  }

  return (
    <div className="pt-20 pb-24 w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 py-16 sm:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/about-bg.jpg" 
            alt="About Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">About {business.name}</h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
              Started with a vision to redefine travel and transportation in Nepal, 
              we have grown from a small vehicle rental company into a full-service 
              travel provider, trusted by thousands of local and international travelers.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Journey</h2>
              <p className="text-xs sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {business.name} was founded on the principles of reliability, safety, and 
                transparency. Starting with a focus on vehicle rentals, we quickly realized 
                that travelers in Nepal needed more than just a car; they needed a partner 
                who understood the terrain, the culture, and the importance of a seamless experience.
              </p>
              
              <div className="relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-primary/5 border border-primary/10 mb-6 sm:mb-8 italic text-sm sm:text-lg text-primary font-medium">
                <span className="absolute -top-4 -left-2 text-4xl sm:text-6xl opacity-20">&quot;</span>
                No one, my failure is my inspiration.
                <span className="block mt-1 sm:block sm:mt-2 text-[10px] sm:text-sm font-bold not-italic text-muted-foreground">&mdash; Bishnu Bahadur Karki, Founder</span>
              </div>

              <p className="text-xs sm:text-base text-muted-foreground mb-6 sm:mb-10 leading-relaxed">
                Today, we take pride in owning our entire fleet, which allows us to 
                maintain strict quality controls and offer the best pricing without 
                outsourcing. Whether it&apos;s a family trip to Pokhara, a corporate event in 
                Kathmandu, or a trekking expedition in the Himalayas, we are here to fuel your freedom.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-4xl font-extrabold text-primary">20+</span>
                  <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">Years Experience</span>
                </div>
                <div className="flex flex-col gap-1 sm:gap-2">
                  <span className="text-2xl sm:text-4xl font-extrabold text-primary">100%</span>
                  <span className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">Self-Owned Fleet</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="p-3 xs:p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50 border flex flex-col gap-2 sm:gap-4">
                <ShieldCheck className="h-6 w-6 sm:h-10 sm:w-10 text-primary shrink-0" />
                <h3 className="font-bold text-xs xs:text-sm sm:text-xl leading-none">Safety First</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">Every vehicle undergoes safety checks and is operated by experienced drivers.</p>
              </div>
              <div className="p-3 xs:p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50 border flex flex-col gap-2 sm:gap-4">
                <Award className="h-6 w-6 sm:h-10 sm:w-10 text-primary shrink-0" />
                <h3 className="font-bold text-xs xs:text-sm sm:text-xl leading-none">Premium Quality</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">We don&apos;t compromise on comfort. Our vehicles are clean and well-maintained.</p>
              </div>
              <div className="p-3 xs:p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50 border flex flex-col gap-2 sm:gap-4">
                <MapIcon className="h-6 w-6 sm:h-10 sm:w-10 text-primary shrink-0" />
                <h3 className="font-bold text-xs xs:text-sm sm:text-xl leading-none">Local Expertise</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">Our team knows Nepal inside out, ensuring you get the best routes and gems.</p>
              </div>
              <div className="p-3 xs:p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50 border flex flex-col gap-2 sm:gap-4">
                <Users className="h-6 w-6 sm:h-10 sm:w-10 text-primary shrink-0" />
                <h3 className="font-bold text-xs xs:text-sm sm:text-xl leading-none">Customer Centric</h3>
                <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">We focus on relationships, resulting in many repeated happy customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">Meet Our Leadership</h2>
            <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Behind every successful journey is a dedicated team of professionals 
              committed to excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-12">
            {team.map((member: TeamMember, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                <div className="relative">
                  {member.website ? (
                    <Link 
                      href={member.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-28 w-28 xs:h-36 xs:w-36 sm:h-56 sm:w-56 rounded-full bg-slate-200 mb-3 sm:mb-6 overflow-hidden border-2 sm:border-4 border-white shadow-lg group-hover:scale-105 group-hover:border-primary/50 transition-all duration-500 relative cursor-pointer"
                    >
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="text-white h-4 w-4 sm:h-8 sm:w-8 drop-shadow-lg" />
                      </div>
                    </Link>
                  ) : (
                    <div className="h-28 w-28 xs:h-36 xs:w-36 sm:h-56 sm:w-56 rounded-full bg-slate-200 mb-3 sm:mb-6 overflow-hidden border-2 sm:border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500 relative">
                      {member.image ? (
                        <Image 
                          src={member.image} 
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-300 flex items-center justify-center text-slate-400">
                          <Users className="h-6 w-6 sm:h-12 sm:w-12" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="text-sm sm:text-xl font-bold mb-0.5 sm:mb-1">{member.name}</h3>
                <p className="text-primary font-bold uppercase tracking-wider text-[8px] xs:text-[10px] sm:text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Registration Proof */}
      <section className="py-12 sm:py-24 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 sm:mb-16">Officially Registered & Recognized</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-6 group col-span-1">
              <div className="h-20 xs:h-28 sm:h-48 w-full rounded-xl sm:rounded-3xl bg-slate-50 border sm:border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-primary/20 shrink-0">
                <ShieldCheck className="h-8 w-8 sm:h-20 sm:w-20" />
              </div>
              <div className="p-2 sm:p-6 rounded-lg sm:rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="font-bold text-[10px] xs:text-xs sm:text-lg text-slate-800 leading-tight">Company Registrar</p>
                <p className="text-[8px] xs:text-[10px] text-muted-foreground mt-0.5">Government of Nepal</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 sm:gap-6 group col-span-1">
              <div className="h-20 xs:h-28 sm:h-48 w-full rounded-xl sm:rounded-3xl bg-slate-50 border sm:border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-primary/20 shrink-0">
                <MapIcon className="h-8 w-8 sm:h-20 sm:w-20" />
              </div>
              <div className="p-2 sm:p-6 rounded-lg sm:rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="font-bold text-[10px] xs:text-xs sm:text-lg text-slate-800 leading-tight">Tourism Office KTM</p>
                <p className="text-[8px] xs:text-[10px] text-muted-foreground mt-0.5">Ministry of Tourism</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-6 group col-span-2 md:col-span-1">
              <div className="h-20 xs:h-28 sm:h-48 w-full rounded-xl sm:rounded-3xl bg-slate-50 border sm:border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-primary/20 shrink-0">
                <Award className="h-8 w-8 sm:h-20 sm:w-20" />
              </div>
              <div className="p-2 sm:p-6 rounded-lg sm:rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="font-bold text-[10px] xs:text-xs sm:text-lg text-slate-800 leading-tight">Tourist Vehicle Association</p>
                <p className="text-[8px] xs:text-[10px] text-muted-foreground mt-0.5">Member Since 2003</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
