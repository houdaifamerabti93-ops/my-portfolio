import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../lib/data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#00e5ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase">
              06 / Client Endorsements
            </span>
            <span className="w-6 h-[1px] bg-[#00e5ff]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Words from founders & tech leaders.
          </h2>
          <p className="text-sm sm:text-base text-[#8892b0]">
            Direct feedback from entrepreneurs and executives who trusted my engineering to scale their vision.
          </p>
        </div>

        {/* Testimonial Card Stage */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 md:p-16 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle Ambient Quote Mark */}
          <div className="absolute top-8 right-8 text-white/[0.03] pointer-events-none">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col justify-between">
            {/* Star Rating & Project Type */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#00e5ff] text-[#00e5ff] shadow-[0_0_8px_#00e5ff]"
                  />
                ))}
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
                {current.projectType}
              </span>
            </div>

            {/* Quote Body */}
            <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl text-white font-medium leading-snug mb-10">
              "{current.content}"
            </blockquote>

            {/* Author Profile */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#00e5ff]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                />
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8892b0]">
                    {current.role} • <span className="text-white/90">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  data-interactive="true"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#00e5ff] border border-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  data-interactive="true"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#00e5ff] border border-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] shadow-[0_0_8px_#00e5ff]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
