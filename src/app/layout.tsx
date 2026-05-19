import type { Metadata } from "next"
import { Montserrat, Lora } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WhatsAppButton from "@/components/layout/WhatsAppButton"
import business from "@/data/business.json"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://mrtourservice.com.np"),
  title: {
    default: `${business.name} | Premium Vehicle Rental & Tours in Nepal`,
    template: `%s | ${business.name}`
  },
  description: `${business.name} is a leading travel service provider in Kathmandu, Nepal. We offer premium car rentals, 4x4 Jeep hire, luxury bus services, and customized tour & trekking packages. Fully owned fleet with professional licensed drivers.`,
  keywords: ["car rental Nepal", "Kathmandu vehicle hire", "Jeep rental for Mustang", "luxury tour packages Nepal", "Everest base camp trekking", "Toyota Hiace rental Nepal", "premium travel service Kathmandu"],
  authors: [{ name: "Anudit Khatri" }],
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://mrtourservice.com.np",
    siteName: business.name,
    title: business.name,
    description: business.tagline,
    images: [
      {
        url: "/images/hero/hero.jpg",
        width: 1200,
        height: 630,
        alt: business.name,
      },
    ],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${lora.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
