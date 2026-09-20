import { PricingTier } from '../../types';

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Sprint',
    badge: 'Single Page / MVP',
    price: '$2,400',
    period: 'per project',
    description: 'Perfect for startups, product launches, or founders needing an Awwwards-worthy landing page to impress investors and capture leads.',
    popular: false,
    features: [
      'High-impact single-page landing site',
      'Interactive 3D or WebGL hero canvas',
      'Smooth Lenis scrolling & micro-interactions',
      'Framer Motion UI animations',
      'Contact form with instant email alerts',
      'Full mobile responsiveness & SEO setup',
      '1–2 weeks delivery turnaround',
      '2 rounds of revisions'
    ],
    ctaText: 'Choose Starter'
  },
  {
    id: 'pro',
    name: 'Full-Stack Pro',
    badge: 'Most Popular',
    price: '$4,800',
    period: 'per project',
    description: 'Comprehensive full-stack web application or headless e-commerce experience with custom backend architecture and rich 3D interactions.',
    popular: true,
    features: [
      'Up to 6 custom designed pages/views',
      'Advanced Three.js 3D scenes & shaders',
      'Full-stack Next.js / React + Node.js backend',
      'PostgreSQL / Supabase / Redis integration',
      'Stripe or Payment gateway setup',
      'Role-based authentication & analytics',
      'Performance audit (95+ Lighthouse guaranteed)',
      '3–4 weeks delivery turnaround',
      '30 days dedicated post-launch support'
    ],
    ctaText: 'Get Started with Pro'
  },
  {
    id: 'custom',
    name: 'Enterprise Bespoke',
    badge: 'Custom Architecture',
    price: 'Custom',
    period: 'quote tailored',
    description: 'For organizations seeking bespoke creative technology, spatial 3D WebOS platforms, real-time multiplayer applications, or dedicated retainer engineering.',
    popular: false,
    features: [
      'Unlimited scope & custom architecture',
      'Custom WebGL / GLSL shaders & physics engine',
      'Real-time WebSockets & collaborative multiplayer',
      'Enterprise cloud deployment & Docker configs',
      'Design system & component documentation',
      'Weekly sprint demos & direct Slack access',
      'Flexible timeline & priority queuing',
      'NDA & intellectual property guarantee'
    ],
    ctaText: 'Schedule Architecture Call'
  }
];
