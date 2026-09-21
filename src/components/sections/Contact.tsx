import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Copy, 
  Check, 
  Calendar, 
  MessageCircle, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { ContactFormData } from '../../types';
import { Button } from '../ui/Button';
import { triggerHaptic } from '../../lib/haptics';
import {
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from '../../lib/scrollAnimations';

/**
 * Web3Forms Public Access Key
 * Safe for client-side usage; routes submissions to houdaifamerabti93@gmail.com
 */
const WEB3FORMS_ACCESS_KEY = '0ea939be-62ac-417e-a2d4-baaf2eea3569';
const WHATSAPP_URL = 'https://wa.me/213773018738?text=Hi%20Houdaifa%2C%20I%27d%20like%20to%20discuss%20a%20project';
const DIRECT_EMAIL = 'houdaifamerabti93@gmail.com';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    projectType: 'Web Development (React / Next.js)',
    budget: '$5k–$10k',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Field validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    // Name: required, min 2 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email: required, valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format';
    }

    // Message: required, min 10 characters
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission via Web3Forms API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      triggerHaptic(20);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const formattedSubject = formData.subject?.trim()
      ? formData.subject.trim()
      : `New project inquiry from ${formData.name.trim()}`;

    const formattedMessage = [
      `Sender Name: ${formData.name.trim()}`,
      `Sender Email: ${formData.email.trim()}`,
      `Project Nature: ${formData.projectType}`,
      `Anticipated Budget: ${formData.budget}`,
      formData.subject?.trim() ? `Subject: ${formData.subject.trim()}` : null,
      '',
      '--- Message Content ---',
      formData.message.trim(),
    ]
      .filter((line) => line !== null)
      .join('\n');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formattedSubject,
          message: formattedMessage,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          projectType: 'Web Development (React / Next.js)',
          budget: '$5k–$10k',
          message: '',
        });
        setErrors({});

        // Tactile and visual confirmation
        triggerHaptic([10, 30, 10]);
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00e5ff', '#8b5cf6', '#25D366', '#ffffff'],
          });
        } catch {
          // Graceful fallback if canvas blocked
        }
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try WhatsApp instead.');
        triggerHaptic([30, 50, 30]);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try WhatsApp instead.');
      triggerHaptic([30, 50, 30]);
    }
  };

  const copyToClipboard = () => {
    triggerHaptic(10);
    navigator.clipboard.writeText(DIRECT_EMAIL);
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
                  href={`mailto:${DIRECT_EMAIL}`}
                  className="flex items-center gap-2 overflow-hidden group/mail cursor-pointer"
                  title="Send email to Houdaifa"
                >
                  <Mail className="w-4 h-4 text-[#00e5ff] shrink-0 group-hover/mail:scale-110 transition-transform" />
                  <span className="text-sm font-mono text-white group-hover/mail:text-[#00e5ff] truncate transition-colors">
                    {DIRECT_EMAIL}
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ touchAction: 'manipulation' }}
                data-interactive="true"
                className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-[#25D366]/50 transition-all group block cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
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
              {status === 'success' ? (
                /* SUCCESS STATE */
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-12 space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.35)]"
                  >
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </motion.div>
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                      Message sent! I'll get back to you soon.
                    </h3>
                    <p className="text-sm sm:text-base text-[#8892b0] max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your proposal has been dispatched directly to my inbox. Expect a response within 12–24 business hours.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => setStatus('idle')}
                    >
                      Send Another Message
                    </Button>
                    <motion.a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2.5 rounded-full text-xs font-mono font-semibold text-white bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366] hover:text-[#050510] transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </motion.a>
                  </div>
                </motion.div>
              ) : (
                /* FORM (idle, loading, error states) */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                        Your Name <span className="text-[#00e5ff]">*</span>
                      </label>
                      <motion.input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) {
                            setErrors({ ...errors, name: undefined });
                          }
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-sm focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -4, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -4, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-rose-400 mt-1.5 font-mono flex items-center gap-1.5"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.name}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2">
                        Email Address <span className="text-[#00e5ff]">*</span>
                      </label>
                      <motion.input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) {
                            setErrors({ ...errors, email: undefined });
                          }
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-sm focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                            : 'border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -4, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -4, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-rose-400 mt-1.5 font-mono flex items-center gap-1.5"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.email}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subject (Optional) */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#8892b0] mb-2 flex items-center justify-between">
                      <span>Subject <span className="text-white/40 lowercase text-[10px]">(optional)</span></span>
                    </label>
                    <motion.input
                      type="text"
                      placeholder="e.g. Next.js Web App Redesign"
                      value={formData.subject || ''}
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                    />
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
                    <motion.textarea
                      rows={4}
                      placeholder="Tell me about your product, desired launch timeline, and key requirements..."
                      value={formData.message}
                      whileFocus={{ scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) {
                          setErrors({ ...errors, message: undefined });
                        }
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-sm focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500/80 focus:ring-1 focus:ring-rose-500'
                          : 'border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-rose-400 mt-1.5 font-mono flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.message}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ERROR STATE: Red message with shake animation + WhatsApp fallback */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: [-8, 8, -6, 6, -3, 3, 0],
                        }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.45 }}
                        className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
                      >
                        <div className="flex items-center gap-2.5">
                          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          <span className="font-medium text-xs sm:text-sm">
                            {errorMessage || 'Something went wrong. Please try WhatsApp instead.'}
                          </span>
                        </div>
                        <motion.a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-[#050510] text-xs font-bold font-mono transition-colors shadow-md shrink-0 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>Chat on WhatsApp</span>
                        </motion.a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={status === 'loading'}
                    loadingText="Sending..."
                    disabled={status === 'loading'}
                    icon={<Send className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Submit Project Proposal
                  </Button>

                  {/* WhatsApp Secondary Direct Option */}
                  <div className="pt-2">
                    <div className="relative flex items-center justify-center mb-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/[0.08]" />
                      </div>
                      <div className="relative px-3 bg-[#070716] text-[11px] font-mono uppercase tracking-wider text-[#8892b0]">
                        Or direct chat
                      </div>
                    </div>

                    <motion.a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(37, 211, 102, 0.22)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{ touchAction: 'manipulation' }}
                      data-interactive="true"
                      className="w-full min-h-[48px] px-6 py-3.5 rounded-xl bg-[#25D366]/12 border border-[#25D366]/35 text-[#25D366] hover:text-white hover:border-[#25D366] text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.1)] hover:shadow-[0_0_30px_rgba(37,211,102,0.25)] cursor-pointer group"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                      <span>Chat on WhatsApp</span>
                    </motion.a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
