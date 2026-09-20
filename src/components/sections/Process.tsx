import React from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Code, Rocket, CheckCircle2 } from 'lucide-react';
import {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  cardRevealVariants,
  iconBounceVariants,
} from '../../lib/scrollAnimations';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      phase: 'Week 1',
      icon: Search,
      color: '#00e5ff',
      description: 'Aligning business objectives, technical scope, brand visual targets, and 3D architectural feasibility to create a strict sprint roadmap.',
      deliverables: ['Technical Architecture Spec', 'Asset & 3D Audit', 'Sprint Milestone Schedule']
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      phase: 'Week 1–2',
      icon: Compass,
      color: '#8b5cf6',
      description: 'Crafting pixel-perfect Figma prototypes, interactive WebGL lighting studies, custom motion curves, and typographic systems.',
      deliverables: ['Figma Design System', 'Interactive Motion Specs', 'Responsive Grid Layouts']
    },
    {
      number: '03',
      title: 'Develop & Polish',
      phase: 'Week 2–3',
      icon: Code,
      color: '#ff2d95',
      description: 'Writing type-safe Next.js / React components, Three.js shaders, resilient API integrations, and executing performance stress testing.',
      deliverables: ['TypeScript Modular Code', 'Three.js 60 FPS Engine', 'Micro-Interactions & Audio']
    },
    {
      number: '04',
      title: 'Deploy & Scale',
      phase: 'Week 4',
      icon: Rocket,
      color: '#00e5ff',
      description: 'Deploying to edge CDNs (Vercel / Cloud Run), auditing 95+ Core Web Vitals, configuring DNS, and handing over clean documentation.',
      deliverables: ['Lighthouse 95+ Certification', 'Production DNS & SSL', '30-Day Post-Launch Warranty']
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative bg-[#050510]/90">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionLabelVariants}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-8 h-[1px] bg-[#ff2d95]" />
              <span className="text-xs font-mono tracking-widest text-[#ff2d95] uppercase">
                05 / Method & Execution
              </span>
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionHeadingVariants}
              className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              The blueprint to flawless execution.
            </motion.h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionParagraphVariants}
            className="max-w-md text-sm sm:text-base text-[#8892b0]"
          >
            A transparent four-phase framework engineered to eliminate guesswork, respect hard deadlines, and guarantee Awwwards-worthy deliverables.
          </motion.p>
        </div>

        {/* 4 Steps Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle horizontal track across steps on desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 1.2, ease: premiumEase }}
            style={{ transformOrigin: 'left' }}
            className="hidden lg:block absolute top-[44px] left-8 right-8 h-[1px] bg-gradient-to-r from-[#00e5ff]/30 via-[#8b5cf6]/30 to-[#ff2d95]/30 z-0 pointer-events-none"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={{
                  hidden: cardRevealVariants.hidden,
                  visible: {
                    ...cardRevealVariants.visible,
                    transition: {
                      duration: 0.7,
                      delay: idx * 0.12,
                      ease: premiumEase,
                    },
                  },
                }}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between z-10"
              >
                <div>
                  {/* Top Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.span
                      initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                      whileInView={{ scale: [0.8, 1.05, 1], rotate: 0, opacity: 1 }}
                      viewport={viewportConfig}
                      transition={{ duration: 0.7, delay: 0.15 + idx * 0.1, ease: premiumEase }}
                      className="font-heading text-3xl font-extrabold"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </motion.span>
                    <motion.div
                      variants={iconBounceVariants}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ color: step.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-[#8892b0] border border-white/[0.06] mb-3 inline-block">
                    {step.phase}
                  </span>

                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[#00e5ff] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#8892b0] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                  {step.deliverables.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00e5ff] transition-colors shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
