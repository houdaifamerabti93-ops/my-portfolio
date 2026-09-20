import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconAnimation = 'bounce' | 'arrow' | 'auto' | 'none';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'onClick'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconAnimation?: ButtonIconAnimation;
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
  color: string;
}

/**
 * Reusable Awwwards-Level Interactive Button Component
 * 
 * Features:
 * - Magnetic Hover: Follows cursor when within 60px with spring physics (stiffness 150, damping 15)
 * - Hover Glow: Cyan (0 0 40px rgba(0,229,255,0.6)) for primary, Purple (0 0 40px rgba(139,92,246,0.5)) for secondary
 * - Hover Scale: 1 -> 1.05 with spring; Tap scale: 0.97
 * - Icon Animations: Download bounces (y: 0 -> 4 -> 0), Arrow slides (x: 0 -> 4) and rotates
 * - Shimmer Effect: White light beam sweeps across on hover (600ms)
 * - Click Ripple: Radial ripple expands from click point (Cyan for primary, Purple for secondary)
 * - Idle Pulse: Subtle glow pulse every 3s
 * - Mobile Optimized: Magnetic auto-disabled on touch, 48px touch targets, haptic feedback (10ms)
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  magnetic = true,
  loading = false,
  icon,
  iconPosition = 'right',
  iconAnimation = 'auto',
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
  // Magnetic attraction hook for desktop cursor tracking
  const { ref: magneticRef, x: magneticX, y: magneticY } = useMagnetic<HTMLButtonElement | HTMLAnchorElement>(
    magnetic && !disabled,
    0.3,
    60
  );

  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Trigger ripple & particle burst on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    // Trigger mobile haptic feedback if available (10ms)
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate?.(10);
      } catch {
        // Safe failover for unsupported browser policies
      }
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // 1. Spawn Ripple (Cyan for primary, Purple for secondary)
    const rippleColor = variant === 'primary' 
      ? 'rgba(0, 229, 255, 0.45)' 
      : 'rgba(139, 92, 246, 0.45)';

    const rippleId = Date.now() + Math.random();
    const rippleSize = Math.max(rect.width, rect.height) * 2.5;
    setRipples((prev) => [...prev, { id: rippleId, x: clickX, y: clickY, size: rippleSize, color: rippleColor }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 400);

    // 2. Spawn 10 micro-particles exploding radially
    const particleColors = variant === 'primary' 
      ? ['#00e5ff', '#38bdf8', '#8b5cf6', '#ffffff'] 
      : ['#8b5cf6', '#c084fc', '#00e5ff', '#ffffff'];

    const newParticles: Particle[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      angle: (i / 10) * (Math.PI * 2) + (Math.random() - 0.5) * 0.4,
      distance: 28 + Math.random() * 32,
      color: particleColors[i % particleColors.length],
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 450);

    if (onClick) {
      onClick(e);
    }
  };

  // Base sizing tokens (strictly meets mobile 48px touch target & readable typography)
  const sizeStyles = {
    sm: 'min-h-[44px] min-w-[44px] px-5 py-2.5 text-xs sm:text-xs font-semibold',
    md: 'min-h-[48px] min-w-[48px] px-7 sm:px-8 py-3.5 sm:py-4 text-[15px] sm:text-sm font-semibold',
    lg: 'min-h-[54px] min-w-[48px] px-8 sm:px-9 py-4 sm:py-4.5 text-[16px] sm:text-base font-semibold',
  }[size];

  // Variant Visual & Glow Styles
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = `
      relative overflow-hidden rounded-full font-heading tracking-wide text-[#050510]
      bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ff2d95] bg-[length:250%_250%]
      animate-button-gradient-shift animate-button-idle-glow
      border border-transparent
      shadow-[0_0_25px_rgba(0,229,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.45)]
      hover:shadow-[0_0_40px_rgba(0,229,255,0.6),inset_0_1px_2px_rgba(255,255,255,0.6)]
      active:shadow-[0_0_20px_rgba(0,229,255,0.4)]
      transition-shadow duration-300 ease-out
    `;
  } else if (variant === 'secondary') {
    variantStyles = `
      relative overflow-hidden rounded-full font-heading tracking-wide text-white
      bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl
      border border-white/15 hover:border-[#8b5cf6]/60
      hover:text-[#00e5ff]
      animate-button-idle-glow-secondary
      shadow-[0_0_15px_rgba(139,92,246,0.15)]
      hover:shadow-[0_0_40px_rgba(139,92,246,0.5),0_0_20px_rgba(0,229,255,0.25)]
      active:bg-white/[0.14]
      transition-[border-color,background-color,color,shadow] duration-300 ease-out
    `;
  } else {
    // ghost
    variantStyles = `
      relative rounded-full font-heading font-medium tracking-wide text-white/80 hover:text-[#00e5ff]
      bg-transparent hover:bg-white/[0.04]
      transition-colors duration-200
    `;
  }

  const disabledStyles = disabled
    ? 'opacity-40 cursor-not-allowed pointer-events-none shadow-none filter grayscale'
    : 'cursor-pointer';

  const widthStyle = fullWidth ? 'w-full' : 'w-full sm:w-auto';

  // Determine icon animation behavior
  const isDownload =
    iconAnimation === 'bounce' ||
    (iconAnimation === 'auto' &&
      React.isValidElement(icon) &&
      ((typeof icon.type === 'function' && icon.type.name?.toLowerCase().includes('download')) ||
        (icon.props as { 'data-icon'?: string })?.['data-icon'] === 'download'));

  const isArrow =
    iconAnimation === 'arrow' ||
    (iconAnimation === 'auto' &&
      React.isValidElement(icon) &&
      ((typeof icon.type === 'function' && icon.type.name?.toLowerCase().includes('arrow')) ||
        (icon.props as { 'data-icon'?: string })?.['data-icon'] === 'arrow'));

  // Common inner content
  const content = (
    <>
      {/* 1. White Shimmer Light Sweep on Hover (Both Primary & Secondary) */}
      {variant !== 'ghost' && !disabled && !loading && (
        <span
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <span className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-600 ease-out" />
        </span>
      )}

      {/* 2. Expanding Click Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full z-10"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: ripple.color,
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

      {/* 4. Loading Spinner or Children Label + Animated Icons */}
      {loading ? (
        <span className="relative z-10 inline-flex items-center gap-2.5">
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
          <span>Processing...</span>
        </span>
      ) : (
        <span className="relative z-10 inline-flex items-center justify-center gap-2.5 leading-none">
          {icon && iconPosition === 'left' && (
            <span className="shrink-0 inline-flex items-center">
              {isDownload ? (
                <motion.span
                  animate={isHovered ? { y: [0, 4, 0] } : { y: 0 }}
                  transition={isHovered ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : isArrow ? (
                <motion.span
                  animate={isHovered ? { x: 4, rotate: -45 } : { x: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : (
                <span className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110 inline-flex items-center">
                  {icon}
                </span>
              )}
            </span>
          )}

          <span>{children}</span>

          {icon && iconPosition === 'right' && (
            <span className="shrink-0 inline-flex items-center">
              {isDownload ? (
                <motion.span
                  animate={isHovered ? { y: [0, 4, 0] } : { y: 0 }}
                  transition={isHovered ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : isArrow ? (
                <motion.span
                  animate={isHovered ? { x: 4, rotate: -45 } : { x: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : (
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110 inline-flex items-center">
                  {icon}
                </span>
              )}
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
    whileHover: disabled ? undefined : { scale: 1.05 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-interactive="true"
        style={{
          x: magnetic ? magneticX : 0,
          y: magnetic ? magneticY : 0,
          touchAction: 'manipulation',
        }}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-interactive="true"
      style={{
        x: magnetic ? magneticX : 0,
        y: magnetic ? magneticY : 0,
        touchAction: 'manipulation',
      }}
      className={`group inline-flex items-center justify-center text-center select-none ${sizeStyles} ${variantStyles} ${disabledStyles} ${widthStyle} ${className}`}
      {...buttonMotionProps}
      {...restProps}
    >
      {content}
    </motion.button>
  );
};
