import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import { Hero3DScene } from '../3d/Hero3DScene';
import { useTextScramble } from '../../hooks/useTextScramble';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const headline = 'Crafting Digital Experiences.';
  const { displayText, scramble } = useTextScramble(headline, 30);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 overflow-hidden select-none"
    >
      {/* 3D Interactive Scene Background */}
      <Hero3DScene />

      {/* Radial soft vignettes */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050510]/40 to-[#050510] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 hover:border-[#00e5ff]/40 transition-colors">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-xs font-mono tracking-wide text-white/90">
            Available for freelance & contract roles
          </span>
        </div>

        {/* Big Headline with Text Scramble */}
        <h1
          onMouseEnter={scramble}
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] cursor-default"
        >
          {displayText}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-xl text-[#8892b0] font-normal leading-relaxed mb-10">
          Full-Stack Developer & Creative Coder with{' '}
          <span className="text-white font-semibold">5+ years experience</span>{' '}
          architecting bespoke high-performance web applications, 3D WebGL interfaces, and scalable platforms.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo('projects')}
            icon={<ArrowUpRight className="w-4 h-4" />}
            iconPosition="right"
          >
            View Work
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollTo('contact')}
            icon={<Sparkles className="w-4 h-4 text-[#00e5ff]" />}
            iconPosition="left"
          >
            Hire Me
          </Button>
        </div>

        {/* Tech Badges / Micro Terminal Pill */}
        <div className="hidden sm:inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-[#8892b0]">
          <span className="flex items-center gap-1.5 text-white/90">
            <Terminal className="w-3.5 h-3.5 text-[#00e5ff]" /> stack:
          </span>
          <span>Next.js 14+</span>
          <span className="text-white/20">•</span>
          <span>Three.js</span>
          <span className="text-white/20">•</span>
          <span>TypeScript</span>
          <span className="text-white/20">•</span>
          <span>Tailwind</span>
        </div>
      </div>

      {/* Scroll indicator at bottom */}
      <button
        onClick={() => scrollTo('trusted')}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-xs font-mono tracking-widest text-[#8892b0] hover:text-[#00e5ff] transition-colors group cursor-pointer"
      >
        <span className="uppercase text-[10px] tracking-widest opacity-80">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-[#00e5ff]/60 transition-colors">
          <div className="w-1.5 h-2.5 rounded-full bg-[#00e5ff] animate-bounce" />
        </div>
      </button>
    </section>
  );
};
