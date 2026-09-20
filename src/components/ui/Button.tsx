import React, { useState, useRef, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useRipple } from '../../hooks/useRipple';
import { triggerHaptic } from '../../lib/haptics';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonIconAnimation = 'bounce' | 'arrow' | 'sparkle' | 'auto' | 'none';

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

/**
 * Reusable Awwwards-Level Interactive Button Component
 * 
 * Features:
 * - Tap Ripple Effect: Dynamic radial wave expanding from exact tap coordinates (500ms)
 * - Scale Spring: Fast scale down to 0.94 on touch down, spring bounce return (stiffness 400, damping 20)
 * - Glow Pulse: 200ms intense illumination pulse on tap (0 0 60px cyan / purple)
 * - Native Haptics: 10ms micro-vibration on pointer down via Web Vibration API
 * - Icon Micro-Animations: Directional slides for arrows, downward bounce for download, rotation for sparkle
 * - Inner Text Shimmer: 300ms light beam sweeping across typography upon tap
 * - Magnetic Hover (Desktop): Smooth spring cursor tracking (auto-disabled on mobile touch)
 * - Mobile Touch Target: Strict min 48x48px with touch-action: manipulation to eliminate delay
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
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...restProps
}) => {
  // Magnetic attraction hook for desktop cursor tracking
  const { ref: magneticRef, x: magneticX, y: magneticY } = useMagnetic<HTMLButtonElement | HTMLAnchorElement>(
    magnetic && !disabled,
    0.3,
    60
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const tapTimeoutRef = useRef<number | null>(null);

  // Reusable touch/click ripple hook (500ms duration, GPU transform)
  const { ripples, createRipple } = useRipple({
    duration: 500,
    enableHaptic: true,
  });

  useEffect(() => {
    return () => {
      if (tapTimeoutRef.current) {
        window.clearTimeout(tapTimeoutRef.current);
      }
    };
  }, []);

  // Determine ripple color based on variant
  const getRippleColor = () => {
    if (variant === 'primary') {
      return 'radial-gradient(circle, rgba(0, 229, 255, 0.75) 0%, rgba(139, 92, 246, 0.55) 65%, transparent 100%)';
    }
    if (variant === 'secondary') {
      return 'rgba(255, 255, 255, 0.3)';
    }
    return 'rgba(0, 229, 255, 0.4)';
  };

  // Pointer Down: Trigger ripple, haptic vibration, glow pulse, and shimmer sweep
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return;

    // 1. Trigger ripple from exact coordinates
    createRipple(e, getRippleColor());

    // 2. Glow pulse for 200ms
    setIsTapped(true);
    if (tapTimeoutRef.current) window.clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = window.setTimeout(() => {
      setIsTapped(false);
    }, 200);

    if (onPointerDown) {
      onPointerDown(e as React.PointerEvent<HTMLButtonElement>);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onPointerUp) {
      onPointerUp(e as React.PointerEvent<HTMLButtonElement>);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setIsTapped(false);
    if (onPointerCancel) {
      onPointerCancel(e as React.PointerEvent<HTMLButtonElement>);
    }
  };

  // Click handler (also triggers micro-particle burst)
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Spawn 8 micro-particles exploding radially for desktop feedback
    const particleColors = variant === 'primary' 
      ? ['#00e5ff', '#38bdf8', '#8b5cf6', '#ffffff'] 
      : ['#8b5cf6', '#c084fc', '#00e5ff', '#ffffff'];

    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      angle: (i / 8) * (Math.PI * 2) + (Math.random() - 0.5) * 0.4,
      distance: 24 + Math.random() * 26,
      color: particleColors[i % particleColors.length],
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 400);

    if (onClick) {
      onClick(e);
    }
  };

  // Base sizing tokens: strictly meets mobile 48x48px tap target & minimum px-6 py-3
  const sizeStyles = {
    sm: 'min-h-[48px] min-w-[48px] px-6 py-3 text-xs sm:text-xs font-semibold',
    md: 'min-h-[48px] min-w-[48px] px-7 sm:px-8 py-3.5 sm:py-4 text-[15px] sm:text-sm font-semibold',
    lg: 'min-h-[54px] min-w-[48px] px-8 sm:px-9 py-4 sm:py-4.5 text-[16px] sm:text-base font-semibold',
  }[size];

  // Dynamic box-shadow for tap glow pulse
  const getGlowShadow = () => {
    if (isTapped) {
      if (variant === 'primary') {
        return '0 0 60px rgba(0, 229, 255, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.8)';
      }
      if (variant === 'secondary') {
        return '0 0 60px rgba(139, 92, 246, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.4)';
      }
      return '0 0 35px rgba(0, 229, 255, 0.5)';
    }
    return undefined;
  };

  // Variant Visual & Base Glow Styles
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = `
      relative overflow-hidden rounded-full font-heading tracking-wide text-[#050510]
      bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ff2d95] bg-[length:250%_250%]
      animate-button-gradient-shift
      border border-transparent
      shadow-[0_0_25px_rgba(0,229,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.45)]
      hover:shadow-[0_0_40px_rgba(0,229,255,0.6),inset_0_1px_2px_rgba(255,255,255,0.6)]
      active:shadow-[0_0_60px_rgba(0,229,255,0.9)]
      transition-all duration-200 ease-out
    `;
  } else if (variant === 'secondary') {
    variantStyles = `
      relative overflow-hidden rounded-full font-heading tracking-wide text-white
      bg-white/[0.04] hover:bg-white/[0.09] backdrop-blur-xl
      border border-white/15 hover:border-[#8b5cf6]/60
      hover:text-[#00e5ff]
      shadow-[0_0_15px_rgba(139,92,246,0.15)]
      hover:shadow-[0_0_40px_rgba(139,92,246,0.5),0_0_20px_rgba(0,229,255,0.25)]
      active:bg-white/[0.14] active:shadow-[0_0_60px_rgba(139,92,246,0.8)]
      transition-all duration-200 ease-out
    `;
  } else {
    // ghost
    variantStyles = `
      relative overflow-hidden rounded-full font-heading font-medium tracking-wide text-white/80 hover:text-[#00e5ff]
      bg-transparent hover:bg-white/[0.04] active:bg-white/[0.08]
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

  const isSparkle =
    iconAnimation === 'sparkle' ||
    (iconAnimation === 'auto' &&
      React.isValidElement(icon) &&
      ((typeof icon.type === 'function' && icon.type.name?.toLowerCase().includes('sparkle')) ||
        (icon.props as { 'data-icon'?: string })?.['data-icon'] === 'sparkles'));

  // Common inner content
  const content = (
    <>
      {/* 1. White Shimmer Light Sweep on Hover (Desktop) */}
      {variant !== 'ghost' && !disabled && !loading && (
        <span
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <span className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] -skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
        </span>
      )}

      {/* 2. Inner Text Shimmer (300ms swift light bar triggered on tap) */}
      {isTapped && !disabled && !loading && (
        <motion.span
          initial={{ x: '-100%', opacity: 0.8 }}
          animate={{ x: '250%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 z-20"
          aria-hidden="true"
        />
      )}

      {/* 3. Tap/Click Ripple Waves (Exact tap coordinates, 500ms scale 0 -> 5) */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.65 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute rounded-full z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            marginLeft: -ripple.size / 2,
            marginTop: -ripple.size / 2,
            background: ripple.color,
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />
      ))}

      {/* 4. Radial Particle Burst Elements */}
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

      {/* 5. Loading Spinner or Children Label + Animated Icons */}
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
                  animate={
                    isTapped
                      ? { y: [0, 3, 0] }
                      : isHovered
                      ? { y: [0, 4, 0] }
                      : { y: 0 }
                  }
                  transition={
                    isTapped
                      ? { duration: 0.2, ease: 'easeOut' }
                      : isHovered
                      ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : isArrow ? (
                <motion.span
                  animate={
                    isTapped
                      ? { x: [0, 2, 0] }
                      : isHovered
                      ? { x: 4, rotate: -45 }
                      : { x: 0, rotate: 0 }
                  }
                  transition={
                    isTapped
                      ? { duration: 0.2, ease: 'easeOut' }
                      : { type: 'spring', stiffness: 350, damping: 20 }
                  }
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : isSparkle ? (
                <motion.span
                  animate={
                    isTapped
                      ? { rotate: [0, 15, 0] }
                      : isHovered
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    isTapped
                      ? { duration: 0.25, ease: 'easeOut' }
                      : { duration: 0.8, ease: 'easeInOut' }
                  }
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
                  animate={
                    isTapped
                      ? { y: [0, 3, 0] }
                      : isHovered
                      ? { y: [0, 4, 0] }
                      : { y: 0 }
                  }
                  transition={
                    isTapped
                      ? { duration: 0.2, ease: 'easeOut' }
                      : isHovered
                      ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : isArrow ? (
                <motion.span
                  animate={
                    isTapped
                      ? { x: [0, 2, 0] }
                      : isHovered
                      ? { x: 4, rotate: -45 }
                      : { x: 0, rotate: 0 }
                  }
                  transition={
                    isTapped
                      ? { duration: 0.2, ease: 'easeOut' }
                      : { type: 'spring', stiffness: 350, damping: 20 }
                  }
                  className="inline-flex items-center"
                >
                  {icon}
                </motion.span>
              ) : isSparkle ? (
                <motion.span
                  animate={
                    isTapped
                      ? { rotate: [0, 15, 0] }
                      : isHovered
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    isTapped
                      ? { duration: 0.25, ease: 'easeOut' }
                      : { duration: 0.8, ease: 'easeInOut' }
                  }
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

      {/* 6. Ghost Underline Animation */}
      {variant === 'ghost' && (
        <span
          className="absolute bottom-1 left-4 right-4 h-[1.5px] bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );

  // Scale spring: scale 1 -> 0.94 on tap, spring return (stiffness 400, damping 20)
  const buttonMotionProps = {
    whileHover: disabled ? undefined : { scale: 1.05 },
    whileTap: disabled ? undefined : { scale: 0.94 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  };

  const dynamicStyles = {
    x: magnetic ? magneticX : 0,
    y: magnetic ? magneticY : 0,
    touchAction: 'manipulation' as const,
    boxShadow: getGlowShadow(),
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
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-interactive="true"
        style={dynamicStyles}
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
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-interactive="true"
      style={dynamicStyles}
      className={`group inline-flex items-center justify-center text-center select-none ${sizeStyles} ${variantStyles} ${disabledStyles} ${widthStyle} ${className}`}
      {...buttonMotionProps}
      {...restProps}
    >
      {content}
    </motion.button>
  );
};

