import { ShieldCheck, Zap, Users, Trophy } from "lucide-react"
import business from "@/data/business.json"

export default function WhyChooseSummary() {
  const summaryFeatures = [
    {
      icon: ShieldCheck,
      title: "100% Owned Fleet",
      desc: "No third-party commissions."
    },
    {
      icon: Users,
      title: "Licensed Guides",
      desc: "Expert mountain professionals."
    },
    {
      icon: Zap,
      title: "24/7 Support",
      desc: "Immediate on-ground assistance."
    },
    {
      icon: Trophy,
      title: "5+ Years",
      desc: "Trusted by 1000+ travelers."
    }
  ]

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Trust & Reliability</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose <span className="text-primary">{business.name}</span>?</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We combine local expertise with international safety standards to provide the most reliable 
              travel solutions in Nepal. Our commitment to transparent pricing and personalized service 
              makes us the preferred choice for thousands of adventurers.
            </p>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm italic text-slate-600">
              <p className="font-medium">&quot;Our mission is to fuel your freedom across the Himalayas with absolute safety, premium comfort, and unmatched local insights.&quot;</p>
              <p className="text-sm mt-3 font-bold text-primary">— Management Team</p>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
            {summaryFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
