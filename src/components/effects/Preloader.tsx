import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 700);
          }, 250);
          return 100;
        }

        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + increment, 100);

        if (next < 30) {
          setStatusText('INITIALIZING 3D ENVIRONMENT');
        } else if (next < 65) {
          setStatusText('COMPILING GLSL SHADERS & PARTICLES');
        } else if (next < 90) {
          setStatusText('HYDRATING ASSETS & TYPOGRAPHY');
        } else {
          setStatusText('EXPERIENCE READY');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050510] text-[#eaf2ff] overflow-hidden select-none"
        >
          {/* Subtle background ambient pulse */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-[#00e5ff]/10 via-[#8b5cf6]/5 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
            {/* Animated Logo */}
            <div className="mb-8 relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-4xl sm:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#eaf2ff] to-[#8892b0]"
              >
                HOUDAIFA<span className="text-[#00e5ff] animate-pulse">.</span>
              </motion.div>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden p-0.5 border border-white/10 mb-4 backdrop-blur-md">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ff2d95] rounded-full shadow-[0_0_12px_rgba(0,229,255,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Metrics & Status */}
            <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-[#8892b0]">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
                <span className="text-white/80">{statusText}</span>
              </span>
              <span className="text-[#00e5ff] font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
