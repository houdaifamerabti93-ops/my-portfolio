import React, { useState, useCallback, useRef, useEffect } from 'react';

export interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export interface UseRippleOptions {
  duration?: number;
  defaultColor?: string;
  enableHaptic?: boolean;
}

/**
 * Reusable hook to create smooth, GPU-accelerated tap/click ripples.
 * Optimized for mobile touch devices and high refresh-rate screens.
 */
export const useRipple = (options: UseRippleOptions = {}) => {
  const {
    duration = 500,
    defaultColor = 'rgba(255, 255, 255, 0.35)',
    enableHaptic = true,
  } = options;

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const timeoutsRef = useRef<number[]>([]);

  // Cleanup pending timeouts on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  const createRipple = useCallback(
    (e: React.PointerEvent<HTMLElement>, customColor?: string) => {
      // Avoid ripples on non-primary pointer down (e.g. right clicks)
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      // Trigger subtle haptic feedback on mobile touch (10ms)
      if (enableHaptic && typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
        try {
          navigator.vibrate(10);
        } catch {
          // Safe failover for browsers blocking vibration without explicit user permission
        }
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate size: radius based on the furthest corner from tap point
      const maxDistX = Math.max(x, rect.width - x);
      const maxDistY = Math.max(y, rect.height - y);
      const radius = Math.hypot(maxDistX, maxDistY);
      const size = Math.max(radius * 2, Math.max(rect.width, rect.height) * 1.5);

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        size,
        color: customColor || defaultColor,
      };

      setRipples((prev) => [...prev, newRipple]);

      const timeoutId = window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        timeoutsRef.current = timeoutsRef.current.filter((id) => id !== timeoutId);
      }, duration);

      timeoutsRef.current.push(timeoutId);
    },
    [duration, defaultColor, enableHaptic]
  );

  const clearRipples = useCallback(() => {
    setRipples([]);
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  return {
    ripples,
    createRipple,
    clearRipples,
  };
};
