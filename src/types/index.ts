export interface Project {
  id: string;
  title: string;
  category: 'Web' | 'App' | 'E-commerce' | '3D';
  status?: 'Concept' | 'In Development';
  year: string;
  tagline: string;
  description: string;
  metric: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  caseStudy: {
    challenge: string;
    solution: string;
    result: string;
    metrics: { label: string; value: string }[];
    technologies: string[];
  };
}

export interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  deliverables: string[];
  startingPrice: string;
  timeline: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Creative 3D' | 'DevOps & Tools';
  level: number; // 0-100
  icon: string;
  highlight?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period?: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  projectType: string;
  budget: string;
  message: string;
}
