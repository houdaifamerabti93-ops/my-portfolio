import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/effects/Preloader';
import { CustomCursor } from './components/effects/CustomCursor';
import { ScrollProgress } from './components/effects/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustedBy } from './components/sections/TrustedBy';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Process } from './components/sections/Process';
import { Testimonials } from './components/sections/Testimonials';
import { Pricing } from './components/sections/Pricing';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { Modal } from './components/ui/Modal';
import { Project, PricingTier } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Avoid running Lenis during initial loading state
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  // Track active section for Navbar pulsing dot
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'skills', 'projects', 'pricing', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[#050510] text-[#eaf2ff] selection:bg-[#00e5ff]/30 selection:text-[#00e5ff] overflow-x-hidden">
      {/* 1. Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Custom Cursor (Dot + Trailing Ring) */}
      <CustomCursor />

      {/* 3. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Ambient Noise & Gradient Mesh */}
      <div className="noise-overlay" aria-hidden="true" />
      <div className="mesh-bg" aria-hidden="true" />

      {/* 4. Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main id="main-content" className="relative z-10">
        {/* Section 1: Hero with 3D Scene */}
        <Hero />

        {/* Section 2: Trusted By Infinite Marquee */}
        <TrustedBy />

        {/* Section 3: About Story & Metrics */}
        <About />

        {/* Section 4: Services & Capabilities */}
        <Services />

        {/* Section 5: Skills & Tech Stack */}
        <Skills />

        {/* Section 6: Projects with 3D Tilt & Case Studies */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 7: Process Horizontal Timeline */}
        <Process />

        {/* Section 8: Testimonials Slider */}
        <Testimonials />

        {/* Section 9: Pricing Tiers */}
        <Pricing onSelectTier={(tier: PricingTier) => console.log('Selected tier:', tier.name)} />

        {/* Section 10: Frequently Asked Questions */}
        <FAQ />

        {/* Section 11: Contact Form & Channels */}
        <Contact />
      </main>

      {/* Section 12: Footer */}
      <Footer />

      {/* Case Study Modal */}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
