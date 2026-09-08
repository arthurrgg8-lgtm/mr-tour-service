import type { Metadata } from "next"
import business from "@/data/business.json"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import blogPosts from "@/data/blog-posts.json"

export const metadata: Metadata = {
  title: `Travel & Rental Guides Nepal | ${business.name} Blog`,
  description: `Read travel tips, vehicle rental guides, and route advice for exploring Nepal by road. Helpful guides from ${business.name}.`,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/blog",
    siteName: business.name,
    title: `Travel & Rental Guides Nepal | ${business.name} Blog`,
    description: `Read travel tips, vehicle rental guides, and route advice for exploring Nepal by road. Helpful guides from ${business.name}.`,
    images: [{ url: "https://manoranjan.com.np/logo.jpg", width: 800, height: 800, alt: "Nepal travel vehicle rental blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Travel & Rental Guides Nepal | ${business.name} Blog`,
    description: `Read travel tips, vehicle rental guides, and route advice for exploring Nepal by road. Helpful guides from ${business.name}.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

import { safeJsonLdStringify } from "@/lib/utils"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionComponents"

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://manoranjan.com.np/blog" }
    ]
  }

  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${business.name} Travel Blog`,
    "description": "Expert travel tips, route guides, and vehicle rental advice for Nepal.",
    "url": "https://manoranjan.com.np/blog",
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://manoranjan.com.np/blog/${post.id}`,
      "datePublished": "2026-01-01",
      "image": `https://manoranjan.com.np${post.image}`
    }))
  }

  return (
    <div className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(blogListJsonLd) }}
      />
      {/* Header */}
      <section className="relative bg-slate-900 pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/hero-nepal.jpeg" 
            alt="Nepal travel vehicle rental blog"
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
              Nepal Travel &amp; Vehicle Rental Guides
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-medium">
              Expert tips, route guides, and travel advice for exploring Nepal by road.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeIn direction="up" className="mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-2">Latest Articles</h2>
            <p className="text-slate-600 text-sm sm:text-base">Read our most recent travel tips, route guides, and vehicle rental advice.</p>
          </FadeIn>

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

                  <div className="px-6 sm:px-7 pb-6 pt-0 flex items-center text-primary font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                    <span>Read Full Guide</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Popular Travel Guides & Rental Tips Section */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Popular Travel Guides</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Comprehensive guides to Nepal&apos;s most popular road trip destinations.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Kathmandu to Pokhara Scenic Highway Itinerary</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Upper Mustang 4WD Expedition Guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Chitwan National Park Safari Road Trip</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Rental Tips &amp; Advice</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Practical tips on choosing the right vehicle, self-drive requirements, and road safety.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Choosing Between Chauffeur-Driven vs Self-Drive</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Essential Documents for Driving in Nepal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Navigating Mountain Roads &amp; Monsoon Driving Safety</span>
                </li>
              </ul>
            </div>
          </div>
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
