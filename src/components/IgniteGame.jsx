import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CYCLE = 1500; // faster cycle = harder to time

const tiers = [
  { min: 99, title: 'Champion', text: 'Bachcha hai tu mera ab! 👑🔥' },
  { min: 50, title: 'Almost There', text: 'Arre 67 wala scene ho gaya bhai 😅' },
  { min: 0, title: 'Try Again', text: 'Choti bachi ho kya? 😭' },
];

const getTier = (value) => tiers.find((t) => value >= t.min);

const IgniteGame = () => {
  const [running, setRunning] = useState(false);
  const [level, setLevel] = useState(0);
  const [result, setResult] = useState(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const tick = (timestamp) => {
    if (!startRef.current) startRef.current = timestamp;
    const elapsed = (timestamp - startRef.current) % CYCLE;
    const half = CYCLE / 2;
    const pct = elapsed < half ? (elapsed / half) * 100 : 100 - ((elapsed - half) / half) * 100;
    setLevel(pct);
    rafRef.current = requestAnimationFrame(tick);
  };

  const start = () => {
    setResult(null);
    setRunning(true);
    startRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  };

  const lockIn = () => {
    cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setResult(getTier(Math.round(level)));
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <section id="play" className="h-screen flex items-center justify-center bg-herobg px-6">
      <div className="max-w-md mx-auto text-center">
        <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-2">Take a Moment</p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-herotext mb-2">
          Ignite the Flame
        </h2>
        <p className="text-herotext/60 mb-6 text-sm">
          Time your release. Catch the fire at its peak.
        </p>

        <div className="relative w-16 h-40 sm:w-20 sm:h-48 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: `${running ? level : result ? Math.round(level) : 0}%`,
              background: 'linear-gradient(to top, #7a3b12, #c99a3e, #f3d488)',
            }}
          />
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <span className="text-xl">🔥</span>
          </div>
        </div>

        {!running && !result && (
          <button
            onClick={start}
            className="px-6 py-2.5 bg-gold text-herobg rounded-full font-medium text-sm hover:bg-golddeep transition-colors"
          >
            Start
          </button>
        )}

        {running && (
          <button
            onClick={lockIn}
            className="px-6 py-2.5 bg-gold text-herobg rounded-full font-medium text-sm hover:bg-golddeep transition-colors animate-pulse"
          >
            Lock In
          </button>
        )}

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-gold text-xs tracking-wide uppercase mb-1">{result.title}</p>
              <p className="font-display italic text-base sm:text-lg text-herotext mb-4 px-2">
                {result.text}
              </p>
              <button
                onClick={start}
                className="px-6 py-2.5 border border-herotext/30 text-herotext rounded-full font-medium text-sm hover:border-gold hover:text-gold transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IgniteGame;