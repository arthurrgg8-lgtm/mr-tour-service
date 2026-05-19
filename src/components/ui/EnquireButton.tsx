"use client"

import { MessageCircle } from "lucide-react"
import { scrollToId } from "@/lib/utils"

interface EnquireButtonProps {
  variant?: "full" | "inline"
  children?: React.ReactNode
}

export default function EnquireButton({ variant = "inline", children }: EnquireButtonProps) {
  const scrollToForm = () => {
    scrollToId('inquiry-form')
  }

  if (variant === "full") {
    return (
      <button 
        onClick={scrollToForm}
        className="w-full mt-8 flex items-center justify-center lg:justify-start gap-3 text-primary bg-primary/5 p-4 rounded-2xl border border-primary/10 hover:bg-primary/10 transition-colors group/btn"
      >
        <MessageCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
        <p className="font-bold text-sm tracking-wide uppercase">Contact for more details and prices OR ENQUIRE NOW</p>
      </button>
    )
  }

  return (
    <button 
      onClick={scrollToForm}
      className="inline-flex h-14 items-center justify-center rounded-2xl bg-primary px-10 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
    >
      {children || "Enquire Now"}
    </button>
  )
}
