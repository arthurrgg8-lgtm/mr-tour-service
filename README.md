# M.R TRAVEL AND TOUR - Manoranjan Ramjham Travel and Tour Pvt. Ltd

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Static_Deploy-orange?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com/)

A premium, high-performance vehicle rental and corporate fleet platform built for **Manoranjan Ramjham Travel and Tour Pvt. Ltd**, located in Kalopul, Kathmandu, Nepal. This application provides a seamless, ultra-fast digital experience for renting premium cars, luxury SUVs, 4x4 off-road jeeps, Hiace vans, and luxury buses across Nepal.

Optimized with native Next.js static exports (`output: 'export'`) deployed directly to **Cloudflare Pages** at the edge.

---

## 🚀 Key Features

*   **100% Owned Vehicle Fleet Showcase:** Interactive, filterable catalog of company-owned vehicles including Toyota Fortuners (Premium SUVs), BYD Atto 3 (EVs), Suzuki Brezza / Tata Nexon (Compact SUVs), Mahindra Scorpio 4WD (Off-Road Jeeps), Toyota Hiace Super GL, and Luxury Sutlej/Mini Buses.
*   **Self-Drive & Corporate Leasing:** Dedicated portals for self-drive vehicle hire with driverless packages, as well as enterprise B2B long-term vehicle leasing solutions.
*   **In-Depth SEO Travel & Road Guides:** Full-width, high-authority blog articles covering Nepal road conditions, highway guides, self-drive prerequisites, seasonal travel tips, and corporate fleet strategies.
*   **Dual-Channel Instant Inquiries:** Integrated inquiry forms with instant pre-filled compose URLs for both **WhatsApp API** and **Gmail**, backed by client-side validation and Google Ads conversion tracking (`AW-18048947362`).
*   **Modern UI & Micro-Animations:** Clean typography powered by Google Font **Urbanist**, synchronized with Framer Motion scroll reveals (`FadeIn`, `StaggerContainer`, `Float`, `HoverCard`) and GSAP hero choreography.
*   **OWASP Top 10 Security Hardened:** XSS neutralization via `safeJsonLdStringify`, tabnabbing prevention (`rel="noopener noreferrer"`), rigorous input sanitization, length bounds, and strict HTTP security headers.

---

## 🛠️ Tech Stack & Architecture

*   **Framework:** Next.js 16.2.6 (Static Export: `output: 'export'`)
*   **Library:** React 19.2.4
*   **Styling:** Tailwind CSS 4.0 & PostCSS
*   **Animations:** Framer Motion (v12) & GSAP (v3)
*   **Icons:** Lucide React
*   **Hosting & CI/CD:** Cloudflare Pages with GitHub Actions
*   **Language:** TypeScript 5.x

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages, Global styles & Layout)
│   ├── about/            # About Us Page (Company story & core values)
│   ├── blog/             # SEO blog index & dynamic full-width guide pages ([slug])
│   ├── contact/          # Interactive contact details & 24/7 support channels
│   ├── corporate-rent/   # Corporate leasing, long-term rentals & VIP fleets
│   ├── fleet/            # Fleet overview with vehicle category filters
│   ├── gallery/          # Visual masonry gallery & client reviews
│   ├── privacy-policy/   # Privacy policy & data protection terms
│   ├── self-drive/       # Driverless self-drive rentals with FAQs
│   ├── services/         # Core rental services presentation
│   ├── vehicles/         # Vehicle catalog index and category pages ([slug])
│   ├── globals.css       # Tailwind CSS v4 entrypoint & custom design tokens
│   ├── layout.tsx        # App-wide root layout (Navbar, Footer, GTag, WhatsApp CTA)
│   └── page.tsx          # Homepage with Hero, fleet showcase, and testimonials
├── components/           # Reusable UI and Layout components
│   ├── layout/           # Global elements (Navbar, Footer, WhatsAppButton)
│   ├── sections/         # Feature sections (Hero, QuickInquiryForm, ServiceInquiryForm)
│   └── ui/               # Motion primitives (FadeIn, Float), ImageSlideshow, ScrollToTop
├── data/                 # Unified JSON data store (Content separation from logic)
│   ├── blog-posts.json   # High-authority SEO articles and guide content
│   ├── business.json     # Company details, phone numbers, email, and social handles
│   ├── fleet.json        # Car/SUV/Bus vehicle details, starting prices, and photos
│   ├── gallery.json      # Array of gallery images for quick loading
│   ├── services.json     # Fleet categories, booking capacities, and descriptions
│   ├── team.json         # Executive profiles & operations team
│   ├── testimonials.json # Verified client reviews and ratings
│   ├── vehicle-faqs.json # Category-specific FAQs for vehicle pages
│   └── vehicle-seo.json  # SEO metadata, headings, and advantages per vehicle slug
├── lib/                  # Utilities & analytics
│   ├── gtag.ts           # Google Tag & Google Ads conversion tracking triggers
│   └── utils.ts          # Class merging, URL builders, and security sanitization
└── types/                # Custom TypeScript definitions
```

---

## ⚙️ Development & Build Workflows

### Prerequisites
*   **Node.js:** version `20.x` or `22.x`
*   **npm:** installed locally

### Installation
```bash
npm install --legacy-peer-deps
```

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```
Generates 27 static HTML pages directly into the `out/` directory for zero-latency CDN distribution.

---

## 🚀 Deployment & CI/CD Pipeline

Pushing to the `main` branch triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`:
1. Checks out repository.
2. Sets up Node.js 22 with npm cache.
3. Runs `npm install` with `legacy-peer-deps`.
4. Runs `npm run build` to create static assets in `out/`.
5. Deploys `out/` to Cloudflare Pages via `cloudflare/pages-action`.

*   **Production URL:** [https://manoranjan.com.np](https://manoranjan.com.np)
*   **Cloudflare Pages URL:** [https://mr-tour-service.pages.dev](https://mr-tour-service.pages.dev)

---

## 📞 Business Contact & Registration

**Manoranjan Ramjham Travel and Tour Pvt. Ltd** is registered under:
*   Office of the Company Register
*   Tourism Office, Kathmandu
*   Nepal Travel Vehicle Association (NTVA)

### Contact Details:
*   **Physical Office:** Kalopul, Kathmandu, Nepal
*   **Hotline (24/7 Available):** +977-9702134274
*   **WhatsApp Chat:** [+9779702134274](https://wa.me/9779702134274)
*   **Official Email:** manoranjantravels2024@gmail.com
*   **Find Us on Google Maps:** [Manoranjan Ramjham Travel and Tour Kalopul](https://www.google.com/maps/search/?api=1&query=Manoranjan+Ramjham+Travel+and+Tour+Pvt.+Ltd+Kalopul+Kathmandu)

---

Developed and maintained by LazZy.
