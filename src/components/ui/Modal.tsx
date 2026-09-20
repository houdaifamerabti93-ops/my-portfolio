import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Cpu, Calendar, Tag } from 'lucide-react';
import { Project } from '../../types';
import { Button } from './Button';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop with blur & smooth opacity transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050510]/85 backdrop-blur-xl"
        />

        {/* Modal Container: Scale from 0.9 with smooth spring / bezier */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#080816]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(0,229,255,0.15)] p-6 sm:p-8 md:p-10 my-auto text-[#eaf2ff]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full-size Project Image with Banner Overlay */}
          <div className="relative rounded-2xl overflow-hidden mb-8 border border-white/10 min-h-64 sm:h-80 md:h-96 group bg-[#0a0a1a]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080816] via-[#080816]/50 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                {/* Type + Year Badges */}
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 shadow-sm">
                    <Tag className="w-3 h-3" />
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-white border border-white/15">
                    <Calendar className="w-3 h-3 text-[#00e5ff]" />
                    {project.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
                    {project.metric}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  {project.title}
                </h2>
                <p className="text-white/80 text-sm sm:text-base mt-1 max-w-xl">
                  {project.tagline}
                </p>
              </div>

              {/* Action Links (Live + GitHub) */}
              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Live Preview
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<Github className="w-4 h-4" />}
                  iconPosition="left"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#00e5ff] mb-2">
              Project Overview
            </h3>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Spotlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {project.caseStudy.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3"
              >
                <div className="p-2.5 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading text-xl font-bold text-white tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs text-[#8892b0]">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Case Study Content Breakdown: Challenge / Solution / Result */}
          <div className="space-y-4 mb-8">
            {/* Challenge */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
              <h3 className="font-heading text-base sm:text-lg font-semibold text-[#00e5ff] mb-2.5 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Challenge
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
              <h3 className="font-heading text-base sm:text-lg font-semibold text-[#8b5cf6] mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Solution
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Result */}
            <div className="rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06]">
              <h3 className="font-heading text-base sm:text-lg font-semibold text-[#ff2d95] mb-2.5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Result
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {project.caseStudy.result}
              </p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8892b0] mr-2">
              Tech Stack:
            </span>
            {project.caseStudy.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
