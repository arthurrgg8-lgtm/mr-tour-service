import type { Metadata } from "next"
import business from "@/data/business.json"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read the privacy policy of ${business.name}. We are committed to protecting your personal data and ensuring a secure booking experience for all our travelers.`,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://mrtourservice.com.np/privacy-policy",
    siteName: "M.R travel and Tour",
    title: "M.R travel and Tour",
    description: "Read the privacy policy of M.R travel and Tour. Learn how we collect, use, and protect your personal data when you book vehicle rentals and tours in Nepal.",
    images: [
      {
        url: "https://mrtourservice.com.np/logo.jpg",
        width: 800,
        height: 800,
        alt: "M.R travel and Tour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "M.R travel and Tour",
    description: "Read the privacy policy of M.R travel and Tour. Learn how we collect, use, and protect your personal data when you book vehicle rentals and tours in Nepal.",
    images: ["https://mrtourservice.com.np/logo.jpg"],
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
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
