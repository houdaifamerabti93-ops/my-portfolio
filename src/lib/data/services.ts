import { Service } from '../../types';

export const servicesData: Service[] = [
  {
    id: 'web-dev',
    iconName: 'Code2',
    title: 'Web Development (React/Next.js)',
    description: 'Bespoke web applications built with modern architectures, clean component modularity, enterprise TypeScript, and resilient state management designed to scale effortlessly.',
    deliverables: ['Custom Next.js / React Architecture', 'Server Actions & Edge Rendering', 'Full Responsive & Mobile First', 'Bulletproof TypeScript Codebase'],
    startingPrice: '$3,500',
    timeline: 'Custom timeline'
  },
  {
    id: 'ecommerce',
    iconName: 'ShoppingBag',
    title: 'E-commerce & Storefronts',
    description: 'Blazing-fast headless commerce experiences engineered for maximum conversion, dynamic cart interactions, Stripe / Shopify integration, and 3D product visualizers.',
    deliverables: ['Headless Shopify / Medusa / Stripe', 'Sub-second Checkout Flow', 'Inventory & Analytics Hookups', '3D Interactive Product Viewers'],
    startingPrice: '$4,200',
    timeline: 'Custom timeline'
  },
  {
    id: 'landing-pages',
    iconName: 'Sparkles',
    title: 'High-Impact Landing Pages',
    description: 'Awwwards-level storytelling landing pages packed with magnetic physics, custom WebGL / Three.js 3D elements, micro-interactions, and persuasive copy alignment.',
    deliverables: ['Custom 3D / WebGL Hero Canvas', 'Scroll-Triggered Micro-Interactions', 'Interactive Calculators / Demos', 'Guaranteed 95+ Lighthouse Score'],
    startingPrice: '$2,400',
    timeline: 'Custom timeline'
  },
  {
    id: 'backend-api',
    iconName: 'Server',
    title: 'API & Backend Architecture',
    description: 'Scalable serverless microservices, real-time WebSocket pipelines, robust REST / GraphQL endpoints, and secure database modeling with PostgreSQL, Redis, and Docker.',
    deliverables: ['High-Concurrency Edge & Cloud APIs', 'PostgreSQL & Drizzle / Prisma ORM', 'Real-time WebSocket & SSE feeds', 'Comprehensive Security & Rate Limiting'],
    startingPrice: '$3,800',
    timeline: 'Custom timeline'
  },
  {
    id: 'ui-implementation',
    iconName: 'Layout',
    title: 'Creative UI Implementation',
    description: 'Flawless 1:1 translation of complex Figma concepts into fluid, accessible, dark-futuristic interfaces with custom CSS shaders, glassmorphism, and responsive finesse.',
    deliverables: ['Pixel-Perfect Figma to Code', 'Framer Motion & Fluid Transitions', 'Design System & Component Library', 'Strict WCAG AA+ Accessibility'],
    startingPrice: '$2,800',
    timeline: 'Custom timeline'
  },
  {
    id: 'performance-opt',
    iconName: 'Gauge',
    title: 'Performance Optimization',
    description: 'Deep-dive audit and optimization of sluggish websites. Minimizing bundle sizes, eliminating layout shifts, optimizing 3D canvases, and locking in 98+ Core Web Vitals.',
    deliverables: ['Complete Core Web Vitals Audit', 'WebGL & Canvas FPS Tuning', 'Asset & Bundle Tree Shaking', 'CDN & Edge Caching Strategy'],
    startingPrice: '$1,800',
    timeline: 'Custom timeline'
  }
];
