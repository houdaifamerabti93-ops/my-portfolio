import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Download, 
  Sparkles, 
  Award, 
  Terminal, 
  Users, 
  ShieldCheck, 
  Code2, 
  ArrowUpRight, 
  MapPin, 
  Zap, 
  Clock 
} from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { Button } from '../ui/Button';
import {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  statCardVariants,
  iconBounceVariants,
  buttonRevealVariants,
  imageRevealVariants,
  dividerRevealVariants,
} from '../../lib/scrollAnimations';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    const end = value;
    const duration = 1500; // ms (1.5s requested)
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * end);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(end);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed', icon: Award },
    { value: 30, suffix: '+', label: 'Happy Clients', icon: Users },
    { value: 5, suffix: '+', label: 'Years Experience', icon: Terminal },
    { value: 100, suffix: '%', label: 'Satisfaction', icon: ShieldCheck },
  ];

  const focusTags = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js'];

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    const cvContent = `=====================================================
HOUDAIFA — FULL-STACK DEVELOPER & CREATIVE CODER
=====================================================
Email: houdaifamerabti93@gmail.com
Phone/WhatsApp: +213773018738
Status: Available for Full-Stack, Contract & Bespoke 3D Web Projects
Portfolio: https://houdaifa.dev

PROFESSIONAL SUMMARY
--------------------
Accomplished Full-Stack Developer with 5+ years of experience engineering high-performance web applications, resilient backend architectures, and immersive 3D/WebGL experiences.

KEY STATISTICS
--------------
• 50+ Projects Successfully Completed
• 30+ Happy Clients Worldwide
• 5+ Years Industry Experience
• 100% Client Satisfaction & Delivery Rate

CORE TECHNOLOGIES
-----------------
• Frontend: React 19, Next.js 14/15, TypeScript, Tailwind CSS, Three.js, WebGL, Motion
• Backend: Node.js, Express, PostgreSQL, REST APIs, GraphQL, Redis, Cloud Run
• Architecture: Headless Architecture, Microservices, Edge CDN, Responsive Systems, Performance Optimization (95+ Core Web Vitals)

SELECTED RECENT HIGHLIGHTS
--------------------------
1. 3D Web Experience — Interactive 3D spatial web environment rendering WebGL shaders and particle physics.
2. E-commerce Platform — Headless commerce demo built with Next.js, Shopify API, and 3D product previews.
3. Financial Analytics Dashboard — High-frequency telemetry dashboard with dark-mode canvas charts and Web Workers.

CONTACT & INQUIRIES
-------------------
Direct Email: houdaifamerabti93@gmail.com
Calendly: 15-minute introductory technical discovery call available
=====================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Houdaifa_FullStack_Developer_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Glassmorphism card wrapping the whole section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: premiumEase }}
          className="relative rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-6 sm:p-10 md:p-12 lg:p-16 shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden"
        >
          {/* Subtle ambient lighting glows within the card */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff2d95]/5 rounded-full blur-3xl pointer-events-none" />

          {/* 2-column split (left: visual, right: content) - Mobile: stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* LEFT COLUMN: Visual & Professional Photo Card with 3D Image Reveal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={imageRevealVariants}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <TiltCard className="w-full max-w-md bg-white/[0.015] border border-white/10 p-5 sm:p-6 rounded-3xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Photo frame with neon cyan border glow, hover color + zoom */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 border-[#00e5ff]/40 shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:border-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)] transition-all duration-500 group bg-[#0a0a1a]">
                  {/* Photo of Houdaifa (male developer with grayscale effect, on hover becomes colored + subtle zoom) */}
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                    alt="Houdaifa — Full-Stack Developer"
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  {/* Dark subtle gradient overlay to ensure badge text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Top-right developer badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#050510]/85 backdrop-blur-md border border-[#00e5ff]/30 text-xs font-mono text-[#00e5ff] flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.5)] z-10">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Full-Stack</span>
                  </div>

                  {/* Floating badge "● Available for work" with pulsing green dot */}
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2.5 rounded-full bg-[#050510]/90 backdrop-blur-xl border border-white/20 text-xs font-mono text-white flex items-center gap-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.7)] z-10">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                    </span>
                    <span className="font-semibold text-white/95 tracking-wide whitespace-nowrap">
                      Available for work
                    </span>
                  </div>
                </div>

                {/* Sub-card Developer Spec Info */}
                <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[#8892b0]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00e5ff]" />
                      Location
                    </span>
                    <span className="text-white font-medium">Worldwide (Remote)</span>
                  </div>
                  <div className="flex items-center justify-between text-[#8892b0]">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#8b5cf6]" />
                      Specialty
                    </span>
                    <span className="text-[#00e5ff] font-medium">Full-Stack & 3D Web</span>
                  </div>
                  <div className="flex items-center justify-between text-[#8892b0]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#ff2d95]" />
                      Response Time
                    </span>
                    <span className="text-white font-medium">&lt; 24 Hours</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* RIGHT COLUMN: Content, Narrative, Tags, Counters, CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Section Label & Headings */}
              <div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  variants={sectionLabelVariants}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="w-8 h-[1px] bg-[#00e5ff]" />
                  <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase">
                    01 / ABOUT ME
                  </span>
                </motion.div>

                {/* Big Heading: "Hi, I'm Houdaifa" with cyan gradient on name */}
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  variants={sectionHeadingVariants}
                  className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-[#00e5ff] via-[#38bdf8] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                    Houdaifa
                  </span>
                </motion.h2>

                {/* Subheading: "Full-Stack Developer & Creative Coder" */}
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  variants={sectionParagraphVariants}
                  className="font-heading text-lg sm:text-xl font-semibold text-[#00e5ff] mt-2 flex items-center gap-2"
                >
                  <span>Full-Stack Developer & Creative Coder</span>
                </motion.p>
              </div>

              {/* 2 short paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#8892b0] leading-relaxed">
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  variants={sectionParagraphVariants}
                >
                  I'm a full-stack developer with over 5 years of hands-on experience building scalable, production-grade web applications. I bridge the gap between robust backend architectures and highly intuitive user interfaces, helping founders and engineering teams transform ambitious ideas into high-impact digital reality.
                </motion.p>

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  variants={{
                    ...sectionParagraphVariants,
                    visible: {
                      ...sectionParagraphVariants.visible,
                      transition: { delay: 0.25, duration: 0.6, ease: premiumEase },
                    },
                  }}
                >
                  I have a deep love for fast, modern, and immersive web experiences. Whether optimizing Node.js APIs for extreme throughput or choreographing 60 FPS Three.js graphics, I obsess over performance, clean type safety, and technical craftsmanship that leaves a lasting impression.
                </motion.p>
              </div>

              {/* Focus tags: React · Next.js · TypeScript · Node.js · Three.js */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5">
                  Core Technologies
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {focusTags.map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportConfig}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.05, ease: premiumEase }}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-[#00e5ff]/10 border border-white/10 hover:border-[#00e5ff]/50 text-xs font-mono text-white/90 hover:text-[#00e5ff] transition-all duration-200 shadow-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Animated Divider */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={dividerRevealVariants}
                className="h-[1px] w-full bg-white/[0.08]"
              />

              {/* Stats row with animated counters: 50+, 30+, 5+, 100% */}
              {/* Pattern: Counter 0 -> final over 1.5s, scale pulse: 0.8 -> 1.05 -> 1, rotation -5deg -> 0 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportConfig}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
                        visible: {
                          opacity: 1,
                          scale: [0.8, 1.05, 1],
                          rotate: 0,
                          transition: {
                            duration: 0.8,
                            delay: idx * 0.1,
                            ease: premiumEase,
                          },
                        },
                      }}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#00e5ff]/40 hover:bg-white/[0.04] transition-all duration-300 group"
                    >
                      <motion.div
                        variants={iconBounceVariants}
                        className="w-8 h-8 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-[#8892b0] mt-1 font-sans leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Two CTAs: "Download CV" (primary) + "Let's Talk" (secondary) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={buttonRevealVariants}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                {/* Primary CTA: Download CV */}
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleDownloadCV}
                  icon={<Download className="w-4 h-4" />}
                  iconPosition="left"
                  iconAnimation="bounce"
                >
                  Download CV
                </Button>

                {/* Secondary CTA: Let's Talk */}
                <Button
                  variant="secondary"
                  size="md"
                  onClick={scrollToContact}
                  icon={<ArrowUpRight className="w-4 h-4 text-[#00e5ff]" />}
                  iconPosition="right"
                  iconAnimation="arrow"
                >
                  Let's Talk
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
