"use client"

import Image from "next/image"
import galleryData from "@/data/gallery.json"
import business from "@/data/business.json"
import ScrollAnimation from "@/components/ui/ScrollAnimation"

export default function Gallery() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our journeys, our fleet, and the beautiful destinations 
            we cover across Nepal and beyond.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryData.map((img, idx) => (
            <ScrollAnimation key={idx} delay={(idx % 12) * 0.05}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 border cursor-zoom-in">
                <Image
                  src={`/images/gallery/${encodeURIComponent(img)}`}
                  alt={`${business.name} travel gallery image ${idx + 1}`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
