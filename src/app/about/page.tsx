import team from "@/data/team.json"
import { Award, Users, ShieldCheck, Map as MapIcon } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="pt-20 pb-24">
      {/* Header */}
      <section className="relative bg-slate-900 py-32 text-white overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About MR Tour Service</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Started with a vision to redefine travel and transportation in Nepal, 
              we have grown from a small vehicle rental company into a full-service 
              travel provider, trusted by thousands of local and international travelers.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                MR Tour Service was founded on the principles of reliability, safety, and 
                transparency. Starting with a focus on vehicle rentals, we quickly realized 
                that travelers in Nepal needed more than just a car; they needed a partner 
                who understood the terrain, the culture, and the importance of a seamless experience.
              </p>
              
              <div className="relative p-8 rounded-3xl bg-primary/5 border border-primary/10 mb-8 italic text-lg text-primary font-medium">
                <span className="absolute -top-4 -left-2 text-6xl opacity-20">&quot;</span>
                No one, my failure is my inspiration.
                <span className="block mt-2 text-sm font-bold not-italic text-muted-foreground">&mdash; Bishnu Bahadur Karki, Founder</span>
              </div>

              <p className="text-muted-foreground mb-10 leading-relaxed">
                Today, we take pride in owning our entire fleet, which allows us to 
                maintain strict quality controls and offer the best pricing without 
                outsourcing. Whether it&apos;s a family trip to Pokhara, a corporate event in 
                Kathmandu, or a trekking expedition in the Himalayas, we are here to fuel your freedom.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-extrabold text-primary">5+</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Years in Business</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-extrabold text-primary">100%</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Self-Owned Fleet</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-slate-50 border flex flex-col gap-4">
                <ShieldCheck className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Safety First</h3>
                <p className="text-sm text-muted-foreground">Every vehicle undergoes rigorous safety checks and is operated by experienced drivers.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border flex flex-col gap-4">
                <Award className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">We don&apos;t compromise on comfort. Our vehicles are clean, modern, and well-maintained.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border flex flex-col gap-4">
                <MapIcon className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Local Expertise</h3>
                <p className="text-sm text-muted-foreground">Our team knows Nepal inside out, ensuring you get the best routes and hidden gems.</p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border flex flex-col gap-4">
                <Users className="h-10 w-10 text-primary" />
                <h3 className="font-bold text-xl">Customer Centric</h3>
                <p className="text-sm text-muted-foreground">We focus on long-term relationships, resulting in many repeated happy customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Behind every successful journey is a dedicated team of professionals 
              committed to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center">
                <div className="h-56 w-56 rounded-full bg-slate-200 mb-6 overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500 relative">
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-300 flex items-center justify-center text-slate-400">
                      <Users className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-bold uppercase tracking-wider text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Registration Proof */}
      <section className="py-24 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Officially Registered & Recognized</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6 group">
              <div className="h-48 w-full rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary/20">
                <ShieldCheck className="h-20 w-20" />
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="font-bold text-lg text-slate-800">Office of Company Registrar</p>
                <p className="text-sm text-muted-foreground">Government of Nepal</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 group">
              <div className="h-48 w-full rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary/20">
                <MapIcon className="h-20 w-20" />
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="font-bold text-lg text-slate-800">Tourism Office Kathmandu</p>
                <p className="text-sm text-muted-foreground">Ministry of Culture, Tourism & Civil Aviation</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 group">
              <div className="h-48 w-full rounded-3xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-primary/20">
                <Award className="h-20 w-20" />
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="font-bold text-lg text-slate-800">Nepal Tourist Vehicle Association</p>
                <p className="text-sm text-muted-foreground">Active Member Since 2003</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
