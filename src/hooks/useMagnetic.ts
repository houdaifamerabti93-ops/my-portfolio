import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';

export interface UseMagneticOptions {
  enabled?: boolean;
  strength?: number;
  radius?: number;
}

export interface UseMagneticReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  reset: () => void;
}

/**
 * useMagnetic Hook
 * Awwwards-grade interactive magnetic attraction effect powered by Framer Motion.
 * 
 * Features:
 * - When cursor enters within 60px radius of the button, the button starts following the cursor
 * - Strength: 0.3 (subtle, perfectly weighted)
 * - Returns to original position with spring physics (stiffness: 150, damping: 15)
 * - Uses useMotionValue and useSpring for 100% GPU-accelerated transforms
 * - Automatically disabled on mobile/touch devices via window.matchMedia('(hover: hover)')
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  enabledOrOptions: boolean | UseMagneticOptions = true,
  strengthArg: number = 0.3,
  radiusArg: number = 60
): UseMagneticReturn<T> {
  const options: UseMagneticOptions = typeof enabledOrOptions === 'boolean'
    ? { enabled: enabledOrOptions, strength: strengthArg, radius: radiusArg }
    : { enabled: true, strength: 0.3, radius: 60, ...enabledOrOptions };

  const { enabled = true, strength = 0.3, radius = 60 } = options;

  const ref = useRef<T | null>(null);

  // Raw cursor delta motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth return physics with requested spring constants (stiffness: 150, damping: 15)
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check device support: disable on touch/mobile devices
    const hasHoverCapability = window.matchMedia('(hover: hover)').matches;
    if (!hasHoverCapability) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      // Trigger boundary: within 60px radius beyond button boundary
      const maxDistance = Math.max(rect.width, rect.height) / 2 + radius;

      if (distance < maxDistance) {
        // Magnetic attraction: pull smoothly toward cursor with requested strength
        rawX.set(distX * strength);
        rawY.set(distY * strength);
      } else {
        // Outside proximity zone - spring smoothly back to 0
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handleMouseLeave = () => {
      reset();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      reset();
    };
  }, [enabled, strength, radius, rawX, rawY]);

  return { ref, x, y, reset };
}
