import { useState, useEffect, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________010101XYZ';

export function useTextScramble(finalText: string, speed: number = 35) {
  const [displayText, setDisplayText] = useState(finalText);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    setIsScrambling(true);

    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return finalText[index];
            }
            if (letter === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [finalText, speed]);

  useEffect(() => {
    // Delay scramble slightly after preloader or mount
    const timer = setTimeout(() => {
      scramble();
    }, 400);
    return () => clearTimeout(timer);
  }, [scramble]);

  return { displayText, isScrambling, scramble };
}
