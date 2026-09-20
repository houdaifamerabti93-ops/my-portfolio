import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { faqData } from '../../lib/data/faq';
import {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  cardRevealVariants,
} from '../../lib/scrollAnimations';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionLabelVariants}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-6 h-[1px] bg-[#00e5ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00e5ff] uppercase">
              08 / Common Inquiries
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
            Frequently asked questions.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionParagraphVariants}
            className="text-sm sm:text-base text-[#8892b0]"
          >
            Everything you need to know about working together, communication cadences, and development standards.
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.08,
                      ease: premiumEase,
                    },
                  },
                }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.04] border-[#00e5ff]/40 shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(0,229,255,0.08)]'
                    : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  data-interactive="true"
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-heading text-base sm:text-lg font-semibold text-white">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#00e5ff] text-[#050510] rotate-180'
                        : 'bg-white/5 text-[#8892b0]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: premiumEase }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#8892b0] leading-relaxed border-t border-white/[0.04]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={cardRevealVariants}
          className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white text-sm">
                Have a unique technical challenge?
              </h4>
              <p className="text-xs text-[#8892b0]">
                I respond to all custom inquiries within 24 hours.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            data-interactive="true"
            className="px-5 py-2.5 rounded-full font-heading font-semibold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#00e5ff]/50 transition-all whitespace-nowrap cursor-pointer"
          >
            Ask a Question Directly
          </a>
        </motion.div>
      </div>
    </section>
  );
};
