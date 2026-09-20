import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  cardRevealVariants,
  statCardVariants,
  iconBounceVariants,
  buttonRevealVariants,
  imageRevealVariants,
  dividerRevealVariants,
  staggerContainerVariants,
} from '../../lib/scrollAnimations';

export {
  premiumEase,
  viewportConfig,
  sectionLabelVariants,
  sectionHeadingVariants,
  sectionParagraphVariants,
  cardRevealVariants,
  statCardVariants,
  iconBounceVariants,
  buttonRevealVariants,
  imageRevealVariants,
  dividerRevealVariants,
  staggerContainerVariants,
};

interface SectionHeaderProps {
  label: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  accentColor?: string;
  align?: 'left' | 'center' | 'split';
  className?: string;
}

/**
 * Standardized Section Heading with Premium Scroll Reveal
 * - Label: fade in from left (x: -30 → 0), opacity 0 → 1, duration 0.6s
 * - Heading: fade + slide up (y: 40 → 0), blur: 8px → 0, opacity 0 → 1, duration 0.8s
 * - Paragraph / Subtitle: fade + slide up (y: 20 → 0), delay: 0.15s, duration 0.6s
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  accentColor = '#00e5ff',
  align = 'split',
  className = '',
}) => {
  if (align === 'center') {
    return (
      <div className={`text-center max-w-2xl mx-auto mb-16 ${className}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionLabelVariants}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="w-6 h-[1px]" style={{ backgroundColor: accentColor }} />
          <span
            className="text-xs font-mono tracking-widest uppercase font-medium"
            style={{ color: accentColor }}
          >
            {label}
          </span>
          <span className="w-6 h-[1px]" style={{ backgroundColor: accentColor }} />
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionHeadingVariants}
          className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionParagraphVariants}
            className="text-sm sm:text-base text-[#8892b0] leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  if (align === 'left') {
    return (
      <div className={`max-w-2xl mb-12 sm:mb-16 ${className}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionLabelVariants}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
          <span
            className="text-xs font-mono tracking-widest uppercase font-medium"
            style={{ color: accentColor }}
          >
            {label}
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionHeadingVariants}
          className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4"
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={sectionParagraphVariants}
            className="text-sm sm:text-base text-[#8892b0] leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  // 'split': Title & Label on Left, Paragraph / Description on Right
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-6 ${className}`}>
      <div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionLabelVariants}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-8 h-[1px]" style={{ backgroundColor: accentColor }} />
          <span
            className="text-xs font-mono tracking-widest uppercase font-medium"
            style={{ color: accentColor }}
          >
            {label}
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionHeadingVariants}
          className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white"
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={sectionParagraphVariants}
          className="max-w-md text-sm sm:text-base text-[#8892b0] leading-relaxed md:text-right"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

/**
 * Animated Divider Line
 * Width 0 → 100% (scaleX from left), duration 0.8s
 */
export const ScrollDivider: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(255, 255, 255, 0.08)',
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    variants={dividerRevealVariants}
    className={`h-[1px] w-full my-8 ${className}`}
    style={{ backgroundColor: color }}
  />
);

/**
 * Animated Card Wrapper with 15% viewport trigger
 */
export const ScrollCard: React.FC<
  HTMLMotionProps<'div'> & {
    delay?: number;
    className?: string;
    children: React.ReactNode;
  }
> = ({ delay, className = '', children, ...props }) => {
  const customVariants = delay
    ? {
        hidden: cardRevealVariants.hidden,
        visible: {
          ...cardRevealVariants.visible,
          transition: {
            duration: 0.7,
            ease: premiumEase,
            delay,
          },
        },
      }
    : cardRevealVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animated Icon with Spring Bounce + Rotation
 * Scale 0 → 1, rotate -15deg → 0, spring bounce
 */
export const ScrollIcon: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0.1 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    variants={{
      hidden: { scale: 0, rotate: -15, opacity: 0 },
      visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay,
        },
      },
    }}
    className={`inline-flex items-center justify-center ${className}`}
  >
    {children}
  </motion.div>
);
