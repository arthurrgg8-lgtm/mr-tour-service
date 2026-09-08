"use client"

import ImageSlideshow from "@/components/ui/ImageSlideshow"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"

const SELF_DRIVE_IMAGES = [
  "/images/self-drive/self-drive.jpeg",
]

export default function SelfDriveShowcase() {
  return (
    <section className="relative bg-slate-900 text-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-8">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary block mb-2 font-mono">
            Self-Drive Nepal • 100% Owned Fleet
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 text-white tracking-tight leading-tight">
            Self Drive Rental in Nepal
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            Rent a self-drive car in Nepal and explore at your own pace with full freedom and flexibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Slideshow & Fleet Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative h-[280px] xs:h-[320px] sm:h-[450px] md:h-[480px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <ImageSlideshow images={SELF_DRIVE_IMAGES} priority imageClassName="object-cover object-[center_65%]" />
            </div>

            {/* Mobile-only Quick Inquiry (Top section right below image) */}
            <div className="lg:hidden">
              <ServiceInquiryForm initialType="Self Drive" initialVehicleType="car-rent" allowedTypes={["Self Drive"]} compact />
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block">Self-Drive Fleet</span>
                <span className="text-base sm:text-lg font-bold text-white">Cars &amp; SUVs Available for Self-Drive</span>
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                Instant Confirmation
              </span>
            </div>
          </div>

          {/* Right Column: Desktop Sticky Quick Inquiry */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <ServiceInquiryForm initialType="Self Drive" initialVehicleType="car-rent" allowedTypes={["Self Drive"]} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
