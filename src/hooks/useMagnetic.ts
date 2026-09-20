import { useEffect, useRef } from 'react';

/**
 * useMagnetic Hook
 * Creates an Awwwards-level interactive magnetic attraction effect.
 * When the user's cursor approaches within proximityRadius or moves over the element,
 * the element is pulled smoothly toward the cursor with spring physics.
 * 
 * Features:
 * - GPU accelerated translate3d
 * - Automatically disabled on touch/coarse devices
 * - Spring physics release on mouse leave
 * - Configurable magnetic strength and activation radius
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength: number = 0.35,
  proximityRadius: number = 50
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Do not apply magnetic physics on touch / mobile devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let isHovering = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      // Check if mouse is within proximity boundary
      const maxDistance = Math.max(rect.width, rect.height) / 2 + proximityRadius;

      if (distance < maxDistance) {
        isHovering = true;
        const pull = 1 - Math.min(distance / maxDistance, 1);
        const deltaX = distX * strength * (0.6 + pull * 0.4);
        const deltaY = distY * strength * (0.6 + pull * 0.4);

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          element.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
          element.style.transition = 'transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)';
        });
      } else if (isHovering) {
        // Reset when moving outside the proximity zone
        isHovering = false;
        cancelAnimationFrame(animationFrameId);
        element.style.transform = 'translate3d(0, 0, 0)';
        element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      cancelAnimationFrame(animationFrameId);
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (element) {
        element.style.transform = '';
        element.style.transition = '';
      }
    };
  }, [strength, proximityRadius]);

  return ref;
}
