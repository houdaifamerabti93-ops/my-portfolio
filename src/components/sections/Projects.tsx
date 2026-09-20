import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Github, 
  TrendingUp, 
  FolderGit2, 
  Tag, 
  Calendar 
} from 'lucide-react';
import { projectsData } from '../../lib/data/projects';
import { Project } from '../../types';
import { Button } from '../ui/Button';
import { triggerHaptic } from '../../lib/haptics';
import {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  cardRevealVariants,
} from '../../lib/scrollAnimations';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

/**
 * Individual 3D Interactive Project Card
 * Features:
 * - Real mockup image with hover zoom
 * - Type & Year badges
 * - Title, tech pills, and 1-2 line description
 * - Cyan metric callout
 * - Hover reveal for "Live →" and "GitHub" buttons
 * - 3D perspective tilt on mouse move
 * - Gradient border glow on hover
 */
const ProjectCard: React.FC<{
  project: Project;
  onSelect: () => void;
  index: number;
}> = ({ project, onSelect, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: cardRevealVariants.hidden,
        visible: {
          ...cardRevealVariants.visible,
          transition: {
            duration: 0.7,
            delay: (index % 2) * 0.12,
            ease: premiumEase,
          },
        },
      }}
      className="h-full flex flex-col"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        style={{
          transform: transformStyle,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)',
        }}
        data-interactive="true"
        className="project-grid-card relative p-[1.5px] rounded-3xl bg-white/[0.07] hover:bg-gradient-to-br hover:from-[#00e5ff] hover:via-[#8b5cf6] hover:to-[#ff2d95] transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_rgba(0,229,255,0.22)] cursor-pointer group flex flex-col h-full"
      >
      {/* Card Inner Canvas */}
      <div className="relative rounded-[22px] bg-[#070716]/95 backdrop-blur-xl h-full flex flex-col justify-between overflow-hidden">
        
        {/* Project Image & Interactive Hover Actions */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a1a]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
          />
          
          {/* Subtle gradient overlay to enhance badges and contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070716] via-transparent to-black/30 pointer-events-none" />

          {/* Top-Left: Project Type Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#050510]/85 backdrop-blur-md text-[#00e5ff] border border-[#00e5ff]/35 shadow-md">
              <Tag className="w-3 h-3" />
              {project.category}
            </span>
          </div>

          {/* Top-Right: Year Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[#050510]/85 backdrop-blur-md text-white/90 border border-white/20 shadow-md">
              <Calendar className="w-3 h-3 text-[#00e5ff]" />
              {project.year}
            </span>
          </div>

          {/* Hidden on default, appears on hover: Two buttons "Live →" + "GitHub" */}
          <div className="absolute inset-0 bg-[#050510]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20 pointer-events-none group-hover:pointer-events-auto">
            <Button
              variant="primary"
              size="sm"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Live
            </Button>

            <Button
              variant="secondary"
              size="sm"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              icon={<Github className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Card Body & Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
          <div>
            {/* Title (Large, Bold) */}
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00e5ff] transition-colors flex items-center justify-between gap-3 mb-2.5">
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#00e5ff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
            </h3>

            {/* Tech Stack Tags (Small pills below title) */}
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-[#8892b0] border border-white/[0.06] group-hover:border-[#00e5ff]/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short Description (1-2 lines) */}
            <p className="text-sm text-[#8892b0] line-clamp-2 leading-relaxed mb-6 font-sans">
              {project.description}
            </p>
          </div>

          {/* Metric Row in Cyan & Case Study Link */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00e5ff]" />
              <span className="text-xs font-mono text-white/60">Impact:</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-[#00e5ff] tracking-tight">
                {project.metric}
              </span>
            </div>

            <span className="text-xs font-mono text-white/40 group-hover:text-white flex items-center gap-1 transition-colors">
              Case Study <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<'All' | '3D' | 'Web' | 'App' | 'E-commerce'>('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const tabs: Array<'All' | '3D' | 'Web' | 'App' | 'E-commerce'> = [
    'All',
    '3D',
    'Web',
    'App',
    'E-commerce',
  ];

  const filteredProjects = activeTab === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeTab);

  // GSAP filtering animation: cards fade + scale + reorder
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-grid-card');
    if (cards.length === 0) return;

    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.94, y: 16 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'opacity,visibility',
      }
    );
  }, [activeTab]);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* SECTION HEADER with Scroll Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
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
                04 / SELECTED WORKS
              </span>
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={sectionHeadingVariants}
              className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white"
            >
              Featured projects & case studies.
            </motion.h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionParagraphVariants}
            className="text-sm sm:text-base text-[#8892b0] max-w-md leading-relaxed md:text-right font-sans"
          >
            A selection of recent work — from landing pages to full-stack apps.
          </motion.p>
        </div>

        {/* Filter Tabs with animated active state (cyan pill background) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.15, ease: premiumEase }}
          className="flex items-center justify-start sm:justify-end mb-10"
        >
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <motion.button
                  key={tab}
                  onClick={() => {
                    triggerHaptic(10);
                    setActiveTab(tab);
                  }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ touchAction: 'manipulation' }}
                  data-interactive="true"
                  className={`relative min-h-[38px] px-5 py-2 rounded-full text-xs font-mono font-medium transition-colors duration-200 cursor-pointer select-none ${
                    isActive ? 'text-[#050510] font-bold' : 'text-[#8892b0] hover:text-white'
                  }`}
                >
                  {/* Animated cyan pill background for active state */}
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectFilterPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#00e5ff] shadow-[0_0_18px_rgba(0,229,255,0.5)] z-0"
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 
          LAYOUT:
          - Grid: 2 columns on desktop (lg:grid-cols-2), 1 on mobile
          - Generous spacing (gap-8 md:gap-10)
          - Glassmorphism cards with 3D tilt
        */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={() => onSelectProject(project)}
            />
          ))}

          {/* 
            "VIEW ALL" CARD:
            - Last card = "View all projects →" linking to /projects
            - Different style (dashed border, no image)
          */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={cardRevealVariants}
            className="project-grid-card h-full min-h-[380px]"
          >
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                // Smooth scroll to contact for project inquiry or portfolio archives
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              data-interactive="true"
              className="h-full w-full rounded-3xl border-2 border-dashed border-white/20 hover:border-[#00e5ff]/80 bg-white/[0.015] hover:bg-white/[0.04] backdrop-blur-xl p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all duration-300 group/all shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,229,255,0.18)] cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 group-hover/all:border-[#00e5ff]/40 group-hover/all:bg-[#00e5ff]/10 flex items-center justify-center text-white/60 group-hover/all:text-[#00e5ff] transition-all duration-300 mb-6 group-hover/all:scale-110">
                <FolderGit2 className="w-8 h-8" />
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover/all:text-[#00e5ff] transition-colors mb-3 flex items-center gap-2">
                <span>View all projects</span>
                <ArrowRight className="w-6 h-6 group-hover/all:translate-x-1.5 transition-transform" />
              </h3>

              <p className="text-sm text-[#8892b0] max-w-sm leading-relaxed mb-6 font-sans">
                Explore 50+ archived repositories, open-source experiments, WebGL playgrounds, and private enterprise client systems.
              </p>

              <span className="px-6 py-3 rounded-full text-xs font-mono font-semibold bg-white/[0.05] group-hover/all:bg-[#00e5ff] group-hover/all:text-[#050510] border border-white/10 group-hover/all:border-[#00e5ff] transition-all duration-300 shadow-sm flex items-center gap-2">
                <span>Explore Archive (50+)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
