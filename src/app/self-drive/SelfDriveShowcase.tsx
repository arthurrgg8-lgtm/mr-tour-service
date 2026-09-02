"use client"

import ImageSlideshow from "@/components/ui/ImageSlideshow"
import ServiceInquiryForm from "@/components/sections/ServiceInquiryForm"

const SELF_DRIVE_IMAGES = [
  "/images/services/car/car-1.jpeg",
  "/images/services/car/car-2.jpeg",
  "/images/services/car/car-3.jpeg",
  "/images/services/car/car-4.jpeg",
  "/images/services/car/byd-car.jpeg",
  "/images/services/suv/1.jpg",
  "/images/services/suv/2.jpg",
  "/images/services/suv/3.jpg",
]

export default function SelfDriveShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Image Slideshow */}
          <div className="lg:col-span-8">
            <div className="relative h-[300px] sm:h-[450px] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
              <ImageSlideshow images={SELF_DRIVE_IMAGES} priority />
            </div>
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block">Self-Drive Fleet</span>
              <span className="text-lg font-black text-slate-900">Cars &amp; SUVs Available for Self-Drive</span>
            </div>
          </div>

          {/* Right: Quick Inquiry */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <ServiceInquiryForm initialType="Rental" allowedTypes={["Rental"]} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
