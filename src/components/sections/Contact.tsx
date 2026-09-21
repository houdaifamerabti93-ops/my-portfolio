import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Copy, 
  Check, 
  Calendar, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { ContactFormData } from '../../types';
import { Button } from '../ui/Button';
import { triggerHaptic } from '../../lib/haptics';
import {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  cardRevealVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from '../../lib/scrollAnimations';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Web Development (React / Next.js)',
    budget: '$5k–$10k',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = 'houdaifamerabti93@gmail.com';

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name or company';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a valid work email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please share a few details about your project';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger success pattern [10, 30, 10]
      triggerHaptic([10, 30, 10]);

      // Confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#8b5cf6', '#ff2d95', '#ffffff'],
        });
      } catch {
        // graceful fallback if canvas blocked
      }
    }, 1000);
  };

  const copyToClipboard = () => {
    triggerHaptic(10);
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-[#050510]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00e5ff]/10 via-[#8b5cf6]/5 to-[#ff2d95]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionLabelVariants}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-[1px] bg-[#00e5ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase">
              09 / Initiate Collaboration
            </span>
            <span className="w-6 h-[1px] bg-[#00e5ff]" />
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionHeadingVariants}
            className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Let's build something unforgettable.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionParagraphVariants}
            className="text-sm sm:text-base text-[#8892b0]"
          >
            Whether you have a fully scoped design ready for development or an early-stage concept seeking 3D creative direction, my inbox is open.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels, Calendly & WhatsApp */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideInLeftVariants}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick response badge */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-white text-base">
                    Fast Turnaround & Response
                  </h4>
                  <p className="text-xs text-[#8892b0]">
                    Guaranteed response within 12–24 business hours.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#8892b0]">
                <span>Timezone</span>
                <span className="text-white">Worldwide / Remote Friendly</span>
              </div>
            </div>

            {/* Direct Email with Copy Button */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                Direct Email Inquiries
              </div>
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <a
                  href={`mailto:${directEmail}`}
                  className="flex items-center gap-2 overflow-hidden group/mail cursor-pointer"
                  title="Send email to Houdaifa"
                >
                  <Mail className="w-4 h-4 text-[#00e5ff] shrink-0 group-hover/mail:scale-110 transition-transform" />
                  <span className="text-sm font-mono text-white group-hover/mail:text-[#00e5ff] truncate transition-colors">
                    {directEmail}
                  </span>
                </a>
                <motion.button
                  onClick={copyToClipboard}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ touchAction: 'manipulation' }}
                  data-interactive="true"
                  aria-label="Copy email address"
                  className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#00e5ff] hover:text-[#050510] text-xs font-mono text-white transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer select-none"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </motion.button>
              </div>
            </div>

            {/* Direct Action Hub: Calendly + WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ touchAction: 'manipulation' }}
                data-interactive="true"
                className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-[#8b5cf6]/50 transition-all group block cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="font-heading font-semibold text-white text-sm flex items-center justify-between">
                  <span>Book Intro Call</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-xs text-[#8892b0] mt-1">
                  15-min discovery & technical fit call
                </p>
              </motion.a>

              <motion.a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ touchAction: 'manipulation' }}
                data-interactive="true"
                className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-emerald-500/50 transition-all group block cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="font-heading font-semibold text-white text-sm flex items-center justify-between">
                  <span>WhatsApp Chat</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-xs text-[#8892b0] mt-1">
                  Instant text for urgent project quotes
                </p>
              </motion.a>
            </div>

            {/* Guarantee badge */}
            <div className="flex items-center gap-3 text-xs text-[#8892b0] px-2">
              <ShieldCheck className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>Strict NDA protection & complete code ownership upon delivery.</span>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Interactive Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideInRightVariants}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                      Transmission Received!
                    </h3>
                    <p className="text-sm sm:text-base text-[#8892b0] max-w-md mx-auto">
                      Thank you, <span className="text-white font-semibold">{formData.name}</span>. I have received your message regarding {formData.projectType} and will be in touch shortly.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'Web Development (React/Next.js)',
                        budget: '$5k–$10k',
                        message: '',
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                        Your Name / Organization <span className="text-[#00e5ff]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Satoshi Nakamoto"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-sm focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 mt-1 font-mono">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                        Work Email Address <span className="text-[#00e5ff]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-sm focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                        Project Nature
                      </label>
                      <select
                        id="project-type-select"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] transition-all"
                      >
                        <option value="Web Development (React / Next.js)">Web Development (React / Next.js)</option>
                        <option value="E-commerce & Storefronts">E-commerce & Storefronts</option>
                        <option value="Landing Pages & Creative UI">Landing Pages & Creative UI</option>
                        <option value="Custom Bespoke Engineering">Custom Bespoke Engineering</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                        Anticipated Budget
                      </label>
                      <select
                        id="budget-select"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5ff] transition-all"
                      >
                        <option value="$2k–$5k">$2,000 – $5,000</option>
                        <option value="$5k–$10k">$5,000 – $10,000</option>
                        <option value="$10k–$25k">$10,000 – $25,000</option>
                        <option value="$25k+">$25,000+ (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                      Project Goals & Scope <span className="text-[#00e5ff]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your product, desired launch date, target audience, and any existing design or technical specifications..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-sm focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                          : 'border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Submit Project Proposal
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
