"use client"

import { MessageCircle } from "lucide-react"
import { scrollToId } from "@/lib/utils"

interface EnquireButtonProps {
  variant?: "full" | "inline"
  children?: React.ReactNode
  className?: string
  targetId?: string
}

export default function EnquireButton({
  variant = "inline",
  children,
  className = "",
  targetId = "inquiry-form",
}: EnquireButtonProps) {
  const scrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const scrolled = scrollToId(targetId, 80, true)
    if (!scrolled) {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        window.location.href = `/#${targetId}`
      }
    }
  }

  if (variant === "full") {
    return (
      <button 
        type="button"
        onClick={scrollToForm}
        className={`w-full mt-8 flex items-center justify-center lg:justify-start gap-3 text-primary bg-primary/5 p-4 rounded-2xl border border-primary/10 hover:bg-primary/10 transition-colors group/btn ${className}`}
      >
        <MessageCircle className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
        <p className="font-bold text-sm tracking-wide uppercase">Contact for more details and prices OR ENQUIRE NOW</p>
      </button>
    )
  }

  return (
    <button 
      type="button"
      onClick={scrollToForm}
      className={`inline-flex h-11 sm:h-14 items-center justify-center rounded-xl sm:rounded-2xl bg-primary px-6 sm:px-10 text-xs sm:text-base font-bold text-white hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 cursor-pointer ${className}`}
    >
      {children || "Enquire Now"}
    </button>
  )
}
