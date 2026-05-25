# M.R TRAVEL AND TOUR - Manoranjan Ramjham Travel and Tour Pvt. Ltd

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deploy-orange?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com/)

A premium, high-performance travel and tour service platform built for **Manoranjan Ramjham Travel and Tour Pvt. Ltd**, located in Kalopul, Kathmandu, Nepal. This application provides a seamless, lightning-fast digital experience for domestic and international tourists to explore premium vehicle fleets, curated tour packages, and expert-led trekking adventures across the Himalayas.

Designed with a mobile-first, high-fidelity aesthetic, the project is fully optimized for edge deployments on **Cloudflare Pages** utilizing Next.js compiler-at-the-edge technologies.

---

## 🚀 Key Features

*   **Dynamic Fleet Showcase:** An interactive, filterable catalog of a 100% company-owned vehicle fleet. Featured vehicles include Toyota Fortuners (Premium SUVs), BYD Atto 3 (Electric Vehicles), Suzuki Brezza / Tata Nexon (Comfort SUVs), Toyota Hiace (Super GL for group travel), and Luxury Tourist/Mini Buses.
*   **Structured Tour & Trekking Catalogs:** Built-in modal-driven itineraries and detailed exploration pages for Nepal's premier destinations (e.g., Everest Region, Annapurna, Manaslu, Langtang, Upper Mustang, Badimalika, Jeep Tour to Rara).
*   **Dual-Channel Inquiry Engine:** A comprehensive 10-field react inquiry form that validates rental dates (client-side prevention of past pickups or mismatched drop-off timelines) and builds pre-filled, professional compose URLs for both **Gmail** and **WhatsApp API** direct bookings.
*   **Advanced Navigation Scrolling:** Implements custom global hash-link scrolling logic allowing seamless transition from sub-pages (e.g., footer or navbar links) to specific sections on the main page with a pre-configured offset for the sticky header.
*   **Aesthetic Typography & Micro-Animations:** A curated visual style coupling bold Montserrat headings with a trustworthy Lora serif body. Driven by Framer Motion, GSAP, and Tailwind v4 animations (e.g., sub-pixel bounce-subtle, smooth hover scaling, and active section glows).
*   **Interactive Nepal Coverage:** A custom visual coverage section displaying popular destinations watermark-layered over a district map of Nepal.

---

## 🛠️ Tech Stack & Architecture

*   **Framework:** Next.js 16.2.6 (App Router, React Server Components enabled)
*   **Library:** React 19.2.4
*   **Styling:** Tailwind CSS 4.0 & PostCSS (utilizing the new `@tailwindcss/postcss` architecture)
*   **Animations:** Framer Motion (v12) & GSAP (v3)
*   **Icons:** Lucide React
*   **CI/CD & Serverless Edge:** `@cloudflare/next-on-pages` (v1.13.16) & Wrangler (v3.109.2)
*   **Language:** TypeScript 5.x

---

## 📁 Project Structure

The project follows a clean, modular Next.js directory layout designed for static and dynamic edge-rendering capabilities:

```text
src/
├── app/                  # Next.js App Router (Pages, Global styles & Layout)
│   ├── about/            # About Us Page (Company story & core values)
│   ├── contact/          # Interactive contact details & location map
│   ├── fleet/            # Fleet Catalog (Detailed specs and booking CTAs)
│   ├── gallery/          # Visual masonry gallery of trips & client reviews
│   ├── privacy-policy/   # Privacy and terms documentation
│   ├── services/         # Core rental services presentation
│   ├── tours/            # Dedicated tour packages page
│   ├── trekking/         # Detailed trekking routes and duration guides
│   ├── globals.css       # Tailwind CSS v4 entrypoint & custom design tokens
│   ├── layout.tsx        # App-wide root layout (Sticky Navbar, Footer & WhatsApp CTA)
│   └── page.tsx          # Homepage containing sections & teaser cards
├── components/           # Reusable UI and Layout components
│   ├── layout/           # Global elements (Navbar, Footer, WhatsAppButton)
│   ├── sections/         # Feature components (Hero, WhyChooseUs, ServiceInquiryForm)
│   └── ui/               # Lower-level components (TourModal, ImageSlideshow, ScrollToTop)
├── data/                 # Unified JSON data store (Content separation from logic)
│   ├── business.json     # Contact information, phone, email, and social networks
│   ├── fleet.json        # Car/SUV/Bus vehicle details, starting prices, and images
│   ├── gallery.json      # Array of gallery images for quick loading
│   ├── services.json     # Booking capacities, categories, and descriptions
│   ├── team.json         # Executive profiles & core crew
│   ├── testimonials.json # Real tourist testimonials and ratings
│   └── tour_details.json # Detailed itinerary days, prices, and route maps
├── lib/                  # Helper functions and styling utilities
│   └── utils.ts          # Tailwind CSS merge and conditional className utility
└── types/                # Custom TypeScript type definitions
```

---

## ⚙️ Development & Build Workflows

### Prerequisites
*   **Node.js:** version `20.x` or higher
*   **npm:** installed locally

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arthurrgg8-lgtm/mr-tour-service.git
   cd mr-tour-service
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` is used to satisfy dependency constraints with Next.js 16/React 19 configurations)*

### Local Development
To run the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production / Cloudflare Edge
To compile the project using Next-on-Pages:
```bash
npm run pages:build
```
This script transpiles and bundles the Next.js App Router application into a standard Vercel-compatible output and generates static and edge assets under `.vercel/output/static`.

---

## 🚀 Deployment & CI/CD Pipeline

The project is fully integrated with **Cloudflare Pages** for automated CI/CD deployments. Pushing code to the `main` branch triggers a GitHub Actions workflow:

1.  **Workflow Configuration:** Placed in [.github/workflows/deploy.yml](file:///.github/workflows/deploy.yml).
2.  **Steps Executed:**
    *   Checks out the code.
    *   Configures Node.js 22.
    *   Installs dependencies and runs the build command using `NPM_CONFIG_LEGACY_PEER_DEPS=true`.
    *   Transpiles the App Router to Edge Worker functions via `@cloudflare/next-on-pages`.
    *   Deploys the static assets inside `.vercel/output/static` to Cloudflare Pages securely via `cloudflare/pages-action`.

*   **Production Deployment URL:** [https://mr-tour-service.pages.dev](https://mr-tour-service.pages.dev)

---

## 📞 Business Contact & Registration

**Manoranjan Ramjham Travel and Tour Pvt. Ltd** is fully registered under the following government bodies in Nepal:
*   Office of the Company Register
*   Tourism Office, Kathmandu
*   Nepal Travel Vehicle Association (NTVA)

### Contact Details:
*   **Physical Office:** Kalopul, Kathmandu, Nepal
*   **Hotline (24/7 Available):** +977-9702134274
*   **WhatsApp Chat:** [+9779702134274](https://wa.me/9779702134274)
*   **Official Email:** manoranjanramjhamtourandtravel@gmail.com
*   **Find Us on Google Maps:** [Manoranjan Ramjham Travel and Tour Kalopul](https://www.google.com/maps/search/?api=1&query=Manoranjan+Ramjham+Travel+and+Tour+Pvt.+Ltd+Kalopul+Kathmandu)

---

Developed and maintained by LazZy.
