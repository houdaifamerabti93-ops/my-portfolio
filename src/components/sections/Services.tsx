import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { servicesData } from '../../lib/data/services';
import { TiltCard } from '../ui/TiltCard';
import { SectionHeader } from '../ui/ScrollReveal';
import {
  premiumEase,
  viewportConfig,
  cardRevealVariants,
  iconBounceVariants,
} from '../../lib/scrollAnimations';

export const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'ShoppingBag': return ShoppingBag;
      case 'Sparkles': return Sparkles;
      default: return Sparkles;
    }
  };

  const handleServiceSelect = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-select project type or set focus
      const selectElem = document.getElementById('project-type-select') as HTMLSelectElement | null;
      if (selectElem) {
        selectElem.value = serviceTitle;
        // Dispatch synthetic change event so React state updates
        selectElem.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <SectionHeader
          label="02 / Capabilities & Offerings"
          title="Modern web services for ambitious projects."
          subtitle="Every project includes full IP ownership, optimized performance, and 1 month of free post-launch support."
          accentColor="#8b5cf6"
          align="split"
        />

        {/* 3 Core Services Glassmorphism 3D Tilt Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
          {servicesData.map((service, index) => {
            const Icon = getIcon(service.iconName);
            return (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={{
                  hidden: cardRevealVariants.hidden,
                  visible: {
                    ...cardRevealVariants.visible,
                    transition: {
                      duration: 0.7,
                      delay: (index % 3) * 0.1,
                      ease: premiumEase,
                    },
                  },
                }}
                className="h-full"
              >
                <TiltCard
                  onClick={() => handleServiceSelect(service.title)}
                  className="group p-8 sm:p-10 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#00e5ff]/40 shadow-[0_8px_32px_rgba(0,0,0,0.37)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
                >
                  <div>
                    {/* Top Bar: Bigger Prominent Icon + Custom Timeline Badge */}
                    <div className="flex items-center justify-between mb-8">
                      <motion.div
                        variants={iconBounceVariants}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-[#00e5ff] group-hover:text-[#ff2d95] group-hover:scale-110 transition-all shadow-[0_0_24px_rgba(0,229,255,0.2)]"
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>
                      <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/[0.04] text-[#8892b0] border border-white/[0.06]">
                        {service.timeline}
                      </span>
                    </div>

                    {/* Title & Description with generous breathing room */}
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#8892b0] leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Deliverables list */}
                    <div className="space-y-3 mb-8 pt-5 border-t border-white/[0.06]">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/85">
                          <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Starting Price + Action */}
                  <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#8892b0]">
                        Investment
                      </div>
                      <div className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                        Starting from {service.startingPrice}
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#00e5ff] text-white/70 group-hover:text-[#050510] flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
