import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWhatsAppNumber(phone: string) {
  return phone.replace(/\D/g, "")
}

export function buildWhatsAppUrl(phone: string, message?: string) {
  const baseUrl = `https://wa.me/${getWhatsAppNumber(phone)}`
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export function buildMailtoUrl(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams()

  if (subject) {
    params.set("subject", subject)
  }

  if (body) {
    params.set("body", body)
  }

  const query = params.toString()
  return `mailto:${email}${query ? `?${query}` : ""}`
}

export function buildGmailUrl(email: string, subject?: string, body?: string) {
  const params = new URLSearchParams()
  params.set("view", "cm")
  params.set("fs", "1")
  params.set("to", email)
  if (subject) params.set("su", subject)
  if (body) params.set("body", body)
  
  return `https://mail.google.com/mail/?${params.toString()}`
}

export function scrollToId(id: string, offset = 100, addGlow = false) {
  const element = document.getElementById(id)
  
  if (element) {
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
    
    if (addGlow) {
      element.classList.remove('animate-section-glow')
      void (element as HTMLElement).offsetWidth // trigger reflow
      element.classList.add('animate-section-glow')
    }
    
    return true
  }
  return false
}

