import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center"
        >
          {/* Animated clock icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mb-8 relative"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="rgba(212,168,83,0.15)"
                strokeWidth="2"
              />
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#d4a853"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="283"
                animate={{ strokeDashoffset: [283, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Clock hands */}
              <motion.line
                x1="50" y1="50" x2="50" y2="25"
                stroke="#d4a853"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '50px 50px' }}
              />
              <motion.line
                x1="50" y1="50" x2="50" y2="18"
                stroke="#e8c97a"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '50px 50px' }}
              />
              <circle cx="50" cy="50" r="3" fill="#d4a853" />
            </svg>
          </motion.div>

          {/* Brand name */}
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1 }}
            className="text-gold text-sm uppercase tracking-[0.3em] mb-6 font-['Playfair_Display']"
          >
            TimeTravel Agency
          </motion.h2>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-gray-600 text-xs mt-3"
          >
            Initialisation du portail temporel...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
