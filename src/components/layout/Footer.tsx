import React from 'react';
import { Github, Twitter, Linkedin, Dribbble, ArrowUp, Mail, MapPin, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050510] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#00e5ff]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                HOUDAIFA
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
            </div>
            <p className="text-[#8892b0] text-sm max-w-sm leading-relaxed">
              Freelance Full-Stack Developer & Creative Coder crafting next-generation 3D web platforms, high-performance web applications, and immersive digital brand experiences.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Select Q3/Q4 Projects
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#8892b0]">
              <li>
                <a href="#about" className="hover:text-[#00e5ff] transition-colors">
                  About Story
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#00e5ff] transition-colors">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#00e5ff] transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00e5ff] transition-colors">
                  Services & Capabilities
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#00e5ff] transition-colors">
                  Pricing & Engagement
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates & Socials */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-white font-semibold mb-4">
              Connect
            </h4>
            <div className="space-y-3 text-sm text-[#8892b0]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00e5ff]" />
                <span>Remote / Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8b5cf6]" />
                <a href="mailto:abdrhmanemerabti512@gmail.com" className="hover:text-white transition-colors">
                  abdrhmanemerabti512@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Dribbble, href: 'https://dribbble.com', label: 'Dribbble' },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-interactive="true"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-[#00e5ff] hover:border-[#00e5ff]/40 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8892b0]">
          <div className="flex items-center gap-1">
            <span>© 2026 HOUDAIFA. Built with</span>
            <span className="text-rose-500 inline-block animate-pulse">❤️</span>
            <span>using Next.js 14, Three.js & Tailwind CSS.</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={scrollToTop}
            aria-label="Back to top"
            icon={<ArrowUp className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};
