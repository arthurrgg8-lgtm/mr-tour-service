import type { Metadata } from "next"
import business from "@/data/business.json"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import blogPosts from "@/data/blog-posts.json"

export const metadata: Metadata = {
  title: "Travel Blog - Nepal Travel Tips & Guides",
  description: `Read the latest travel tips, guides, and stories from Nepal. Expert advice on vehicle rentals, mountain roads, and travel planning.`,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/blog",
    siteName: business.name,
    title: `${business.name} - Travel Blog`,
    description: `Expert travel tips, guides, and stories from Nepal. Vehicle rental advice, road conditions, and travel planning.`,
    images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} - Travel Blog`,
    description: `Expert travel tips, guides, and stories from Nepal.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionComponents"

export default function BlogPage() {
  return (
    <div className="pt-20 pb-24 w-full overflow-x-hidden">
      {/* Header */}
      <section className="relative bg-slate-900 py-24 sm:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/hero-nepal.jpeg" 
            alt="Blog Background"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/95" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <FadeIn direction="up" className="max-w-3xl">
            <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 block">
              Nepal Travel Insights
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
              Travel Blog &amp; Guides
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
              Expert advice, road condition updates, and vehicle selection guides from local travel specialists in Nepal.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <StaggerItem key={post.id} className="h-full">
                <Link
                  href={`/blog/${post.id}`}
                  className="group rounded-3xl border border-slate-200/80 overflow-hidden bg-white hover:border-primary/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-primary shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary" /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-xs uppercase tracking-wider group-hover:text-primary/80 transition-all">
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get the latest travel tips and updates from {business.name} delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 h-14 px-6 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button className="h-14 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
