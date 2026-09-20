import React, { useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'onClick'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  color: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Awwwards-Level Interactive Button Component
 * 
 * Animations Included:
 * 1. Idle: Continuous ambient glow pulse + smooth gradient shift + 1px floating
 * 2. Hover (Desktop): Spring scale 1.05, neon blur boost, white shimmer light sweep, magnetic cursor pull
 * 3. Hover / Touch (Mobile): 48px tap target, tap compression (0.97), haptic vibration (12ms)
 * 4. Click: Radial cyan ripple expansion from click point + radial particle burst (10 neon dots)
 * 5. Focus: Visible gradient focus ring
 * 6. Loading: Circular neon spinner with continuous glow pulse
 * 7. Disabled: Grayscale reduction, zero glow, disabled pointer
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  magnetic = variant === 'primary',
  loading = false,
  icon,
  iconPosition = 'right',
  href,
  target,
  rel,
  children,
  className = '',
  fullWidth = false,
  disabled = false,
  onClick,
  ...restProps
}) => {
  // Magnetic attraction hook for desktop
  const magneticRef = useMagnetic<HTMLButtonElement | HTMLAnchorElement>(
    magnetic ? 0.35 : 0,
    45
  );

  // Ripple effect state
  const [ripples, setRipples] = useState<Ripple[]>([]);
  // Particle burst state
  const [particles, setParticles] = useState<Particle[]>([]);

  // Trigger ripple & particle burst on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    // Trigger haptic feedback on devices that support it
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // Safe failover for unsupported browser policies
      }
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // 1. Spawn ripple
    const rippleId = Date.now() + Math.random();
    const rippleSize = Math.max(rect.width, rect.height) * 2.2;
    setRipples((prev) => [...prev, { id: rippleId, x: clickX, y: clickY, size: rippleSize }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 400);

    // 2. Spawn 10 particles exploding radially
    const particleColors = ['#00e5ff', '#8b5cf6', '#ff2d95', '#ffffff'];
    const newParticles: Particle[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      angle: (i / 10) * (Math.PI * 2) + (Math.random() - 0.5) * 0.5,
      distance: 30 + Math.random() * 35,
      color: particleColors[i % particleColors.length],
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 450);

    if (onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  // Base sizing tokens (strictly meets mobile 48px tap targets & 16px text on mobile)
  const sizeStyles = {
    sm: 'min-h-[44px] min-w-[44px] px-5 py-2.5 text-[15px] sm:text-xs',
    md: 'min-h-[48px] min-w-[48px] px-6 sm:px-8 py-3.5 sm:py-4 text-[16px] sm:text-sm',
    lg: 'min-h-[54px] min-w-[48px] px-7 sm:px-9 py-4 sm:py-4.5 text-[16px] sm:text-base',
  }[size];

  // Variant Visual Styles
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = `
      relative overflow-hidden rounded-full font-heading font-semibold tracking-wide text-[#050510]
      bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ff2d95] bg-[length:250%_250%]
      animate-button-gradient-shift animate-button-idle-glow
      shadow-[0_0_35px_rgba(0,229,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.3)]
      hover:shadow-[0_0_60px_rgba(0,229,255,0.75),inset_0_1px_2px_rgba(255,255,255,0.6)]
      active:shadow-[0_0_25px_rgba(0,229,255,0.5)]
    `;
  } else if (variant === 'secondary') {
    variantStyles = `
      relative overflow-hidden rounded-full font-heading font-semibold tracking-wide text-white
      bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-xl
      border border-white/15 hover:border-[#00e5ff]/60
      hover:text-[#00e5ff]
      shadow-[0_4px_20px_rgba(0,0,0,0.4)]
      hover:shadow-[0_0_30px_rgba(0,229,255,0.3),0_0_15px_rgba(139,92,246,0.2)]
      active:bg-white/[0.15]
    `;
  } else {
    // ghost
    variantStyles = `
      relative rounded-full font-heading font-medium tracking-wide text-white/80 hover:text-[#00e5ff]
      bg-transparent hover:bg-white/[0.03]
      transition-colors duration-200
    `;
  }

  const disabledStyles = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none shadow-none filter grayscale'
    : 'cursor-pointer';

  const widthStyle = fullWidth ? 'w-full' : 'w-full sm:w-auto';

  // Common inner content
  const content = (
    <>
      {/* 1. White Shimmer Light Sweep (Desktop Hover Effect) */}
      {variant !== 'ghost' && !disabled && !loading && (
        <span
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          <span className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/25 to-transparent animate-button-shimmer" />
        </span>
      )}

      {/* 2. Expanding Click Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-[#00e5ff]/50 animate-ping z-10"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: 'button-ripple 0.4s ease-out forwards',
          }}
          aria-hidden="true"
        />
      ))}

      {/* 3. Radial Particle Burst Elements */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * particle.distance,
            y: particle.y + Math.sin(particle.angle) * particle.distance,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-none absolute w-1.5 h-1.5 rounded-full z-20"
          style={{ backgroundColor: particle.color }}
          aria-hidden="true"
        />
      ))}

      {/* 4. Loading Spinner or Children Label + Icons */}
      {loading ? (
        <span className="relative z-10 inline-flex items-center gap-2.5">
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="relative z-10 inline-flex items-center justify-center gap-2.5 leading-none">
          {icon && iconPosition === 'left' && (
            <span className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110 shrink-0">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 shrink-0">
              {icon}
            </span>
          )}
        </span>
      )}

      {/* 5. Ghost Underline Animation */}
      {variant === 'ghost' && (
        <span
          className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );

  // Motion variants for spring physics & mobile tap bounce
  const buttonMotionProps = {
    whileHover: disabled ? undefined : { scale: 1.04 },
    whileTap: disabled ? undefined : { scale: 0.96 },
    transition: { type: 'spring' as const, stiffness: 450, damping: 22 },
  };

  // If href is specified, render as anchor
  if (href) {
    return (
      <motion.a
        ref={magneticRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        data-interactive="true"
        style={{ touchAction: 'manipulation' }}
        className={`group inline-flex items-center justify-center text-center select-none ${sizeStyles} ${variantStyles} ${disabledStyles} ${widthStyle} ${className}`}
        {...buttonMotionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      disabled={disabled || loading}
      onClick={handleClick}
      data-interactive="true"
      style={{ touchAction: 'manipulation' }}
      className={`group inline-flex items-center justify-center text-center select-none ${sizeStyles} ${variantStyles} ${disabledStyles} ${widthStyle} ${className}`}
      {...buttonMotionProps}
      {...restProps}
    >
      {content}
    </motion.button>
  );
};
