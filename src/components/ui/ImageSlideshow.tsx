"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSlideshowProps {
  images: string[]
  interval?: number
  priority?: boolean
  autoSlide?: boolean
  imageClassName?: string
}

export default function ImageSlideshow({
  images,
  interval = 5000,
  priority = false,
  autoSlide = false,
  imageClassName,
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval, autoSlide])

  if (!images || images.length === 0) return null

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl border border-slate-100 shadow-xl group/slideshow bg-slate-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Vehicle Photo ${currentIndex + 1}`}
            fill
            className={imageClassName || "object-cover object-[center_52%]"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority && currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-90 sm:opacity-0 group-hover/slideshow:opacity-100 transition-opacity hover:bg-black/80 z-20"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-90 sm:opacity-0 group-hover/slideshow:opacity-100 transition-opacity hover:bg-black/80 z-20"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx}
                aria-label={`View photo ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
