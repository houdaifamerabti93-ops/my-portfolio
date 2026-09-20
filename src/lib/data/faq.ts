import { FAQItem } from '../../types';

export const faqData: FAQItem[] = [
  {
    question: 'What is your typical project delivery timeline?',
    answer: 'Timeline depends on project scope and technical requirements. A high-impact 3D landing page typically takes 1–2 weeks, while a full-scale web application or headless e-commerce build generally ranges between 3–5 weeks. I work on strict sprint milestones so you always know where we stand.'
  },
  {
    question: 'How does your pricing and payment schedule work?',
    answer: 'Projects are scoped at fixed transparent pricing so there are never surprise billings. Typically, we operate on a 50% deposit upon kickoff and 50% upon final delivery, testing, and deployment to your production domain. Custom milestone splits (33/33/34) are also available for larger custom projects.'
  },
  {
    question: 'How do you ensure 3D and WebGL experiences run fast on mobile phones?',
    answer: 'Performance is engineered from the first line of code. I write low-overhead instanced geometries, cap pixel ratios (dpr) strictly to 2.0, throttle physics updates when out of viewport, implement WebGL draw-call batching, and supply graceful CSS/2D fallbacks for battery saver or low-power hardware.'
  },
  {
    question: 'Can you work with my existing Figma design or design team?',
    answer: 'Absolutely. I frequently partner with design agencies, in-house product teams, or independent creative directors to translate Figma, Spline, or Cinema4D designs into clean, production-ready code down to the single pixel and frame.'
  },
  {
    question: 'What is included in post-launch support and revisions?',
    answer: 'All projects include 2–3 rounds of targeted revisions during development, followed by 14 to 30 days of comprehensive post-launch warranty support. This covers bug fixes, browser compatibility checks, and DNS/deployment assistance.'
  },
  {
    question: 'What tech stack do you recommend for high-performance web applications?',
    answer: 'My primary stack is Next.js 14+ (or React 19 + Vite for ultra-fast SPA setups), TypeScript, Tailwind CSS, Three.js with custom GLSL shaders, GSAP/Motion for fluid physics, and Node.js / PostgreSQL / Supabase for backend services. This combination delivers unbeatable Lighthouse metrics and modern interactive prowess.'
  },
  {
    question: 'Are you available for ongoing monthly engineering retainers?',
    answer: 'Yes! For established startups and scale-ups needing continuous product development, design engineering sprints, and performance maintenance, I offer fractional creative engineering retainers with dedicated weekly hours and priority Slack response.'
  }
];
