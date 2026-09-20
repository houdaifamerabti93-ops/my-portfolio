# HOUDAIFA — Awwwards-Level 3D Developer Portfolio

A modern, high-performance, dark-futuristic 3D portfolio website engineered for an elite freelance full-stack developer & creative technologist.

Built with **Three.js**, **React 19 / Next.js architecture**, **Tailwind CSS v4**, **Motion**, and **Lenis smooth scrolling**.

---

## ✨ Features & Architecture

- **Interactive 3D Hero Scene**: Custom Three.js canvas rendering a floating metallic wireframe torus knot with cyan, purple, and magenta point lights, responsive particle mesh (2,000+ interactive particles), and mouse parallax physics with lerp damping.
- **Text Scramble Effect**: Animated letter scramble on the hero headline upon page entry and hover.
- **Magnetic Physics**: Magnetic cursor pull on primary CTA buttons (`useMagnetic`).
- **Interactive Custom Cursor**: Dual-element desktop cursor (central sharp dot + trailing aura ring) that expands over interactive elements and auto-hides on touch devices.
- **Lenis Smooth Scroll**: Buttery 60 FPS inertia scrolling across all sections.
- **Top Scroll Progress**: Real-time gradient progress bar indicating page scroll depth.
- **3D Card Perspective Tilt**: Physical 3D tilt with dynamic light glare on project and service cards.
- **Comprehensive Case Study Modals**: Full-screen modal breakdowns displaying technical challenges, solutions, business outcomes, and key performance metrics.
- **Interactive Contact Form**: Inline form validation, custom project type & budget selectors, instant confetti celebration upon dispatch, direct Calendly and WhatsApp links, and one-click copy email button.
- **Glassmorphism Design System**: Tailored dark-futuristic palette (`#050510`, `#00e5ff`, `#8b5cf6`, `#ff2d95`), subtle noise texture overlay, and typographic pairing (Space Grotesk, Inter, JetBrains Mono).

---

## 🚀 Sections Included (In Order)

1. **Preloader**: Animated brand reveal with progress counter (0 → 100%) and system status indicators.
2. **Navbar (Sticky)**: Backdrop blur, active section indicator with pulsing cyan dot, magnetic "Let's Talk" CTA, and responsive mobile drawer.
3. **Hero**: Interactive 3D scene, text-scrambled headline, freelance availability badge, and dual CTAs.
4. **Trusted By**: Infinite marquee of clients and technologies with grayscale-to-color hover transition.
5. **About**: Split layout with 3D holographic avatar card, narrative story, 4 live stats, and CV download.
6. **Services**: 6 glassmorphism cards with 3D tilt, deliverables checklist, and starting prices.
7. **Skills / Tech Stack**: Categorized skill grid with hover lift, level bars, and tech ticker marquee.
8. **Projects**: Category filter tabs (`All`, `3D`, `Web`, `App`, `E-commerce`), 3D tilt cards, and case study modals.
9. **Process**: 4-phase horizontal roadmap (Discovery, Design, Develop, Deploy) with milestones.
10. **Testimonials**: Auto-playing testimonial carousel with avatars, star ratings, and manual controls.
11. **Pricing**: 3 transparent tiers (Starter, Pro with popular glow, Custom) with pre-fill CTAs.
12. **FAQ**: Smooth expandable accordion answering common client inquiries.
13. **Contact**: Form with validation, confetti animation, WhatsApp, Calendly, and copy-email tool.
14. **Footer**: Brand tagline, social coordinates, copyright, and back-to-top button.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite (Next.js 14 App Router compatible)
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism Shaders
- **3D Graphics**: Three.js (WebGL, BufferGeometry, Instanced Particles, Shaders)
- **Animations**: Motion (`motion/react`)
- **Smooth Scrolling**: Lenis (`lenis`)
- **Icons**: Lucide React (`lucide-react`)
- **Effects**: Canvas Confetti (`canvas-confetti`)
- **Type Safety**: Strict TypeScript

---

## 📦 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
The application will run at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```

---

## 🎨 Customization Guide

All portfolio content is decoupled into clean data files in `src/lib/data/`:
- `src/lib/data/projects.ts` — Case studies, images, metrics, and links.
- `src/lib/data/services.ts` — Offerings, deliverables, and starting prices.
- `src/lib/data/skills.ts` — Tech stacks, icons, and proficiency levels.
- `src/lib/data/testimonials.ts` — Client quotes, avatars, and ratings.
- `src/lib/data/pricing.ts` — Pricing packages and feature lists.
- `src/lib/data/faq.ts` — Frequently asked questions.

---

## 🌐 Deploy to Vercel / Cloud Run

- **Vercel**: Import the repository, leave framework preset as Vite or Next.js, and click Deploy.
- **Cloud Run / Docker**: Standard container runs with Node on port 3000.
