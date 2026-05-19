"use client"

import { MessageCircle } from "lucide-react"
import business from "@/data/business.json"

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${business.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce-subtle"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:hidden" />
      <MessageCircle className="h-8 w-8 relative z-10" />
      <span className="absolute -top-12 right-0 scale-0 group-hover:scale-100 origin-bottom-right transition-all duration-300 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-2xl">
        Chat with us 💬
      </span>
    </a>
  )
}
