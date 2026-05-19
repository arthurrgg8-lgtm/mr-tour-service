import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

