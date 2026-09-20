import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    // Track hover on interactive elements
    const handleElementHover = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, [data-interactive="true"]');
      
      const onEnter = () => setIsHovered(true);
      const onLeave = () => setIsHovered(false);

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });

      return () => {
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    const cleanupInteractives = handleElementHover();

    // Re-check for newly mounted interactive elements periodically
    const observer = new MutationObserver(() => {
      handleElementHover();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cleanupInteractives();
      observer.disconnect();
    };
  }, []);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouchDevice) return;

    let frameId: number;
    const animate = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Central sharp dot */}
      <div
        className="fixed w-2 h-2 -ml-1 -mt-1 bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.6 : 1})`,
        }}
      />

      {/* Trailing aura ring */}
      <div
        className={`fixed rounded-full border transition-[border-color,width,height] duration-200 ease-out ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_20px_rgba(0,229,255,0.4)]'
            : isClicking
            ? 'w-8 h-8 -ml-4 -mt-4 border-[#ff2d95] bg-[#ff2d95]/20'
            : 'w-9 h-9 -ml-[18px] -mt-[18px] border-white/30 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      />
    </div>
  );
};
