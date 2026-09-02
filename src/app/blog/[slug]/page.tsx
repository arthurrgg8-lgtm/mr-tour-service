import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2, User, Share2, MessageCircle, Phone, Sparkles } from "lucide-react"
import blogPosts from "@/data/blog-posts.json"
import business from "@/data/business.json"
import { buildWhatsAppUrl, safeJsonLdStringify } from "@/lib/utils"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.id === slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | ${business.name}`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      type: "article",
      locale: "en_NP",
      url: `https://manoranjan.com.np/blog/${post.id}`,
      siteName: business.name,
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.id === slug)

  if (!post) {
    notFound()
  }

  const otherPosts = blogPosts.filter((p) => p.id !== slug).slice(0, 3)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://manoranjan.com.np${post.image}`,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": business.name,
      "logo": {
        "@type": "ImageObject",
        "url": "https://manoranjan.com.np/logo.jpg",
      },
    },
    "datePublished": "2026-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://manoranjan.com.np/blog/${post.id}`,
    },
  }

  return (
    <div className="pt-20 pb-24 w-full overflow-x-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(articleJsonLd) }}
      />

      {/* ─── Hero Header ─── */}
      <section className="relative bg-slate-900 py-20 sm:py-28 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/85 to-slate-950" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-6 uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Calendar className="h-3.5 w-3.5 text-primary" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock className="h-3.5 w-3.5 text-primary" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">{post.author}</p>
              <p className="text-[11px] text-slate-400">Verified Nepal Travel Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Article Content (Full Width) ─── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-6xl">
        {/* Intro Lead */}
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 mb-12 shadow-xs">
          <p className="text-base sm:text-xl text-slate-700 leading-relaxed font-medium">
            {post.intro}
          </p>
        </div>

        {/* Featured Image - Wide aspect */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-16 shadow-2xl border border-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {post.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {section.heading}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {section.content}
              </p>

              {section.tips && section.tips.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-primary/[0.04] border border-primary/15 space-y-3 mt-6">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm uppercase tracking-wider mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Expert Insights &amp; Road Tips</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.tips.map((tip, tipIdx) => (
                      <div key={tipIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/60 p-3 rounded-xl border border-primary/10">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Conclusion / Action Box - Full Width */}
        <div className="mt-16 p-8 sm:p-14 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">
              Travel With Confidence
            </span>
            <h3 className="text-2xl sm:text-4xl font-black mb-4">
              Plan Your Nepal Journey with M.R Travel &amp; Tour
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 font-medium">
              {post.conclusion}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-black text-xs sm:text-sm hover:bg-primary/90 transition-all uppercase tracking-wider shadow-xl shadow-primary/25"
              >
                <span>Browse Fleet</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={buildWhatsAppUrl(business.contact.whatsapp, `Hello, I just read your article "${post.title}" and would like to ask some questions.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-black text-xs sm:text-sm hover:bg-[#20ba5a] transition-all uppercase tracking-wider shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles - Full Width 3-Col Grid */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Related Travel Guides
            </h3>
            <Link href="/blog" className="text-primary font-bold text-xs sm:text-sm hover:underline uppercase tracking-wider">
              View All Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.id}`}
                className="group p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-primary/30 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary mb-2.5 block">
                    {related.category}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                    {related.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {related.excerpt}
                  </p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1.5 mt-6 group-hover:gap-2.5 transition-all uppercase tracking-wider">
                  Read Guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
