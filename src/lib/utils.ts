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

export function scrollToId(id: string, offset = 80, addGlow = false) {
  const element = document.getElementById(id)
  
  if (element) {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
    const elementPosition = element.getBoundingClientRect().top + scrollY
    const offsetPosition = Math.max(0, elementPosition - offset)

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


/**
 * Sanitizes user input by removing potentially dangerous characters
 * and enforcing maximum length to prevent injection attacks and DoS.
 */
export function sanitizeInput(input: string, maxLength = 500): string {
  if (typeof input !== "string") return ""
  return input
    .slice(0, maxLength)
    .replace(/[<>"'\\]/g, "") // Remove HTML tags and injection delimiters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "") // Remove control characters
    .trim()
}

/**
 * Validates email addresses against common injection patterns.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates phone numbers (allows digits, spaces, hyphens, plus).
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.length > 25) return false
  return /^[+0-9\s\-()]{7,25}$/.test(phone.trim())
}

/**
 * Safely serializes JSON for inclusion inside <script type="application/ld+json">
 * tags, neutralizing script tag breakouts and HTML injection attacks (OWASP standard).
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
}
