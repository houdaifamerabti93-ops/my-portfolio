import React from 'react';
import { 
  Code2, 
  ShoppingBag, 
  Sparkles, 
  Server, 
  Layout, 
  Gauge, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { servicesData } from '../../lib/data/services';
import { TiltCard } from '../ui/TiltCard';

export const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'ShoppingBag': return ShoppingBag;
      case 'Sparkles': return Sparkles;
      case 'Server': return Server;
      case 'Layout': return Layout;
      case 'Gauge': return Gauge;
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
      }
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#8b5cf6]" />
              <span className="text-xs font-mono tracking-widest text-[#8b5cf6] uppercase">
                02 / Capabilities & Offerings
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Modern web services for ambitious projects.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#8892b0]">
            Every project includes full IP ownership, optimized performance, and 1 month of free post-launch support.
          </p>
        </div>

        {/* 6 Glassmorphism 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <TiltCard
                key={service.id}
                onClick={() => handleServiceSelect(service.title)}
                className="group p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#00e5ff]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Timeline */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-[#00e5ff] group-hover:text-[#ff2d95] group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-[#8892b0] border border-white/[0.06]">
                      {service.timeline}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#00e5ff] transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#8892b0] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/[0.06]">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Starting Price + Action */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#8892b0]">
                      Investment
                    </div>
                    <div className="font-heading text-lg font-bold text-white group-hover:text-[#00e5ff] transition-colors">
                      Starting {service.startingPrice}
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#00e5ff] text-white/70 group-hover:text-[#050510] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
