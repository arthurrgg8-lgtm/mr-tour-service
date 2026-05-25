import type { Metadata } from "next"
import business from "@/data/business.json"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Your privacy matters at ${business.name}. We only collect what's needed, never share your data, and respect your rights. Contact us anytime to review your information.`,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://manoranjan.com.np/privacy-policy",
    siteName: business.name,
    title: `${business.name} - Privacy Policy`,
    description: `Your privacy matters at ${business.name}. We only collect what's needed, never share your data, and respect your rights. Contact us anytime to review your information.`,
    images: [
      {
        url: "https://manoranjan.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} - Privacy Policy`,
    description: `Your privacy matters at ${business.name}. We only collect what's needed, never share your data, and respect your rights. Contact us anytime to review your information.`,
    images: ["https://manoranjan.com.np/logo.jpg"],
  },
}

export default function PrivacyPolicy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://manoranjan.com.np" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://manoranjan.com.np/privacy-policy" }
    ]
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate lg:prose-lg max-w-none bg-white p-8 md:p-12 rounded-[2rem] border shadow-sm">
          <p className="text-xl leading-relaxed text-slate-700">
            This Privacy Policy explains how My Tour Services (&quot;we,&quot; &quot;our&quot;) collects and uses your data when you visit our platform. 
            We only collect personal information that you voluntarily provide to us—such as your name, contact details, and booking preferences 
            when you inquire about or book our travel packages—alongside standard data automatically collected by our servers, 
            including your IP address, browser type, and page usage patterns via basic cookies.
          </p>
          
          <p className="text-xl leading-relaxed text-slate-700 mt-6">
            We use this information solely to facilitate your travel arrangements, improve our services, and communicate directly 
            with you regarding your itinerary; we do not sell, rent, or share your personal data with third parties except as 
            required by law or with trusted travel partners (such as hotels or transport providers) essential to fulfilling your bookings.
          </p>

          <p className="text-xl leading-relaxed text-slate-700 mt-6">
            By using our services, you consent to the collection and use of your information as described here, 
            and you can contact us at <a href="mailto:manoranjanramjhamtourandtravel@gmail.com" className="text-primary font-bold hover:underline">manoranjanramjhamtourandtravel@gmail.com</a> at any time to request the access, correction, or deletion of your personal data.
          </p>
        </div>
      </div>
    </div>
  )
}
