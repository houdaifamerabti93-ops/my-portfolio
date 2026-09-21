import { Service } from '../../types';

export const servicesData: Service[] = [
  {
    id: 'web-dev',
    iconName: 'Code2',
    title: 'Web Development (React / Next.js)',
    description: 'Bespoke web applications built with modern architectures, clean component modularity, enterprise TypeScript, and resilient state management designed to scale effortlessly.',
    deliverables: [
      'Custom Next.js / React Architecture',
      'Server Actions & Edge Rendering',
      'Full Responsive & Mobile First',
      'Bulletproof TypeScript Codebase',
    ],
    startingPrice: '$800',
    timeline: 'Custom timeline',
  },
  {
    id: 'ecommerce',
    iconName: 'ShoppingBag',
    title: 'E-commerce & Storefronts',
    description: 'Blazing-fast headless commerce experiences engineered for maximum conversion, dynamic cart interactions, Stripe / Shopify integration, and 3D product visualizers.',
    deliverables: [
      'Headless Shopify / Medusa / Stripe',
      'Sub-second Checkout Flow',
      'Inventory & Analytics Hookups',
      '3D Interactive Product Viewers',
    ],
    startingPrice: '$1,200',
    timeline: 'Custom timeline',
  },
  {
    id: 'landing-pages',
    iconName: 'Sparkles',
    title: 'Landing Pages & Creative UI',
    description: 'Awwwards-level storytelling landing pages packed with magnetic physics, custom WebGL / Three.js 3D elements, micro-interactions, and persuasive copy alignment.',
    deliverables: [
      'Custom 3D / WebGL Hero Canvas',
      'Scroll-Triggered Micro-Interactions',
      'Interactive Calculators / Demos',
      'Guaranteed 95+ Lighthouse Score',
    ],
    startingPrice: '$500',
    timeline: 'Custom timeline',
  },
];
