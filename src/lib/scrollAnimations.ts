import { Variants } from 'motion/react';

// Exact premium Awwwards easing curve: cubic-bezier(0.22, 1, 0.36, 1)
export const premiumEase = [0.22, 1, 0.36, 1] as const;

// Common viewport trigger setting: 15% visible, triggered once
export const viewportConfig = {
  once: true,
  amount: 0.15,
} as const;

/**
 * 1. Section Headings (Label + H2)
 */
export const sectionLabelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

export const sectionHeadingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

/**
 * 2. Paragraphs / Descriptions
 */
export const sectionParagraphVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

/**
 * Container Variants for Staggering Groups
 */
export const staggerContainerVariants = (staggerTime = 0.1, delayChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren,
    },
  },
});

/**
 * 3. Cards (Services, Projects, Pricing, Testimonials, Process, Skills)
 * fade in + slide up (y: 60 → 0) + scale (0.9 → 1), duration 0.7s
 */
export const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    },
  },
};

/**
 * 4. Stats (Numbers / Cards)
 * Scale pulse: 0.8 → 1.05 → 1, Fade in with slight rotation (-5deg → 0)
 */
export const statCardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

/**
 * 5. Icons
 * Scale from 0 to 1 with spring bounce (stiffness 200, damping 15), rotate (-15deg → 0)
 * Delay: 0.1s after parent card
 */
export const iconBounceVariants: Variants = {
  hidden: {
    scale: 0,
    rotate: -15,
    opacity: 0,
  },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

/**
 * 6. Buttons
 * Fade in + slide up (y: 20 → 0), slight overshoot (scale 0.95 → 1.02 → 1)
 */
export const buttonRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: premiumEase,
      delay: 0.2,
    },
  },
};

/**
 * 7. Images / 3D previews
 * Fade in + zoom (scale 1.1 → 1), slight rotation on Y-axis (rotateY: 8deg → 0)
 * Clip-path reveal (inset from 10% → 0%)
 */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
    rotateY: 8,
    clipPath: 'inset(8% 8% 8% 8% round 1.5rem)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
    transition: {
      duration: 0.9,
      ease: premiumEase,
    },
  },
};

/**
 * 8. Dividers / Lines
 * Width 0 → 100% (scaleX from left), duration: 0.8s
 */
export const dividerRevealVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
    transformOrigin: 'left center',
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transformOrigin: 'left center',
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

/**
 * 9. Directional Slide-ins (Left / Right columns)
 */
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

