import { useEffect, useRef } from 'react';

export function useMagnetic<T extends HTMLElement = HTMLElement>(strength: number = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip magnetic effect on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      element.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove as EventListener);
    element.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove as EventListener);
      element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [strength]);

  return ref;
}
