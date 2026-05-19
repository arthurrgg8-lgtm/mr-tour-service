import { CheckCircle2 } from "lucide-react"
import business from "@/data/business.json"

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">
              The MR Tour Advantage
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Why Travelers Trust <br /> <span className="text-primary">MR Tour Service</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              We started with a simple goal: to provide the most reliable transportation 
              service in Nepal. Today, we&apos;ve grown into a complete travel provider, 
              maintaining the same commitment to quality that started it all.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {business.usp.map((usp, idx) => {
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <span className="font-medium">{usp}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-primary/10 flex items-center justify-center overflow-hidden">
               {/* Decorative elements representing fleet/growth */}
               <div className="grid grid-cols-2 gap-4 p-8">
                 <div className="h-40 w-40 rounded-2xl bg-white shadow-xl flex items-center justify-center p-6 text-center">
                    <div>
                      <p className="text-3xl font-bold text-primary">20+</p>
                      <p className="text-xs font-medium text-muted-foreground uppercase">Years Experience</p>
                    </div>
                 </div>
                 <div className="h-40 w-40 rounded-2xl bg-primary text-white shadow-xl flex items-center justify-center p-6 text-center mt-12">
                    <div>
                      <p className="text-3xl font-bold">100%</p>
                      <p className="text-xs font-medium opacity-80 uppercase">Owned Fleet</p>
                    </div>
                 </div>
                 <div className="h-40 w-40 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center justify-center p-6 text-center -mt-12">
                    <div>
                      <p className="text-3xl font-bold">24/7</p>
                      <p className="text-xs font-medium opacity-80 uppercase">Support</p>
                    </div>
                 </div>
                 <div className="h-40 w-40 rounded-2xl bg-white shadow-xl flex items-center justify-center p-6 text-center">
                    <div>
                      <p className="text-3xl font-bold text-primary">1k+</p>
                      <p className="text-xs font-medium text-muted-foreground uppercase">Happy Clients</p>
                    </div>
                 </div>
               </div>
            </div>
            
            {/* Background blobs */}
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
