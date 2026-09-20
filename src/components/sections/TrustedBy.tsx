import React from 'react';
import { trustedClients } from '../../lib/data/skills';

export const TrustedBy: React.FC = () => {
  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...trustedClients, ...trustedClients, ...trustedClients];

  return (
    <section id="trusted" className="py-16 border-y border-white/[0.06] bg-[#050510]/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-[#8892b0]">
          Trusted by high-growth startups, scale-ups & venture-backed products
        </p>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden mask-gradient">
        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex items-center gap-10 sm:gap-16 py-2">
          {marqueeItems.map((client, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#00e5ff]/40 transition-all duration-300 cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-heading font-bold text-xs text-[#8892b0] group-hover:text-[#00e5ff] group-hover:bg-[#00e5ff]/10 group-hover:shadow-[0_0_12px_rgba(0,229,255,0.4)] transition-all">
                {client.logo.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-heading font-semibold text-sm tracking-wide text-[#8892b0] group-hover:text-white transition-colors">
                  {client.name}
                </div>
                <div className="text-[11px] font-mono text-white/40 group-hover:text-[#00e5ff]/80 transition-colors">
                  {client.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
