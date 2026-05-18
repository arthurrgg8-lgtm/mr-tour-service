"use client"

import { MessageCircle } from "lucide-react"
import business from "@/data/business.json"

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${business.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="absolute -top-12 right-0 hidden group-hover:block whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white">
        Chat with us
      </span>
    </a>
  )
}
